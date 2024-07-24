import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

async function page() {
  const response = await fetch('https://talk.tmaxsoft.com/front/notice/findNoticeSetupBoardList.do', {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Cookie:
        'JSESSIONID=42Oi6LcVAwKixEcL2zNKblEbEmjJoXNaJ6DDaFfKj6DPcvc6zXXY9iR3tYiAGShb.dGFsa19kb21haW4vdGFsay0wMQ==',
    },
  });

  const html = await response.text();
  const tmaxServerTime = response.headers.get('Date');
  const vercelServerTime = dayjs().format('YYYY-MM-DD hh:MM:ss A');
  const isSuccessful = response.ok && html.length > 2000;

  const userData = html
    .split('<table>')[1]
    .split('</table>')[0]
    .split('</td>')
    .map((item) => {
      const match = item.match(/<td[^>]*>(.*)/);
      return match ? match[1].trim() : '';
    });

  return (
    <div>
      <h1 className={`${isSuccessful ? 'text-green-600' : 'text-red-600'} font-bold text-2xl`}>
        {isSuccessful ? 'SUCCESS' : 'FAIL'}
      </h1>

      <div className='flex justify-between'>
        {userData.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className='flex gap-4'>
        <h2>TMAX SERVER</h2>
        {tmaxServerTime && <span>{dayjs(tmaxServerTime).format('YYYY-MM-DD hh:MM A')}</span>}
      </div>
      <div className={'flex gap-4'}>
        <h2>VERCEL SERVER</h2>
        <span>{vercelServerTime}</span>
      </div>
      <Link href={'/detail'} className='text-blue-500 underline text-lg'>
        See Detail
      </Link>
    </div>
  );
}

export default page;
