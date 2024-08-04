import Image from 'next/image';

import Card from './components/Card';
import { getFeeds } from './repo/DataFetcher';
import { Feed } from './repo/Feed';

export default async function FeedPage() {
  const feeds = (await getFeeds()).data;

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {feeds
        .filter((f) => f.inner.user)
        .map((feed, index) => (
          <Card key={index}>
            <UserSection feed={feed} />

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

function UserSection({ feed }: { feed: Feed }) {
  return (
    <div className="flex flex-row mb-4">
      <Image
        src={feed.inner.user.profilePictureUrl ?? ''}
        alt="avatar"
        className="rounded-full mr-4"
        width={30}
        height={30}
        style={{
          objectFit: 'contain',
        }}
      />
      <div>
        <div className="font-bold text-gray-600">
          {feed.inner.user.username}
        </div>
        <div>{feed.inner.user.companyName}</div>
      </div>
    </div>
  );
}
