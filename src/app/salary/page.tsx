import Card from '@/components/Card';
import User from '@/components/User';

import { getSalaries } from '../review/SalaryFetcher';

export default async function FeedPage() {
  const salaries = await getSalaries();

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {salaries.map((salary, index) => (
        <Card key={index} href={`/feed/${salary.inner.activityId}`}>
          <User user={salary.inner.user} />

          <p className="font-bold text-xl mb-2">
            {`${salary.inner.jobTitle.value} - ${salary.inner.yearsOfExperience} YOE`}
          </p>

          <SalaryInfo
            label="Base"
            value={salary.inner.baseMonthlySalaryInRupiah}
          />
          <SalaryInfo label="Bonus" value={salary.inner.annualBonusInRupiah} />
          <SalaryInfo
            label="Equity"
            value={salary.inner.annualMarketPriceEquityInRupiah}
          />

          <p className="font-bold text-lg pt-4 pb-2">Allowance</p>
          <AllowanceList allowances={salary.inner.allowances} />
        </Card>
      ))}
    </div>
  );
}

function AllowanceList({ allowances }: { allowances: string[] }) {
  if (allowances.length === 0) {
    return <p>N\A</p>;
  }

  return allowances.map((allowance, index) => (
    <p key={index}>{`· ${allowance}`}</p>
  ));
}

function SalaryInfo({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="flex flex-row">
      <p className="text-gray-600 m-t-4">{label}</p>
      <p className="ml-2">{`${formatRupiah(value)}`}</p>
    </div>
  );
}

function formatRupiah(value: string | number | null): string {
  if (!value) return 'N/A';

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  try {
    if (typeof value === 'string') {
      return formatter.format(parseInt(value));
    }
    return formatter.format(value);
  } catch (error) {
    return `{$value}`;
  }
}
