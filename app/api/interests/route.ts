import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { sender_id, receiver_id } = await request.json()

    // Check if interest already sent
    const { data: existing } = await supabase
      .from('interests')
      .select('*')
      .eq('sender_id', sender_id)
      .eq('receiver_id', receiver_id)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Interest already sent to this profile' },
        { status: 400 }
      )
    }

    // Create new interest
    const { data, error } = await supabase
      .from('interests')
      .insert({
        sender_id,
        receiver_id,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data 
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send interest' },
      { status: 500 }
    )
  }
}