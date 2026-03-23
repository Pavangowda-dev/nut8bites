import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    // 1️⃣ Get only PAID orders
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('payment_status', 'paid')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }

    // 2️⃣ Get all items
    const { data: items } = await supabaseAdmin
      .from('order_items')
      .select('*')

    // 3️⃣ Attach items to orders
    const ordersWithItems = orders.map((order) => ({
      ...order,
      items: items?.filter((i) => i.order_id === order.id) || [],
    }))

    return NextResponse.json({ orders: ordersWithItems })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}