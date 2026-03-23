import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json()

    // 1️⃣ Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    const isValid = expectedSignature === razorpay_signature

    if (!isValid) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    // 2️⃣ Update order in DB
    const { error } = await supabaseAdmin
      .from('orders')
      .update({
        razorpay_payment_id,
        payment_status: 'paid',
        order_status: 'confirmed',
      })
      .eq('razorpay_order_id', razorpay_order_id)

    if (error) {
      console.error('DB update error:', error)
      return NextResponse.json({ success: false }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Verify payment error:', error)

    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}