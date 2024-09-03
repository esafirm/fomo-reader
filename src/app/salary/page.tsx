import Card from '@/components/Card';
import User from '@/components/User';
import ActivityCounter from '@/components/ActivityCounter';

import { getSalaries } from './SalaryFetcher';
import { AllowanceList, SalaryInfo } from './SalaryComponents';
import { SubTitle } from '@/components/Text';

export default async function FeedPage() {
  const salaries = await getSalaries();

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

          <SubTitle className='mt-4'>Allowances</SubTitle>
          <AllowanceList allowances={salary.inner.allowances} />

          <SubTitle className='mt-4'>Role Level</SubTitle>
          <p>{salary.inner.roleLevel?.value ?? 'N/A'}</p>

          <ActivityCounter
            like={salary.inner.numberOfLikes}
            dislike={salary.inner.numberOfDislikes}
            comment={salary.inner.numberOfComments}
          />
        </Card>
      ))}
    </div>
  );
}
