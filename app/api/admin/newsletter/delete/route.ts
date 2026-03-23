import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const supabase = getSupabaseAdmin() // ✅ FIXED

    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('newsletter')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete newsletter error:', error)
      return NextResponse.json(
        { error: 'Delete failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter delete API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}