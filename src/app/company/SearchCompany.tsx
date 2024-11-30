'use client';

import { IconSpinner } from '@/components/Icons';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function SearchCompany() {
  const pathName = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  let handleSearch = (term: string) => {
    console.log('searching for', term);
    let params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    params.delete('page');

    startTransition(() => {
      replace(`${pathName}?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative w-full">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md text-lg pr-10"
          placeholder="Search company here…"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {isPending && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className='className="w-5 h-5 text-gray-500 animate-spin"'>
              <IconSpinner />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
