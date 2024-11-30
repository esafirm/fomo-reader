import ActivityCounter from '@/components/ActivityCounter';
import Card from '@/components/Card';
import { PointsSection } from '@/components/PointsSection';
import Rating from '@/components/Rating';
import User from '@/components/User';
import DataFetcher from '@/repo/DataFetcher';

type CompanyReviewProps = {
  params: {
    companyId: string;
  };
};

export default async function CompanyReview(props: CompanyReviewProps) {
  const reviews = (
    await DataFetcher.getCompanyReviewForCompany(props.params.companyId)
  ).data;

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
              dislike={review.inner.numberOfDislikes}
              comment={review.inner.numberOfComments}
            />
          </Card>
        ))}
    </div>
  );
}
