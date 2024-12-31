'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import jobTitles from './job_title.json';
import { IconSpinner } from '@/components/Icons';

export default function SalaryCheckForm() {
  const pathName = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  let handleSearch = (job: string, salary: string) => {
    const isJobValid = jobTitles.find((title) => title === job);
    if (!isJobValid) return;

    let params = new URLSearchParams(window.location.search);
    if (job) {
      params.set('job', job);
    } else {
      params.delete('job');
    }

    if (salary) {
      params.set('salary', salary);
    } else {
      params.delete('salary');
    }

    startTransition(() => {
      replace(`${pathName}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col space-y-4 items-center justify-center py-4">
      <div className="relative w-full">
        <input
          id="role"
          type="text"
          className="mt-2 p-2 border rounded min-w-0 w-full"
          list="options"
          placeholder="Cari role kamu disini…"
        />

        <datalist id="options">
          {jobTitles.map((title) => {
            return <option key={title} value={title} />;
          })}
        </datalist>
      </div>

      <div className="relative w-full">
        <input
          id="salary"
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md text-lg pr-10 px-4"
          placeholder="Masukan salary kamu disini…"
          onInput={(e) => {
            const input = e.target as HTMLInputElement;

            let value = input.value.replace(/[^,\d]/g, '');
            const split = value.split(',');
            const remainder = split[0].length % 3;

            let rupiah = split[0].substring(0, remainder);
            const thousands = split[0].substring(remainder).match(/\d{3}/gi);

            if (thousands) {
              const separator = remainder ? '.' : '';
              rupiah += separator + thousands.join('.');
            }

            rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
            input.value = rupiah;
          }}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          const jobTitleInput = document.getElementById(
            'role'
          ) as HTMLInputElement;
          const salaryInput = document.getElementById(
            'salary'
          ) as HTMLInputElement;
          handleSearch(jobTitleInput.value, rupiahToNumberInString(salaryInput.value));
        }}
      >
        Submit
      </button>

      {isPending && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <div className='className="w-5 h-5 text-gray-500 animate-spin"'>
            <IconSpinner />
          </div>
        </div>
      )}
    </div>
  );
}

function rupiahToNumberInString(rupiah: string) {
  return rupiah.replace(/[^0-9]/g, '');
}
