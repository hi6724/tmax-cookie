'use client';

import React, { useState } from 'react';
import { REQUEST_LIST_DATA } from '../constants';
import dayjs from 'dayjs';

function Reserve() {
  const [reserveResult, setReserveResult] = useState<any[]>(REQUEST_LIST_DATA);
  const [loading, setLoading] = useState(false);

  const handleReserve = async () => {
    if (loading) return;
    setLoading(true);
    const result = await Promise.all(
      reserveResult.map(async (data) => {
        const requestUrl = new URL(`${window.location.origin}/api`);
        requestUrl.searchParams.set('date', data.date);
        requestUrl.searchParams.set('time', data.time);
        requestUrl.searchParams.set('userId', data.userId);
        requestUrl.searchParams.set('managerCode', data.managerCode);
        if (data.result === 'SUCCESS') return { ...data, result: 'SUCCESS' };
        const response = await (await fetch(requestUrl.toString())).json();
        return { ...data, result: response.ok ? 'SUCCESS' : 'FAIL' };
      })
    );
    setReserveResult(result);
    setLoading(false);
  };

  return (
    <div className='grid grid-cols-2 w-fit gap-4'>
      {REQUEST_LIST_DATA.map((data, i) => {
        const status = reserveResult.find((result) => result.date === data.date)?.result;
        return (
          <div
            className={`flex gap-4 w-fit odd:border-r-2 pr-4 font-semibold
              ${status === 'FAIL' ? 'text-red-600' : ''}
              ${status === 'SUCCESS' ? 'text-green-600' : ''}
              `}
            key={i}
          >
            <div className='w-40'>{dayjs(data.date).format('YYYY-MM-DD ddd')}</div>
            <div>
              {data.time}:00 ~ {data.time}:50
            </div>
            <div>{reserveResult.find((result) => result.date === data.date)?.result ?? ''}</div>
          </div>
        );
      })}
      <div className='col-span-2 flex justify-center'>
        <button
          disabled={loading}
          onClick={handleReserve}
          className='p-4 bg-green-400 rounded-lg my-8 w-1/2 hover:bg-green-600 disabled:bg-slate-400'
        >
          Reserve
        </button>
      </div>
    </div>
  );
}

export default Reserve;
