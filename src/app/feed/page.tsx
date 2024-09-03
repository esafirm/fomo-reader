import Card from '@/components/Card';
import User from '@/components/User';
import DataFetcher from '@/repo/DataFetcher';

import { Title, Content, SubTitle } from '@/components/Text';
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

            <SubTitle className="pt-4">Tax</SubTitle>
            <Content>{feed.inner.tax ?? 'User pelit'}</Content>

            <ActivityCounter
              like={feed.inner.numberOfLikes}
              dislike={feed.inner.numberOfDislikes}
              comment={feed.inner.numberOfComments}
            />
          </Card>
        ))}
    </div>
  );
}
