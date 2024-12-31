import Card from '@/components/Card';
import { NextSearchParams } from '@/repo/ExternalParams';
import SalaryCheckForm from './SalaryCheckForm';

import { checkSalary } from './SalaryChecker';

type SalaryCheckProps = {
  searchParams: NextSearchParams;
};

type CheckSalaryParams = {
  job: string;
  salary: number;
};

const UNDEFINED_PARAMS = {
  job: '',
  salary: 0,
};

export default async function SalaryCheckPage(props: SalaryCheckProps) {
  const params = safelyGetParams(props.searchParams);

  return (
    <div className="pt-4">
      <Card key={'salary-input'}>
        <SalaryCheckForm />
        {params && params !== UNDEFINED_PARAMS ? (
          <SalaryInfo job={params.job} salary={params.salary} />
        ) : (
          <EmptyJob />
        )}
      </Card>
    </div>
  );
}

async function SalaryInfo(params: CheckSalaryParams) {
  const result = await checkSalary(params.job, params.salary);
  return (
    <p className="text-gray-600 text-lg">
      Your salary of <strong>{parseToRupiah(params.salary)}</strong> as a{' '}
      <strong>{params.job}</strong> is in the{' '}
      <strong>{result.description}</strong> range.
    </p>
  );
}

function EmptyJob() {
  return (
    <div className="flex items-center justify-center py-4">
      <p className="text-gray-600 text-lg">
        Please select a <strong>job</strong> title to see salary information.
      </p>
    </div>
  );
}

function safelyGetParams(searchParams: NextSearchParams): CheckSalaryParams {
  if (!searchParams) return UNDEFINED_PARAMS;

  const job = searchParams['job'];
  const salary = searchParams['salary'];

  if (Array.isArray(job) || Array.isArray(salary)) return UNDEFINED_PARAMS;
  if (!job || !salary) return UNDEFINED_PARAMS;

  return {
    job: job,
    salary: salary ? parseInt(salary) : 0,
  };
}

function parseToRupiah(salary: number): string {
  return salary.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
}
