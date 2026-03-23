import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
    const supabase = getSupabaseAdmin() // ✅ FIXED

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json()

    // ✅ Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing payment details' },
        { status: 400 }
      )
    }

    // ✅ Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`

    const secret = process.env.RAZORPAY_KEY_SECRET
    if (!secret) {
      throw new Error('RAZORPAY_KEY_SECRET not set')
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex')

    const isValid = expectedSignature === razorpay_signature

    if (!isValid) {
      console.error('Invalid Razorpay signature')
      return NextResponse.json({ success: false }, { status: 400 })
    }

    // ✅ Update order in DB
    const { error } = await supabase
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