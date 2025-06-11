"use client"

import React, { useState, useMemo } from 'react';
import { Eye, UserX, ChevronLeft, ChevronRight } from 'lucide-react';

interface User {
  id: number;
  fullname: string;
  username: string;
  deviceType: 'Android' | 'iOS' | 'Web';
  isModerator: boolean;
  profileImage: string;
  userType: 'all' | 'verified' | 'subscription' | 'moderator';
}

type FilterType = 'all' | 'verified' | 'subscription' | 'moderator';

const UserManagement: React.FC = () => {
  // Sample data
  const sampleUsers: User[] = [
    {
      id: 1,
      fullname: "Oluwaferanmi Olotu",
      username: "Dreammm",
      deviceType: "Android",
      isModerator: false,
      profileImage: "/api/placeholder/60/60",
      userType: "all"
    },
    {
      id: 2,
      fullname: "Sarah Johnson",
      username: "SarahJ",
      deviceType: "iOS",
      isModerator: true,
      profileImage: "/api/placeholder/60/60",
      userType: "verified"
    },
    {
      id: 3,
      fullname: "Michael Chen",
      username: "MikeC",
      deviceType: "Web",
      isModerator: false,
      profileImage: "/api/placeholder/60/60",
      userType: "subscription"
    },
    {
      id: 4,
      fullname: "Emily Rodriguez",
      username: "EmilyR",
      deviceType: "Android",
      isModerator: true,
      profileImage: "/api/placeholder/60/60",
      userType: "moderator"
    },
    {
      id: 5,
      fullname: "David Kim",
      username: "DavidK",
      deviceType: "iOS",
      isModerator: false,
      profileImage: "/api/placeholder/60/60",
      userType: "verified"
    },
    {
      id: 6,
      fullname: "Jessica Wilson",
      username: "JessW",
      deviceType: "Android",
      isModerator: false,
      profileImage: "/api/placeholder/60/60",
      userType: "all"
    },
    {
      id: 7,
      fullname: "Robert Taylor",
      username: "RobT",
      deviceType: "Web",
      isModerator: true,
      profileImage: "/api/placeholder/60/60",
      userType: "moderator"
    },
    {
      id: 8,
      fullname: "Amanda Davis",
      username: "AmandaD",
      deviceType: "iOS",
      isModerator: false,
      profileImage: "/api/placeholder/60/60",
      userType: "subscription"
    },
    {
      id: 9,
      fullname: "James Brown",
      username: "JamesB",
      deviceType: "Android",
      isModerator: false,
      profileImage: "/api/placeholder/60/60",
      userType: "verified"
    },
    {
      id: 10,
      fullname: "Lisa Anderson",
      username: "LisaA",
      deviceType: "Web",
      isModerator: true,
      profileImage: "/api/placeholder/60/60",
      userType: "moderator"
    },
    {
      id: 11,
      fullname: "Chris Martinez",
      username: "ChrisM",
      deviceType: "iOS",
      isModerator: false,
      profileImage: "/api/placeholder/60/60",
      userType: "all"
    },
    {
      id: 12,
      fullname: "Nicole Thompson",
      username: "NicoleT",
      deviceType: "Android",
      isModerator: false,
      profileImage: "/api/placeholder/60/60",
      userType: "subscription"
    }
  ];

  // State management
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let filtered = sampleUsers;

    // Apply filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(user => {
        switch (activeFilter) {
          case 'verified':
            return user.userType === 'verified';
          case 'subscription':
            return user.userType === 'subscription';
          case 'moderator':
            return user.isModerator;
          default:
            return true;
        }
      });
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset page when filter or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm, entriesPerPage]);

  // Action handlers
  const handleView = (userId: number) => {
    console.log(`View user ${userId}`);
  };

  const handleBlock = (userId: number) => {
    console.log(`Block user ${userId}`);
  };

  const toggleModerator = (userId: number) => {
    console.log(`Toggle moderator status for user ${userId}`);
  };

  // Filter tabs
  const filterTabs = [
    { key: 'all' as FilterType, label: 'All Users' },
    { key: 'verified' as FilterType, label: 'Verified User' },
    { key: 'subscription' as FilterType, label: 'Verified User By Subscription' },
    { key: 'moderator' as FilterType, label: 'Moderators' }
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
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-700 whitespace-nowrap">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-700 whitespace-nowrap">entries</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 max-w-sm">
                <span className="text-sm text-gray-700 whitespace-nowrap">Search:</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Search users..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900  tracking-wider">
                  User Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900  tracking-wider">
                  Fullname
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900  tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900  tracking-wider">
                  Device Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900  tracking-wider">
                  Moderator
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900  tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-17 h-13 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-semibold">
                        {user.fullname.charAt(0)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.fullname}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">
                      {user.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">
                      {user.deviceType}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleModerator(user.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                        user.isModerator ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          user.isModerator ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBlock(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors flex items-center space-x-3"
                      >
                        <UserX className="w-5 h-5" />
                        <span>Block</span>
                      </button>
                      <button
                        onClick={() => handleView(user.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors flex items-center space-x-3"
                      >
                        <Eye className="w-5 h-5" />
                        <span>View</span>
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
            <div className="text-sm text-gray-700 text-center md:text-left">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} entries
            </div>
            
            <div className="flex items-center justify-center md:justify-end space-x-2 overflow-x-auto">
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

export default UserManagement;