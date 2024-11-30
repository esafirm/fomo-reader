import Image from 'next/image';
import { Company } from '@/repo/DataTypes';
import Link from 'next/link';

type CompanyProps = {
  company: Company;
};

export function CompanyAvatar(props: CompanyProps) {
  if (!props.company.imageUrl) {
    return <CircleWrapper className="p-1 text-lg">😭</CircleWrapper>;
  }

  return (
    <CircleWrapper>
      <Image
        src={props.company.imageUrl}
        alt="avatar"
        className="rounded-full"
        width={30}
        height={30}
        style={{
          objectFit: 'cover',
        }}
      />
    </CircleWrapper>
  );
}

export function CompanyOtherStats(props: CompanyProps) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <div className="flex flex-row space-x-1">
        <p>{props.company.totalSalaries}</p>
        <p>Gaji</p>
      </div>

      <Link
        href={`/company/review/${props.company.id}`}
        aria-label="Go to Company Feeds"
        className="flex flex-row space-x-1 rounded-md hover:bg-slate-200 hover:px-2"
      >
        <p>{props.company.totalReviews}</p>
        <p>Reviews</p>
      </Link>
    </div>
  );
}

function CircleWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full bg-slate-200 border-2 border-blue-400 mr-4 w-8 h-8 ${className}`}
    >
      {children}
    </div>
  );
}
