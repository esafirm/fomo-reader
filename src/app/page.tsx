import Card from '@/components/Card';
import User from '@/components/User';
import DataFetcher from '@/repo/DataFetcher';

import { Title, Content } from '@/components/Text';
import ActivityCounter from '@/components/ActivityCounter';

export default async function FeedPage() {
  const feeds = (await DataFetcher.getFeeds()).data;

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {feeds
        .filter((f) => f.inner.user && f.inner.content)
        .map((feed, index) => (
          <Card key={index} href={`/feed/${feed.inner.activityId}`}>
            <User user={feed.inner.user} />

            <Title>{feed.inner.title}</Title>
            <Content>{feed.inner.content}</Content>

            <div className="mt-4">
              <div className="font-bold text-gray-600">Tax</div>
              <Content>{feed.inner.tax ?? 'User pelit'}</Content>
            </div>

            <ActivityCounter
              like={feed.inner.numberOfLikes}
              dislake={feed.inner.numberOfDislikes}
              comment={feed.inner.numberOfComments}
            />
          </Card>
        ))}
    </div>
  );
}
