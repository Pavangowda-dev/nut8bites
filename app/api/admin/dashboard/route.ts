import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const supabase = getSupabaseAdmin() // ✅ FIXED

    // 1️⃣ Orders
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('payment_status', 'paid')

    // 2️⃣ Contacts
    const { data: contacts } = await supabase
      .from('contact_messages')
      .select('*')

    // 3️⃣ Newsletter
    const { data: newsletter } = await supabase
      .from('newsletter')
      .select('*')

    // 4️⃣ Calculate revenue
    const totalRevenue =
      orders?.reduce((sum, o) => sum + Number(o.total), 0) || 0

    // 5️⃣ Recent orders (last 5)
    const recentOrders =
      orders
        ?.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )
        .slice(0, 5) || []

    return NextResponse.json({
      totalOrders: orders?.length || 0,
      totalRevenue,
      totalContacts: contacts?.length || 0,
      totalSubscribers: newsletter?.length || 0,
      recentOrders,
    })
  } catch (err) {
    console.error('Dashboard API error:', err) // ✅ better logging
    return NextResponse.json(
      { error: 'Failed to load dashboard' },
      { status: 500 }
    )
  }
}