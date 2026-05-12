'use client'

import { Anchor } from '@mantine/core'
import Link from 'next/link'

export default function ClientLink({ link, label }: { link: string, label: string }) {
  return <Anchor component={Link} href={link} target="_blank">{label}</Anchor>
}
