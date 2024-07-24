'use client';

import React, { useState } from 'react';
import { REQUEST_LIST_DATA_SEO } from '../constants';
import dayjs from 'dayjs';

function ReserveSeo() {
  const [reserveResult, setReserveResult] = useState<any[]>(REQUEST_LIST_DATA_SEO);
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
        return { ...data, result: response.ok ? 'SUCCESS' : 'FAIL', error: response.errorMsg };
      })
    );
    setReserveResult(result);
    setLoading(false);
  };

  return (
    <div className='md:grid md:grid-cols-2 w-full gap-4'>
      {REQUEST_LIST_DATA_SEO.map((data, i) => {
        const resultData = reserveResult.find((result) => result.date === data.date);
        const status = resultData?.result;
        const errorMsg = resultData?.error;
        return (
          <div key={i} className='w-full sm:border-2 border-gray-100 p-2'>
            <div
              className={`flex gap-4 w-full justify-between font-semibold md:justify-start
              ${status === 'FAIL' ? 'text-red-600' : ''}
              ${status === 'SUCCESS' ? 'text-green-600' : ''}
              `}
            >
              <div className='w-32 text-sm'>{dayjs(data.date).format('YYYY-MM-DD ddd')}</div>
              <div className='text-sm'>
                {data.time}:00 ~ {data.time}:50
              </div>
            </div>
            {status === 'FAIL' && <div className='text-red-600 text-sm mb-4'>{errorMsg}</div>}
            {status === 'SUCCESS' && <div className='text-green-600'>SUCCESS</div>}
          </div>
        );
      })}
      <div className='col-span-2 flex justify-center'>
        <button
          disabled={
            loading || reserveResult.length === 0 || reserveResult.every((result) => result.result === 'SUCCESS')
          }
          onClick={handleReserve}
          className='p-4 bg-green-400 rounded-lg my-8 w-1/2 hover:bg-green-600 disabled:bg-slate-400'
        >
          Reserve
        </button>
      </div>
    </div>
  );
}

export default ReserveSeo;
