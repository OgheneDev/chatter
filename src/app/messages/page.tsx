"use client"

import React, { useState, useMemo } from 'react';
import { MessageSquare, Users, AlertTriangle, Eye, Ban, Clock, Mail } from 'lucide-react';

interface MessageInsight {
  id: number;
  username: string;
  fullname: string;
  messagesSent: number;
  messagesReceived: number;
  activeStatus: 'very active' | 'active' | 'inactive';
  lastActive: string;
  isFlagged: boolean;
  flagReason?: string;
}

type FilterType = 'all' | 'active' | 'flagged' | 'inactive';

const MessagesManagement: React.FC = () => {
  // Sample data
  const sampleInsights: MessageInsight[] = [
    {
      id: 1,
      username: "john_doe",
      fullname: "John Doe",
      messagesSent: 150,
      messagesReceived: 143,
      activeStatus: "very active",
      lastActive: "2 mins ago",
      isFlagged: false
    },
    {
      id: 2,
      username: "alice_smith",
      fullname: "Alice Smith",
      messagesSent: 89,
      messagesReceived: 92,
      activeStatus: "active",
      lastActive: "1 hour ago",
      isFlagged: true,
      flagReason: "Spam messages"
    },
    {
      id: 3,
      username: "sarah_parker",
      fullname: "Sarah Parker",
      messagesSent: 234,
      messagesReceived: 198,
      activeStatus: "very active",
      lastActive: "5 mins ago",
      isFlagged: false
    },
    {
      id: 4,
      username: "mark_wilson",
      fullname: "Mark Wilson",
      messagesSent: 45,
      messagesReceived: 67,
      activeStatus: "inactive",
      lastActive: "2 days ago",
      isFlagged: false
    },
    {
      id: 5,
      username: "emily_brown",
      fullname: "Emily Brown",
      messagesSent: 178,
      messagesReceived: 156,
      activeStatus: "active",
      lastActive: "30 mins ago",
      isFlagged: true,
      flagReason: "Inappropriate content"
    }
  ];

  // Stats data
  const stats = [
    {
      title: "Total DMs",
      value: "2,945",
      icon: MessageSquare,
      color: "bg-green-500"
    },
    {
      title: "Active Users",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Flagged Conversations",
      value: "23",
      icon: AlertTriangle,
      color: "bg-red-500"
    }
  ];

  // State management
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter tabs
  const filterTabs = [
    { key: 'all' as FilterType, label: 'All Users' },
    { key: 'active' as FilterType, label: 'Active Users' },
    { key: 'flagged' as FilterType, label: 'Flagged' },
    { key: 'inactive' as FilterType, label: 'Inactive' }
  ];

  // Filter and search logic
  const filteredInsights = useMemo(() => {
    let filtered = sampleInsights;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(insight => {
        switch (activeFilter) {
          case 'active':
            return insight.activeStatus === 'very active' || insight.activeStatus === 'active';
          case 'flagged':
            return insight.isFlagged;
          case 'inactive':
            return insight.activeStatus === 'inactive';
          default:
            return true;
        }
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(insight =>
        insight.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredInsights.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentInsights = filteredInsights.slice(startIndex, endIndex);

  // Reset page when filter or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm, entriesPerPage]);

  // Action handlers
  const handleViewMessages = (userId: number) => {
    console.log(`View messages for user ${userId}`);
  };

  const handleBlockUser = (userId: number) => {
    console.log(`Block user ${userId}`);
  };

  const handleFlagConversation = (userId: number) => {
    console.log(`Flag conversation for user ${userId}`);
  };

  return (
    <div className="my-10 px-2 md:px-0 max-w-[320px] mx-auto md:mx-0 md:max-w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

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

      {/* Table Section */}
      <div className='shadow-md bg-white rounded-xl'>
        {/* Table controls */}
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

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-full px-4 py-2 text-sm w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search users..."
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Username</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Messages Sent</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Messages Received</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentInsights.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No data available in table
                  </td>
                </tr>
              ) : (
                currentInsights.map((insight) => (
                  <tr key={insight.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-500 underline cursor-pointer">
                        {insight.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{insight.fullname}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{insight.messagesSent}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{insight.messagesReceived}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        insight.activeStatus === 'very active' 
                          ? 'bg-green-100 text-green-800'
                          : insight.activeStatus === 'active'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {insight.activeStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {insight.lastActive}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewMessages(insight.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center space-x-2"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Messages</span>
                        </button>
                        <button
                          onClick={() => handleFlagConversation(insight.id)}
                          className={`${
                            insight.isFlagged 
                              ? 'bg-yellow-500 hover:bg-yellow-600'
                              : 'bg-gray-500 hover:bg-gray-600'
                          } text-white px-3 py-2 rounded-full text-sm font-semibold transition-colors`}
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleBlockUser(insight.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold transition-colors"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-700">
              Showing {currentInsights.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, currentInsights.length)} of {currentInsights.length} entries
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                Previous
              </button>
              
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
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  currentPage === totalPages || totalPages === 0
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

export default MessagesManagement;
