import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { supabaseAdmin } from '@/lib/supabase-admin'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      customer_name,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      country,
      pincode,
      items,
      subtotal,
      shipping,
      total,
    } = body

    // ✅ Basic validation (important)
    if (!customer_name || !phone || !address1 || !city || !state || !pincode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // 1️⃣ Create order in DB
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert([
        {
          customer_name,
          email,
          phone,
          address1,
          address2,
          city,
          state,
          country,
          pincode,
          subtotal,
          shipping,
          total,
          payment_status: 'pending',
          order_status: 'pending',
        },
      ])
      .select()
      .single()

    if (orderError || !order) {
      console.error('Order insert error:', orderError)
      return NextResponse.json({ error: 'Order creation failed' }, { status: 500 })
    }

    // 2️⃣ Insert order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      pack_size: item.pack_size,
      quantity: item.quantity,
      price: item.price,
    }))

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items error:', itemsError)
      return NextResponse.json({ error: 'Order items failed' }, { status: 500 })
    }

    // 3️⃣ Create Razorpay order (FIXED RECEIPT 🚨)
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: 'INR',

      // ✅ FIX: keep under 40 chars
      receipt: `ord_${order.id.replace(/-/g, '').slice(0, 30)}`,
    })

    // 4️⃣ Update DB with Razorpay order ID
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        razorpay_order_id: razorpayOrder.id,
      })
      .eq('id', order.id)

    if (updateError) {
      console.error('Update order error:', updateError)
    }

    return NextResponse.json({
      success: true,
      order_id: order.id,
      razorpay_order: razorpayOrder,
    })
  } catch (error: any) {
    console.error('Create order error:', error?.error || error)

    return NextResponse.json(
      {
        error:
          error?.error?.description ||
          error?.message ||
          'Something went wrong',
      },
      { status: 500 }
    )
  }
}