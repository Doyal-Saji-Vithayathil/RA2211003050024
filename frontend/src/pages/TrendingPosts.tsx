import React, { useState, useEffect } from 'react';
import { getTrendingPosts } from '../services/api';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const TrendingPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await getTrendingPosts();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Trending Posts (Most Commented)</h2>
      {loading ? (
        <LoadingSpinner />
      ) : posts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No trending posts found.</p>
      )}
    </div>
  );
};

export default TrendingPosts;