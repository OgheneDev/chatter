"use client"

import React, { useState, useMemo } from 'react';
import { Eye, Trash2, AlertTriangle, MessageSquare, User, Video } from 'lucide-react';

interface Report {
  id: number;
  userImage: string;
  roomName?: string;
  postTitle?: string;
  userName?: string;
  reelTitle?: string;
  userIdentity: string;
  reason: string;
  description: string;
  reportType: 'room' | 'post' | 'user' | 'reel';
  createdAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

type FilterType = 'room' | 'post' | 'user' | 'reel';

const ReportsManagement: React.FC = () => {
  // Sample data
  const sampleReports: Report[] = [
    {
      id: 1,
      userImage: "/api/placeholder/60/60",
      roomName: "Gaming Room #1",
      userIdentity: "@gamer123",
      reason: "Inappropriate Content",
      description: "User was sharing inappropriate images in the room chat",
      reportType: "room",
      createdAt: "26-04-2025",
      status: "pending"
    },
    {
      id: 2,
      userImage: "/api/placeholder/60/60",
      postTitle: "My Daily Routine",
      userIdentity: "@lifestyle_blogger",
      reason: "Spam",
      description: "Post contains multiple promotional links without disclosure",
      reportType: "post",
      createdAt: "25-04-2025",
      status: "pending"
    },
    {
      id: 3,
      userImage: "/api/placeholder/60/60",
      userName: "john_doe_official",
      userIdentity: "@john_doe",
      reason: "Harassment",
      description: "User has been sending threatening messages to other users",
      reportType: "user",
      createdAt: "24-04-2025",
      status: "resolved"
    },
    {
      id: 4,
      userImage: "/api/placeholder/60/60",
      reelTitle: "Dance Challenge",
      userIdentity: "@dancer_pro",
      reason: "Copyright Violation",
      description: "Reel uses copyrighted music without permission",
      reportType: "reel",
      createdAt: "23-04-2025",
      status: "pending"
    },
    {
      id: 5,
      userImage: "/api/placeholder/60/60",
      roomName: "Study Group",
      userIdentity: "@student_helper",
      reason: "Off-topic Discussion",
      description: "Room being used for non-educational purposes",
      reportType: "room",
      createdAt: "22-04-2025",
      status: "dismissed"
    },
    {
      id: 6,
      userImage: "/api/placeholder/60/60",
      postTitle: "Product Review",
      userIdentity: "@reviewer_x",
      reason: "False Information",
      description: "Post contains misleading product claims",
      reportType: "post",
      createdAt: "21-04-2025",
      status: "resolved"
    },
    {
      id: 7,
      userImage: "/api/placeholder/60/60",
      userName: "fake_celebrity",
      userIdentity: "@not_real_celeb",
      reason: "Impersonation",
      description: "User is impersonating a verified celebrity",
      reportType: "user",
      createdAt: "20-04-2025",
      status: "pending"
    },
    {
      id: 8,
      userImage: "/api/placeholder/60/60",
      reelTitle: "Cooking Tutorial",
      userIdentity: "@chef_master",
      reason: "Dangerous Content",
      description: "Reel shows unsafe cooking practices",
      reportType: "reel",
      createdAt: "19-04-2025",
      status: "resolved"
    }
  ];

  // State management
  const [activeFilter, setActiveFilter] = useState<FilterType>('room');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter and search logic
  const filteredReports = useMemo(() => {
    let filtered = sampleReports.filter(report => report.reportType === activeFilter);

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.userIdentity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (report.roomName && report.roomName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (report.postTitle && report.postTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (report.userName && report.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (report.reelTitle && report.reelTitle.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [searchTerm, activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentReports = filteredReports.slice(startIndex, endIndex);

  // Reset page when filter or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm, entriesPerPage]);

  // Action handlers
  const handleViewReport = (reportId: number) => {
    console.log(`View report ${reportId}`);
  };

  const handleDeleteReport = (reportId: number) => {
    console.log(`Delete report ${reportId}`);
  };

  const handleResolveReport = (reportId: number) => {
    console.log(`Resolve report ${reportId}`);
  };

  // Filter tabs
  const filterTabs = [
    { key: 'room' as FilterType, label: 'Room Reports' },
    { key: 'post' as FilterType, label: 'Post Reports' },
    { key: 'user' as FilterType, label: 'User Reports' },
    { key: 'reel' as FilterType, label: 'Reel Reports' }
  ];

  // Get content name based on report type
  const getContentName = (report: Report) => {
    switch (report.reportType) {
      case 'room':
        return report.roomName;
      case 'post':
        return report.postTitle;
      case 'user':
        return report.userName;
      case 'reel':
        return report.reelTitle;
      default:
        return '';
    }
  };

  // Get content column header based on active filter
  const getContentColumnHeader = () => {
    switch (activeFilter) {
      case 'room':
        return 'Room Name';
      case 'post':
        return 'Post Title';
      case 'user':
        return 'User Name';
      case 'reel':
        return 'Reel Title';
      default:
        return 'Content';
    }
  };

  
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

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Search reports..."
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  User Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  {getContentColumnHeader()}
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  User Identity
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No data available in table
                  </td>
                </tr>
              ) : (
                currentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-semibold">
                          {report.userIdentity.charAt(1).toUpperCase()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getContentName(report) || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {report.userIdentity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {report.reason}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 max-w-xs truncate">
                        {report.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewReport(report.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleResolveReport(report.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center space-x-2"
                        >
                          <AlertTriangle className="w-4 h-4" />
                          <span>Resolve</span>
                        </button>
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold transition-colors flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with pagination */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-700">
              Showing {filteredReports.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredReports.length)} of {filteredReports.length} entries
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
              
              {/* Page numbers */}
              {totalPages > 0 && Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
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

export default ReportsManagement;