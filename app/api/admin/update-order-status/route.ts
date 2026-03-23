import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const supabase = getSupabaseAdmin() // ✅ FIXED

    const { id, status } = await req.json()

    // ✅ Validate input
    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('orders')
      .update({ order_status: status })
      .eq('id', id)

    if (error) {
      console.error('Update order status error:', error)
      return NextResponse.json(
        { error: 'Update failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Update order API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}