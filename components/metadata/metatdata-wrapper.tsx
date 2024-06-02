'use client'

import { MetadataDialog } from '@/components/metadata/metadata-dialog'
import { usePathname } from 'next/navigation'

export default function MetadataDialogWrapper() {
	const pathname = usePathname()
	const isHomePage = pathname === '/'

	return <>{isHomePage && <MetadataDialog />}</>
}
