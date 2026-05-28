'use client'

import dynamic from 'next/dynamic'

const LogoAnimation = dynamic(
  () => import('@/components/LogoAnimation'),
  { ssr: false }
)

export default function LogoWrapper() {
  return <LogoAnimation />
}
