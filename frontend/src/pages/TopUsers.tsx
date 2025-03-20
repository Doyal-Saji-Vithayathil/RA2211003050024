import React, { useState, useEffect } from 'react';
import { getTopUsers } from '../services/api';
import { User } from '../types';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';

const TopUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await getTopUsers();
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Users by Post Count</h2>
      {loading ? (
        <LoadingSpinner />
      ) : users.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user, index) => (
            <UserCard key={user.id} user={user} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No users found.</p>
      )}
    </div>
  );
};

export default TopUsers;