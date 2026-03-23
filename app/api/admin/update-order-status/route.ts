import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json()

    const { error } = await supabaseAdmin
      .from('orders')
      .update({ order_status: status })
      .eq('id', id)

    if (error) {
      console.error(error)
      return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}