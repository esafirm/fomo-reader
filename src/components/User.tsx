import Image from 'next/image';
import { User } from '../repo/DataTypes';

export default function UserSection({ user }: { user: User }) {
  return (
    <div className="flex flex-row mb-4">
      <Image
        src={user.profilePictureUrl ?? ''}
        alt="avatar"
        className="rounded-full mr-4"
        width={30}
        height={30}
        style={{
          objectFit: 'contain',
        }}
      />
      <div>
        <div className="font-bold text-gray-600">{user.username}</div>
        <div>{user.companyName}</div>
      </div>
    </div>
  );
}
