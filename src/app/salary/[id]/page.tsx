import Card from '@/components/Card';
import User from '@/components/User';
import DataFetcher from '@/repo/DataFetcher';

import { Title, Content } from '@/components/Text';
import type { FeedComment, InnerComment } from '@/repo/DataTypes';
import { AllowanceList, SalaryInfo } from '../SalaryComponents';

interface SalaryDetailPageProps {
  params: {
    id: string;
  };
}

export default async function SalaryDetailPage({
  params,
}: SalaryDetailPageProps) {
  const salary = DataFetcher.getSalary(params.id);
  const comments = DataFetcher.getActivityComments(params.id);

  const salaryData = await salary;
  const commentsData = (await comments).data;

  return (
    <div className="pt-4">
      <Card key={params.id}>
        <User user={salaryData.inner.user} />

        <p className="font-bold text-xl mb-2">
          {`${salaryData.inner.jobTitle.value} - ${salaryData.inner.yearsOfExperience} YOE`}
        </p>

        <SalaryInfo
          label="Base"
          value={salaryData.inner.baseMonthlySalaryInRupiah}
        />
        <SalaryInfo
          label="Bonus"
          value={salaryData.inner.annualBonusInRupiah}
        />
        <SalaryInfo
          label="Equity"
          value={salaryData.inner.annualMarketPriceEquityInRupiah}
        />

        <p className="font-bold text-lg pt-4 pb-2">Allowance</p>
        <AllowanceList allowances={salaryData.inner.allowances} />
      </Card>

      <CommentSection comments={commentsData} />
    </div>
  );
}

function CommentSection({ comments }: { comments: FeedComment[] }) {
  if (comments.length === 0) return;

  return (
    <div>
      <Title className="py-4">Comments</Title>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}

function Comment({ comment }: { comment: FeedComment }) {
  return (
    <>
      <Card className="mb-4">
        <User user={comment.inner.user} />
        <Content>{comment.inner.value}</Content>
      </Card>

      {comment.inner.comments.map((innerComment, index) => (
        <InnerComment key={index} comment={innerComment} />
      ))}
    </>
  );
}

function InnerComment({ comment }: { comment: InnerComment }) {
  return (
    <Card className="mb-4 ml-8">
      <User user={comment.user} />
      <Content>{comment.value}</Content>
    </Card>
  );
}
