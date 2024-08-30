import Card from '@/components/Card';
import User from '@/components/User';
import DataFetcher from '@/repo/DataFetcher';

export default async function FeedPage() {
  const salaries = (await DataFetcher.getSalary()).data;

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {salaries
        .filter((f) => f.inner.user && f.inner.jobTitle)
        .map((feed, index) => (
          <Card key={index}>
            <User user={feed.inner.user} />

            <p className="font-bold text-xl mb-2">
              {`${feed.inner.jobTitle.value} - ${feed.inner.yearsOfExperience} YOE`}
            </p>

            <SalaryInfo
              label="Base"
              value={feed.inner.baseMonthlySalaryInRupiah}
            />
            <SalaryInfo label="Bonus" value={feed.inner.annualBonusInRupiah} />
            <SalaryInfo
              label="Equity"
              value={feed.inner.annualMarketPriceEquityInRupiah}
            />

            <p className="font-bold text-lg pt-4 pb-2">Allowance</p>
            <AllowanceList allowances={feed.inner.allowances} />
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
