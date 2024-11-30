import Card from '@/components/Card';
import User from '@/components/User';
import DataFetcher from '@/repo/DataFetcher';

import { Title, Content, SubTitle } from '@/components/Text';
import ActivityCounter from '@/components/ActivityCounter';
import { AllowanceList, SalaryInfo } from '@/app/salary/SalaryComponents';
import PagingIndicator from '@/components/PagingIndicator';
import { NextSearchParams } from '@/repo/ExternalParams';
import CreationTime from '@/components/CreationTime';

interface CompanyDetailPageProps {
  params: {
    companyId: number;
  };
  searchParams: NextSearchParams;
}

export default async function CompanyDetailPage(props: CompanyDetailPageProps) {
  const page = safelyGetPage(props.searchParams);
  const salaries = (
    await DataFetcher.getSoftwareEngineerSalariesInCompany(
      props.params.companyId
    )
  ).data;

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {salaries
        .filter((salary) => salary.inner.jobTitle)
        .map((salary, index) => (
          <Card key={index} href={`/salary/${salary.inner.activityId}`}>
            <User user={salary.inner.user} />

            <p className="font-bold text-xl mb-2">
              {`${salary.inner.jobTitle.value} - ${salary.inner.yearsOfExperience} YOE`}
            </p>

            <SalaryInfo
              label="Base"
              value={salary.inner.baseMonthlySalaryInRupiah}
            />
            <SalaryInfo
              label="Bonus"
              value={salary.inner.annualBonusInRupiah}
            />
            <SalaryInfo
              label="Equity"
              value={salary.inner.annualMarketPriceEquityInRupiah}
            />

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
        basePath={`/company/${props.params.companyId}/`}
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
