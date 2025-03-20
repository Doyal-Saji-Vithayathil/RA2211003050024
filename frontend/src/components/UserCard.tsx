import React from 'react';
import { User } from '../types';

interface UserCardProps {
  user: User;
  index: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, index }) => {
  // Use a random image from Lorem Picsum based on user ID
  const imageUrl = `https://picsum.photos/seed/user-${user.id}/200/200`;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow">
      <img src={imageUrl} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          #{index + 1} {user.name}
        </h3>
        <p className="text-gray-600">Posts: {user.postCount || 0}</p>
      </div>
    </div>
  );
};

export default UserCard;