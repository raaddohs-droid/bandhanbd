import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProfilePageClient from './ProfilePageClient'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !profile) notFound()

  return <ProfilePageClient profile={profile} />
}
