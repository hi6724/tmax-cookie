import { NextRequest, NextResponse } from 'next/server';
import { generateHelthReserveURL } from '../utils';
import { COOKIE } from '../constants';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const userId = searchParams.get('userId');
  const managerCode = searchParams.get('managerCode');

  if (!date || !time || !userId || !managerCode) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const requestURL = generateHelthReserveURL({ date, time, userId, managerCode });
  const result = await (
    await fetch(requestURL, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Cookie: COOKIE,
      },
      cache: 'no-store',
    })
  ).json();

  return NextResponse.json({ ok: !result.errorMsg, errorMsg: result.errorMsg });
}
