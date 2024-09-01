export function AllowanceList({ allowances }: { allowances: string[] }) {
  if (allowances.length === 0) {
    return <p>N\A</p>;
  }

  return allowances.map((allowance, index) => (
    <p key={index}>{`· ${allowance}`}</p>
  ));
}

export function SalaryInfo({
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

export function formatRupiah(value: string | number | null): string {
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
