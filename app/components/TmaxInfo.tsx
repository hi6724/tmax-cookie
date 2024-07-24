import dayjs from 'dayjs';
import Link from 'next/link';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

async function HunHeader({ cookie }: { cookie: string }) {
  const response = await fetch('https://talk.tmaxsoft.com/front/notice/findNoticeSetupBoardList.do', {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Cookie: cookie,
    },
    cache: 'no-store',
  });

  const html = await response.text();
  const tmaxServerTime = response.headers.get('Date');
  const vercelServerTime = dayjs().tz('Asia/Seoul').format('YYYY-MM-DD hh:mm:ss A');
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
    <>
      <h1 className={`${isSuccessful ? 'text-green-600' : 'text-red-600'} font-bold text-2xl`}>
        {isSuccessful ? 'Valid Session' : 'FAIL'}
      </h1>

      <div className='flex gap-2 flex-col'>
        {userData.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className='flex gap-4'>
        <h2>서버시간</h2>
        {tmaxServerTime && <span>{dayjs(tmaxServerTime).tz('Asia/Seoul').format('YYYY-MM-DD hh:mm:ss A')}</span>}
      </div>
      <div className={'flex gap-4'}>
        <h2>현재시간</h2>
        <span>{vercelServerTime}</span>
      </div>
    </>
  );
}

export default HunHeader;
