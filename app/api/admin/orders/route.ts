import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const supabase = getSupabaseAdmin() // ✅ FIXED

    // 1️⃣ Get only PAID orders
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('payment_status', 'paid')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch orders error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      )
    }

    // 2️⃣ Get all items
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('*')

    if (itemsError) {
      console.error('Fetch order items error:', itemsError)
      return NextResponse.json(
        { error: 'Failed to fetch order items' },
        { status: 500 }
      )
    }

    // 3️⃣ Attach items to orders
    const ordersWithItems =
      orders?.map((order) => ({
        ...order,
        items: items?.filter((i) => i.order_id === order.id) || [],
      })) || []

    return NextResponse.json({ orders: ordersWithItems })
  } catch (err) {
    console.error('Orders API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}