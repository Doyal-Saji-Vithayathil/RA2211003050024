import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Use a random image from Lorem Picsum based on post ID
  const imageUrl = `https://picsum.photos/seed/post-${post.id}/400/300`;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-2 hover:shadow-lg transition-shadow">
      <img src={imageUrl} alt="Post" className="w-full h-48 object-cover rounded-md" />
      <p className="text-gray-800">{post.content}</p>
      <div className="flex justify-between text-gray-600 text-sm">
        <span>Comments: {post.commentCount || 0}</span>
        <span>{new Date(post.timestamp || Date.now()).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PostCard;