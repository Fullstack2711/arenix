"use client";
import axios from 'axios';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Mail, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import UserSidebar from '../components/userSidebar';

function Page() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const API_URL = useMemo(
    () => process.env.NEXT_PUBLIC_BASE_URL || 'https://920b73597eff.ngrok-free.app/api',
    []
  );

  const getUser = useCallback(async (access_token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/users/`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${access_token}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    // faqat browserda ishlaydi
    if (typeof window !== 'undefined') {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        getUser(access_token);
      } else {
        setError('No access token found');
      }
    }
  }, [getUser]);

  const handleImageError = (userId) => {
    setImageErrors((prev) => ({ ...prev, [userId]: true }));
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex overflow-hidden">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 border-r border-gray-700 shadow-lg">
        <UserSidebar activeTab="friend" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64 overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-900 shadow-sm border-b border-gray-800">
          <div className="fixed max-w-6xl mx-auto px-8 py-6 ">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-200" />
              <div>
                <h1 className="text-lg font-semibold text-white">Team Members</h1>
                <p className="text-xs text-gray-400">{users.length} members</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-8xl mx-auto px-8 py-8">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
              <span className="mt-2 text-sm text-gray-500">Loading members...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 rounded-md p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="space-y-6 mt-16">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 hover:from-gray-700 hover:to-gray-800 transition-all duration-200 cursor-pointer shadow-lg border border-gray-700"
                  style={{ minWidth: 900, width: '100%' }}
                  onClick={() => router.push(`/friends/${user.id}`)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push(`/friends/${user.id}`) }}
                  aria-label={`View profile of ${user.username}`}
                >
                  <div className="flex items-center space-x-8">
                    <div className="flex-shrink-0 relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
                        {imageErrors[user.id] || !user.profile_image ? (
                          <div className="w-full h-full bg-white text-black flex items-center justify-center text-sm font-medium">
                            {user.username?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                        ) : (
                          <Image
                            src={`${API_URL}${user.profile_image}`}
                            alt={user.username}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(user.id)}
                            width={100}
                            height={100}
                          />
                        )}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-white truncate">
                          {user.username || 'Unknown User'}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-500">Online</span>
                          </div>
                        </div>
                      </div>
                      {user.email && (
                        <div className="flex items-center space-x-1 truncate max-w-40 text-xs text-gray-500">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </div>
                      )}
                    </div>

                    <ChevronRight className="w-4 h-4 text-white flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                No members found
              </h3>
              <p className="text-xs text-gray-500">
                No team members are currently available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
