import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: Request) {
  try {
    const supabase = getSupabaseAdmin() // ✅ FIXED

    const { searchParams } = new URL(req.url)
    const range = searchParams.get('range') || '7'

    let query = supabase
      .from('orders')
      .select('*')
      .eq('payment_status', 'paid')

    // 🗓 Filter by date
    if (range !== 'all') {
      const days = parseInt(range)
      const fromDate = new Date()
      fromDate.setDate(fromDate.getDate() - days)

      query = query.gte('created_at', fromDate.toISOString())
    }

    const { data: orders, error } = await query

    if (error) {
      return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }

    // 📊 Stats
    const totalRevenue =
      orders?.reduce((sum, o) => sum + Number(o.total), 0) || 0

    const totalOrders = orders?.length || 0

    const avgOrderValue =
      totalOrders > 0 ? totalRevenue / totalOrders : 0

    // 📈 Group by date
    const grouped: Record<string, { revenue: number; count: number }> = {}

    orders?.forEach((o) => {
      const date = new Date(o.created_at).toLocaleDateString()

      if (!grouped[date]) {
        grouped[date] = { revenue: 0, count: 0 }
      }

      grouped[date].revenue += Number(o.total)
      grouped[date].count += 1
    })

    const chartData = Object.entries(grouped).map(([date, val]) => ({
      date,
      revenue: val.revenue,
      orders: val.count,
    }))

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      avgOrderValue,
      chartData,
    })
  } catch (err) {
    console.error(err) // ✅ helpful for debugging
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}