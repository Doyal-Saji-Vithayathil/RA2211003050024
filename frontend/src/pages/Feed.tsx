import React, { useState, useEffect } from 'react';
import { getLatestPosts } from '../services/api';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const data = await getLatestPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    // Initial fetch
    fetchPosts();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchPosts, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Posts</h2>
      {loading ? (
        <LoadingSpinner />
      ) : posts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No posts found.</p>
      )}
    </div>
  );
};

export default Feed;