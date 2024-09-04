import Card from '@/components/Card';
import User from '@/components/User';
import ActivityCounter from '@/components/ActivityCounter';

import { getSalaries } from './SalaryFetcher';
import { AllowanceList, SalaryInfo } from './SalaryComponents';
import { SubTitle } from '@/components/Text';
import PagingIndicator from '@/components/PagingIndicator';

type NextSearchParams = { [key: string]: string | string[] | undefined };

type SalaryPageProps = {
  searchParams: NextSearchParams;
};

export default async function FeedPage(props: SalaryPageProps) {
  const page = safelyGetPage(props.searchParams);
  const salaries = await getSalaries(page);

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {salaries.map((salary, index) => (
        <Card key={index} href={`/salary/${salary.inner.activityId}`}>
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

          <SubTitle className="mt-4">Allowances</SubTitle>
          <AllowanceList allowances={salary.inner.allowances} />

          <SubTitle className="mt-4">Role Level</SubTitle>
          <p>{salary.inner.roleLevel?.value ?? 'N/A'}</p>

          <ActivityCounter
            like={salary.inner.numberOfLikes}
            dislike={salary.inner.numberOfDislikes}
            comment={salary.inner.numberOfComments}
          />
        </Card>
      ))}

      <PagingIndicator
        totalPages={100}
        currentPage={page}
        basePath="/salary/"
      />
    </div>
  );
}

function safelyGetPage(searchParams: NextSearchParams): number {
  if (!searchParams) return 1;
  const page = searchParams['page'];

  if (Array.isArray(page)) return 1;
  return page ? parseInt(page, 10) : 1;
}
