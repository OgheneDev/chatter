"use client"

import React, { useState, useMemo } from 'react';
import { Bookmark, Users, UserCheck, Eye, ChevronDown, ArrowUpRight } from 'lucide-react';

interface BookmarkInsight {
  id: number;
  postTitle: string;
  authorName: string;
  bookmarkCount: number;
  likeCount: number;
  createdAt: string;
}

interface FollowInsight {
  id: number;
  username: string;
  fullname: string;
  followers: number;
  following: number;
  followBackRatio: number;
  joinedAt: string;
}

type FilterType = 'bookmarks' | 'followers' | 'ratio';

const InsightsManagement: React.FC = () => {
  // Sample data for most bookmarked posts
  const bookmarkInsights: BookmarkInsight[] = [
    {
      id: 1,
      postTitle: "Ultimate Guide to Web Development",
      authorName: "john_dev",
      bookmarkCount: 1250,
      likeCount: 3400,
      createdAt: "2024-05-01"
    },
    {
      id: 2,
      postTitle: "10 Tips for Better Code",
      authorName: "sarah_coder",
      bookmarkCount: 980,
      likeCount: 2100,
      createdAt: "2024-05-02"
    },
    {
      id: 3,
      postTitle: "Understanding React Hooks",
      authorName: "react_master",
      bookmarkCount: 850,
      likeCount: 1900,
      createdAt: "2024-05-03"
    }
  ];

  // Sample data for user follows
  const followInsights: FollowInsight[] = [
    {
      id: 1,
      username: "tech_influencer",
      fullname: "Tech Guru",
      followers: 25000,
      following: 1200,
      followBackRatio: 0.15,
      joinedAt: "2024-01-15"
    },
    {
      id: 2,
      username: "code_ninja",
      fullname: "Coding Expert",
      followers: 18000,
      following: 900,
      followBackRatio: 0.22,
      joinedAt: "2024-02-01"
    },
    {
      id: 3,
      username: "web_wizard",
      fullname: "Web Developer",
      followers: 15000,
      following: 800,
      followBackRatio: 0.18,
      joinedAt: "2024-02-15"
    }
  ];

  // Stats data
  const stats = [
    {
      title: "Total Bookmarks",
      value: "45.2K",
      icon: Bookmark,
      color: "bg-purple-500",
      change: "+12.5%",
      trend: "up"
    },
    {
      title: "Total Followers",
      value: "128.5K",
      icon: Users,
      color: "bg-blue-500",
      change: "+8.2%",
      trend: "up"
    },
    {
      title: "Average Follow-back Rate",
      value: "42%",
      icon: UserCheck,
      color: "bg-green-500",
      change: "-2.1%",
      trend: "down"
    }
  ];

  // State management and filter logic similar to other pages
  const [activeFilter, setActiveFilter] = useState<FilterType>('bookmarks');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Action handlers
  const handleViewPost = (postId: number) => {
    console.log(`View post ${postId}`);
  };

  const handleViewProfile = (username: string) => {
    console.log(`View profile ${username}`);
  };

  return (
    <div className="my-10 px-2 md:px-0 max-w-[320px] mx-auto md:mx-0 md:max-w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-900">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              } flex items-center gap-1`}>
                {stat.change}
                <ArrowUpRight className={`w-4 h-4 ${
                  stat.trend === 'down' && 'transform rotate-90'
                }`} />
              </span>
            </div>
            <h3 className="text-sm text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Bookmarked Posts Table */}
        <div className="bg-gray-800 rounded-xl shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Most Bookmarked Posts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white">Post Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white">Bookmarks</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookmarkInsights.map((insight) => (
                  <tr key={insight.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{insight.postTitle}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-200">{insight.authorName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{insight.bookmarkCount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{insight.likeCount.toLocaleString()} likes</div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewPost(insight.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors"
                      >
                        View Post
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Follow Insights Table */}
        <div className="bg-gray-800 rounded-xl shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Top Users by Followers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white">Followers</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white">Follow Ratio</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {followInsights.map((insight) => (
                  <tr key={insight.id} >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-green-500 cursor-pointer">{insight.username}</div>
                      <div className="text-xs text-gray-500">{insight.fullname}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{insight.followers.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{insight.following.toLocaleString()} following</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">
                        {(insight.followBackRatio * 100).toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewProfile(insight.username)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsManagement;
