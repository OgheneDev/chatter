"use client"

import React, { useState, useMemo } from 'react';
import { Eye, Trash2, Image, Type, ChevronLeft, ChevronRight } from 'lucide-react';

interface Post {
  id: number;
  contentType: 'image' | 'text';
  username: string;
  fullname: string;
  comments: number;
  likes: number;
  isRestricted: boolean;
  createdAt: string;
  postType: 'all' | 'recent' | 'popular' | 'restricted';
}

type FilterType = 'all' | 'recent' | 'popular' | 'restricted';

const PostsManagement: React.FC = () => {
  // Sample data
  const samplePosts: Post[] = [
    {
      id: 1,
      contentType: "image",
      username: "ghhb",
      fullname: "Shaheed",
      comments: 0,
      likes: 0,
      isRestricted: false,
      createdAt: "26-04-2025",
      postType: "all"
    },
    {
      id: 2,
      contentType: "text",
      username: "ghhb",
      fullname: "Shaheed",
      comments: 0,
      likes: 0,
      isRestricted: false,
      createdAt: "26-04-2025",
      postType: "all"
    },
    {
      id: 3,
      contentType: "image",
      username: "john_doe",
      fullname: "John Doe",
      comments: 25,
      likes: 150,
      isRestricted: false,
      createdAt: "25-04-2025",
      postType: "popular"
    },
    {
      id: 4,
      contentType: "text",
      username: "jane_smith",
      fullname: "Jane Smith",
      comments: 8,
      likes: 42,
      isRestricted: true,
      createdAt: "24-04-2025",
      postType: "restricted"
    },
    {
      id: 5,
      contentType: "image",
      username: "mike_wilson",
      fullname: "Mike Wilson",
      comments: 5,
      likes: 18,
      isRestricted: false,
      createdAt: "23-04-2025",
      postType: "recent"
    },
    {
      id: 6,
      contentType: "text",
      username: "sarah_jones",
      fullname: "Sarah Jones",
      comments: 35,
      likes: 200,
      isRestricted: false,
      createdAt: "22-04-2025",
      postType: "popular"
    },
    {
      id: 7,
      contentType: "image",
      username: "alex_brown",
      fullname: "Alex Brown",
      comments: 12,
      likes: 67,
      isRestricted: true,
      createdAt: "21-04-2025",
      postType: "restricted"
    },
    {
      id: 8,
      contentType: "text",
      username: "emma_davis",
      fullname: "Emma Davis",
      comments: 3,
      likes: 9,
      isRestricted: false,
      createdAt: "20-04-2025",
      postType: "recent"
    },
    {
      id: 9,
      contentType: "image",
      username: "chris_taylor",
      fullname: "Chris Taylor",
      comments: 45,
      likes: 320,
      isRestricted: false,
      createdAt: "19-04-2025",
      postType: "popular"
    },
    {
      id: 10,
      contentType: "text",
      username: "lisa_white",
      fullname: "Lisa White",
      comments: 7,
      likes: 23,
      isRestricted: true,
      createdAt: "18-04-2025",
      postType: "restricted"
    }
  ];

  // State management
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    let filtered = samplePosts;

    // Apply filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(post => {
        switch (activeFilter) {
          case 'recent':
            return post.postType === 'recent';
          case 'popular':
            return post.postType === 'popular';
          case 'restricted':
            return post.isRestricted;
          default:
            return true;
        }
      });
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset page when filter or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm, entriesPerPage]);

  // Action handlers
  const handleViewPost = (postId: number) => {
    console.log(`View post ${postId}`);
  };

  const handleDeletePost = (postId: number) => {
    console.log(`Delete post ${postId}`);
  };

  const toggleRestricted = (postId: number) => {
    console.log(`Toggle restricted status for post ${postId}`);
  };

  // Filter tabs
  const filterTabs = [
    { key: 'all' as FilterType, label: 'All Posts' },
    { key: 'recent' as FilterType, label: 'Recent Posts' },
    { key: 'popular' as FilterType, label: 'Popular Posts' },
    { key: 'restricted' as FilterType, label: 'Restricted Posts' }
  ];

  return (
    <div className="my-10 px-2 md:px-0 max-w-[310px] md:max-w-full">
      {/* Mobile Filter Dropdown */}
      <div className="mb-7 md:hidden">
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value as FilterType)}
          className="w-full px-4 py-2 bg-gray-200 rounded-full text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {filterTabs.map((tab) => (
            <option key={tab.key} value={tab.key}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Filter Tabs */}
      <div className="mb-7 hidden md:block">
        <div className="flex flex-wrap gap-2 bg-gray-200 w-fit rounded-full p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold text-gray-900 transition-colors whitespace-nowrap ${
                activeFilter === tab.key
                  ? 'bg-green-600 text-white'
                  : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className='shadow-md bg-white rounded-xl'>
        {/* Controls */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-full px-7 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <span className="text-sm text-gray-700 whitespace-nowrap">Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-full px-4 py-2 text-sm w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search posts..."
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  Fullname
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  Comments
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  Likes
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  Restricted
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-14 h-12 rounded-lg bg-green-500 text-white">
                      {post.contentType === 'image' ? (
                        <Image className="w-5 h-5" />
                      ) : (
                        <Type className="w-5 h-5" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-500 underline cursor-pointer">
                      {post.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {post.fullname}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">
                      {post.comments}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">
                      {post.likes}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleRestricted(post.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                        post.isRestricted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          post.isRestricted ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">
                      {post.createdAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewPost(post.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors flex items-center space-x-2"
                      >
                        <Image className="w-4 h-4" />
                        <span>View Post</span>
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} entries
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors flex items-center space-x-1 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                Previous
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors flex items-center space-x-1 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsManagement;