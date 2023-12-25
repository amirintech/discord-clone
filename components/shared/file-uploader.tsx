import { X } from 'lucide-react'
import Image from 'next/image'

import { UploadDropzone } from '@/lib/uploadthing'

interface Props {
  endpoint: 'serverImage' | 'channelFile'
  url?: string
  onChange: (url?: string) => void
}

export default function FileUploader({ url, endpoint, onChange }: Props) {
  const fileType = url?.split('.')[1]
  if (url && fileType != 'pdf')
    return (
      <div className='relative h-20 w-20'>
        <Image
          fill
          alt=''
          src={url}
          className='rounded-full object-cover'
        />
        <button
          onClick={() => onChange('')}
          className='absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm'
        >
          <X size={16} />
        </button>
      </div>
    )

  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => onChange(res[0].url)}
        onUploadError={console.error}
      />
    </div>
  )
}
