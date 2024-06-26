import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Cross1Icon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { time } from '../lib/graph/nodes'

interface NodeDetailsCardProps {
	isSelected: boolean
	selectedNode: any
	setIsSelected: (isSelected: boolean) => void
}

const NodeDetailsCard = ({ isSelected, selectedNode, setIsSelected }: NodeDetailsCardProps) => (
	<AnimatePresence initial={false}>
		{isSelected && (
			<motion.div className='absolute bottom-0 left-0 z-10 w-96 p-4'>
				<Card
					initial={{ filter: 'blur(4px)', y: 100, height: 'auto', opacity: 0 }}
					animate={{ filter: 'blur(0)', y: 0, height: 'auto', opacity: 1 }}
					exit={{ filter: 'blur(4px)', y: 100, height: 'auto', opacity: 0 }}
					transition={{ type: 'spring', duration: 0.75 }}
					className='overflow-hidden rounded-none'
				>
					<CardHeader className='flex flex-row items-start bg-muted/50'>
						<CardTitle className='group flex w-full items-center justify-between gap-2 text-lg'>
							<span className='max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap'>
								{selectedNode?.arena?.title || selectedNode?.arena?.generated_title}
							</span>
							<Button
								variant='outline'
								size='icon'
								className='rounded-none'
								onClick={() => setIsSelected(false)}
							>
								<Cross1Icon />
							</Button>
						</CardTitle>
					</CardHeader>
					<CardContent className='p-0 text-sm'>
						<AnimatePresence>
							{selectedNode?.arena.class === 'Text' && (
								<motion.div
									initial={{
										opacity: 0,
										height: 0,
										scale: 0.8,
										filter: 'blur(4px)',
									}}
									animate={{
										scale: 1,
										filter: 'blur(0)',
										height: 300,
										opacity: 1,
									}}
									exit={{ opacity: 0, filter: 'blur(4px)', height: 0 }}
									className='overflow-hidden'
								>
									<Textarea
										className='h-full w-full rounded-none border'
										placeholder=''
										value={selectedNode.arena.content}
										readOnly
									/>
								</motion.div>
							)}
						</AnimatePresence>

						<ul className='grid gap-3 p-6'>
							<li className='flex items-center justify-between'>
								<span className='text-muted-foreground'>Added</span>
								<span>
									{selectedNode?.arena.created_at
										? time(new Date(selectedNode.arena.created_at))
										: time(new Date(selectedNode?.arena.owner.created_at))}
								</span>
							</li>
							<li className='flex items-center justify-between'>
								<span className='text-muted-foreground'>Modified</span>
								<span>{time(new Date(selectedNode?.arena.updated_at))}</span>
							</li>
							<li className='flex items-center justify-between'>
								<span className='text-muted-foreground'>By</span>
								<span>{selectedNode?.arena.user.full_name}</span>
							</li>
						</ul>

						<div className='p-6 pt-0'>
							<Button
								variant='outline'
								className='w-full rounded-none'
								onClick={() => {
									const url =
										selectedNode?.arena.class === 'channel'
											? `https://www.are.na/${selectedNode.arena.user.slug}/${selectedNode.arena.slug}`
											: `https://www.are.na/block/${selectedNode.arena.id}`
									window.open(url, '_blank')
								}}
							>
								View
							</Button>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		)}
	</AnimatePresence>
)

export default NodeDetailsCard
