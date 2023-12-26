'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FileUploader from '../shared/file-uploader'
import { useModal } from '@/hooks/use-modal'

const schema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name is too short'),
  imageUrl: z.string().url().optional(),
})

type Inputs = z.infer<typeof schema>

export default function CreateServerModal() {
  const { isOpen, onClose, type } = useModal()
  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', imageUrl: '' },
  })
  const { isSubmitting } = form.formState
  const router = useRouter()
  const onSubmit = async (data: Inputs) => {
    try {
      await axios.post('/api/server', data)

      form.reset()
      router.refresh()
      onClose()
    } catch (e) {
      console.error('inital-moadl.tsx onSubmit: ', e)
    }
  }

  return (
    <Dialog
      open={isOpen && type == 'createServer'}
      onOpenChange={onClose}
    >
      <DialogContent className='overflow-hidden bg-white p-0 text-black'>
        <DialogHeader className='px-6 pt-8'>
          <DialogTitle className='text-center text-2xl font-bold'>
            Create Server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Customize your server and give it the theme and personality you
            like!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center'>
                <FormField
                  control={form.control}
                  name='imageUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          endpoint='serverImage'
                          url={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. Quantum Pulse Alpha 9'
                        className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='bg-gray-100 px-6 py-4'>
              <Button
                disabled={isSubmitting}
                variant='primary'
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
