import * as Dialog from '@/components/headless-motion/components/dialog'
import * as Presets from '@/components/headless-motion/lib/presets'

export default function Page() {
  return (
    <Dialog.Root transition={Presets.Springs.bouncy()}>
      <Dialog.Trigger
        className='relative isolate flex h-32 w-32 flex-col justify-end overflow-hidden bg-blue-9 p-4 md:h-72 md:w-72'
        style={{
          borderRadius: '24px',
          boxShadow: '0px 0px 0px 2px rgba(255,255,255,0.2) inset, 0px 0px 0px 0.5px rgba(0,0,0,0.7)'
        }}
      >
        <div className='relative flex flex-col gap-0 text-white'>
          <Dialog.Item id='dialog.heading' className='font-medium'>
            Blue 9
          </Dialog.Item>
          <Dialog.Item id='dialog.description'>#0090FF</Dialog.Item>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Background />

        <Dialog.Content
          className='relative isolate flex h-[50%] w-[80%] flex-col justify-end overflow-hidden bg-blue-9 p-4 md:w-[50%]'
          style={{
            borderRadius: '24px',
            boxShadow: '0px 0px 0px 2px rgba(255,255,255,0.2) inset, 0px 0px 0px 0.5px rgba(0,0,0,0.7)'
          }}
        >
          <div className='relative flex flex-col gap-0 text-white'>
            <Dialog.Item id='dialog.heading' className='font-medium'>
              Blue 9
            </Dialog.Item>
            <Dialog.Item id='dialog.description'>#0090FF</Dialog.Item>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
