'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChangeEvent, JSX, SVGProps, useState, useTransition } from 'react';
import { uploadFiles } from '@/lib/_actions/w3s';
import Image from 'next/image';
import { formatFileSize, fileCidBuilder } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Props {
  files: string[];
}

export default function Upload({ files }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploadPending, startUploadTransition] = useTransition();

  const router = useRouter();

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;
    startUploadTransition(async () => {
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append('files', file);
      }
      const results = await uploadFiles(formData);
      console.log('results: ', results);
      if (results && results.length > 0) {
        router.refresh();
      }
    });
  };

  const hasNoFiles = selectedFiles.length === 0;
  const hasNotUploadedYet = files.length === 0;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const targetFiles = target.files;
    if (!targetFiles) return;
    const files = Array.from(targetFiles);
    setSelectedFiles(files);
  };

  return (
    <div className='max-w-2xl mx-auto p-6 sm:p-8'>
      <div className='grid gap-4'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Upload Files</h1>
          <p className='text-muted-foreground'>
            Drag and drop files or click to upload.
          </p>
        </div>
        <Card>
          <CardContent className='grid gap-6'>
            <label className='w-full grid gap-2 items-center justify-center p-6 border-2 border-dashed border-muted rounded-md cursor-pointer mt-6'>
              <CloudUploadIcon className='w-10 h-10 text-muted-foreground mx-auto' />
              <p className='text-muted-foreground'>
                Drag and drop files here or{' '}
                <span className='font-medium text-primary'>
                  click to upload
                </span>
              </p>
              <input
                type='file'
                multiple
                accept='.png, .jpeg, .jpg'
                onChange={onChange}
                className='m-0 p-0 w-0 h-0'
              />
            </label>

            <div className='grid gap-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-medium'>
                  Selected Files({selectedFiles.length})
                </h3>
                {isUploadPending && (
                  <Button variant='outline' size='sm'>
                    Loading...
                  </Button>
                )}

                {hasNoFiles && (
                  <Button disabled={hasNoFiles} variant='outline' size='sm'>
                    Clear All
                  </Button>
                )}

                {!hasNoFiles && (
                  <Button onClick={handleUpload} variant='outline' size='sm'>
                    Upload
                  </Button>
                )}
              </div>
              <div className='grid gap-2'>
                {hasNoFiles ? (
                  <div className='flex items-center justify-between bg-muted p-3 rounded-md'>
                    Upload a file to preview here
                  </div>
                ) : (
                  selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between bg-muted p-3 rounded-md'
                    >
                      <div className='flex items-center gap-3'>
                        <Image
                          width={500}
                          height={500}
                          priority
                          alt={file.name}
                          src={URL.createObjectURL(file)}
                          className='w-6 h-6 text-muted-foreground object-cover object-center'
                        />
                        <div>
                          <p className='font-medium'>{file.name}</p>
                          <p className='text-xs text-muted-foreground'>
                            {file.type}, {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-3'>
                        <Button variant='ghost' size='icon'>
                          <TrashIcon className='w-5 h-5' />
                          <span className='sr-only'>Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='grid gap-6'>
            <div className='grid gap-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-medium'>Uploaded Files</h3>

                <Button className='mt-2' variant='outline' size='sm'>
                  <a target='_blank' href='https://web3.storage/'>
                    Web3Storage
                  </a>
                </Button>
              </div>
              <div className='grid gap-2'>
                {hasNotUploadedYet ? (
                  <div className='flex items-center justify-between bg-muted p-3 rounded-md'>
                    Upload to see your files from Web3Storage here
                  </div>
                ) : (
                  files.map((file, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between bg-muted p-3 rounded-md'
                    >
                      <div className='flex items-center gap-3'>
                        <Image
                          width={500}
                          height={500}
                          priority
                          alt={file}
                          src={fileCidBuilder(file)}
                          className='w-6 h-6 text-muted-foreground object-cover object-center'
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CloudUploadIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' />
      <path d='M12 12v9' />
      <path d='m16 16-4-4-4 4' />
    </svg>
  );
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
    </svg>
  );
}
