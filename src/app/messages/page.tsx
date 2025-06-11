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
    // Add more sample data as needed
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
          {/* ... Similar controls as in posts/reports pages ... */}
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
              {/* ... Table rows mapping similar to posts/reports pages ... */}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200">
          {/* ... Pagination component similar to posts/reports pages ... */}
        </div>
      </div>
    </div>
  );
};

export default MessagesManagement;
