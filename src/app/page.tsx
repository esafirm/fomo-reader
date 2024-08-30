import Card from '@/components/Card';
import User from '@/components/User';
import DataFetcher from '@/repo/DataFetcher';

export default async function FeedPage() {
  const feeds = (await DataFetcher.getFeeds()).data;

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {feeds
        .filter((f) => f.inner.user && f.inner.content)
        .map((feed, index) => (
          <Card key={index}>
            <User user={feed.inner.user} />

            <div className="font-bold text-xl">{feed.inner.title}</div>
            <div className="text-gray-600 m-t-4">{feed.inner.content}</div>

            <div className="mt-4">
              <div className="font-bold text-gray-600">Tax</div>
              <div>{feed.inner.tax ?? 'User pelit'}</div>
            </div>
          </Card>
        ))}
    </div>
  );
}
