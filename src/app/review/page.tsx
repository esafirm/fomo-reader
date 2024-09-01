import Card from '@/components/Card';
import DataFetcher from '@/repo/DataFetcher';
import User from '@/components/User';
import Rating from '@/components/Rating';
import { IconBxCommentDetail } from '@/components/Icons';
import ActivityCounter from '@/components/ActivityCounter';

function PointsSection({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="pt-4">
      <span className="font-medium">{label}</span>

      {(items || []).map((item, index) => (
        <div key={index} className="text-gray-600">
          · {item}
        </div>
      ))}
    </div>
  );
}

export default async function ReviewsPage() {
  const reviews = (await DataFetcher.getCompanyReviews()).data;

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {reviews
        .filter((r) => r.inner.user && r.inner.jobTitle)
        .map((review, index) => (
          <Card key={index} href={`/review/${review.inner.activityId}`}>
            <User user={review.inner.user} />

            <p className="text-gray-600 text-sm">
              {review.inner.jobTitle.value}
            </p>

            <Rating rating={review.inner.rating} />

            <div className="font-bold text-xl pt-4">{review.inner.title}</div>
            <div className="text-gray-600 m-t-4">{review.inner.content}</div>

            <PointsSection label="Pros" items={review.inner.pros} />

            <PointsSection label="Cons" items={review.inner.cons} />

            <ActivityCounter
              like={review.inner.numberOfLikes}
              dislake={review.inner.numberOfDislikes}
              comment={review.inner.numberOfComments}
            />
          </Card>
        ))}
    </div>
  );
}
