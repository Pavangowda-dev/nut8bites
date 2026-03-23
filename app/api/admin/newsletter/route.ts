import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const supabase = getSupabaseAdmin() // ✅ FIXED

    const { data, error } = await supabase
      .from('newsletter')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch newsletter error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      )
    }

    return NextResponse.json({ subscribers: data })
  } catch (err) {
    console.error('Newsletter API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}