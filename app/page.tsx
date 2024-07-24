import React from 'react';
import TmaxInfo from './components/TmaxInfo';
import { COOKIE, COOKIE_SEO } from './constants';
import Link from 'next/link';

function page() {
  return (
    <div className='w-screen '>
      <div className='w-full'>
        <TmaxInfo cookie={COOKIE_SEO} />
        <Link href={'/seo'} className='text-blue-500 underline text-lg'>
          예약하기
        </Link>
        <div className='w-full h-1 bg-gray-500 my-4'></div>
        <TmaxInfo cookie={COOKIE} />
        <Link href={'/hun'} className='text-blue-500 underline text-lg'>
          예약하기
        </Link>
      </div>
    </div>
  );
}

export default page;
