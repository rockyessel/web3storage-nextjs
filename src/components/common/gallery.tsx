'use client';

import { fileCidBuilder } from '@/lib/utils';
import Image from 'next/image';
import { JSX, SVGProps } from 'react';

interface Props {
  files: string[];
}
export default function Gallery({ files }: Props) {
  return (
    <div className='w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
        {files.map((file, index) => (
          <div
            key={index}
            className='relative group overflow-hidden rounded-lg cursor-zoom-in'
          >
            <Image
              src={fileCidBuilder(file)}
              alt={file}
              width={600}
              height={600}
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
              style={{ aspectRatio: '600/600', objectFit: 'cover' }}
            />
            <div className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <ZoomInIcon className='w-8 h-8 text-white' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ZoomInIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx='11' cy='11' r='8' />
      <line x1='21' x2='16.65' y1='21' y2='16.65' />
      <line x1='11' x2='11' y1='8' y2='14' />
      <line x1='8' x2='14' y1='11' y2='11' />
    </svg>
  );
}
