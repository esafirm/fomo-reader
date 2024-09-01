import Card from '@/components/Card';
import User from '@/components/User';
import DataFetcher from '@/repo/DataFetcher';

import { Title, Content } from '@/components/Text';
import type { FeedComment, InnerComment } from '@/repo/DataTypes';

interface FeedDetailPageProps {
  params: {
    feedid: string;
  };
}

export default async function FeedDetailPage({ params }: FeedDetailPageProps) {
  const feed = DataFetcher.getFeed(params.feedid);
  const comments = DataFetcher.getFeedComments(params.feedid);

  const feedData = await feed;
  const commentsData = (await comments).data;

  return (
    <div>
      <Card key={params.feedid}>
        <User user={feedData.inner.user} />
        <Title>{feedData.inner.title}</Title>
        <Content>{feedData.inner.content}</Content>
      </Card>

      <Title className="py-4">Comments</Title>
      {commentsData.map((comment, index) => (
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