import Image from 'next/image';
import { User } from '../repo/DataTypes';

export default function UserSection({ user }: { user: User }) {
  return (
    <div className="flex flex-row mb-4 items-center">
      {user.profilePictureUrl ? (
        <CircleWrapper>
          <Image
            src={user.profilePictureUrl}
            alt="avatar"
            className="rounded-full"
            width={30}
            height={30}
            style={{
              objectFit: 'cover',
            }}
          />
        </CircleWrapper>
      ) : (
        <CircleWrapper className="p-1 text-lg">😭</CircleWrapper>
      )}
      <div>
        <p className="font-bold text-gray-600">{user.username}</p>
        <p>{user.companyName}</p>
      </div>
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
