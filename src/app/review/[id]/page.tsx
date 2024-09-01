import Card from '@/components/Card';
import User from '@/components/User';
import DataFetcher from '@/repo/DataFetcher';

import { Title, Content } from '@/components/Text';
import type { FeedComment, InnerComment } from '@/repo/DataTypes';

interface ReviewDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ReviewDetailPage({
  params,
}: ReviewDetailPageProps) {
  const review = DataFetcher.getCompanyReview(params.id);
  const comments = DataFetcher.getActivityComments(params.id);

  const reviewData = await review;
  const commentsData = (await comments).data;

  return (
    <div className="pt-4">
      <Card key={params.id}>
        <User user={reviewData.inner.user} />
        <Title>{reviewData.inner.title}</Title>
        <Content>{reviewData.inner.content}</Content>
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
