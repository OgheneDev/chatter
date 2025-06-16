"use client"

import React, { useState, useMemo } from 'react';
import { Eye, Trash2, Music, Type, ChevronLeft, ChevronRight, X, Upload } from 'lucide-react';

interface MusicItem {
  id: number;
  title: string;
  category: string;
  duration: string;
  artist: string;
  createdAt: string;
}

interface Category {
  id: number;
  title: string;
  musicCount: number;
  createdAt: string;
}

type TabType = 'music' | 'categories';

const MusicManagement: React.FC = () => {
  // Sample data
  const sampleMusic: MusicItem[] = [
    {
      id: 1,
      title: "Summer Vibes",
      category: "Pop",
      duration: "3:45",
      artist: "John Smith",
      createdAt: "26-04-2025"
    },
    {
      id: 2,
      title: "Midnight Jazz",
      category: "Jazz",
      duration: "4:20",
      artist: "Sarah Johnson",
      createdAt: "25-04-2025"
    },
    {
      id: 3,
      title: "Rock Anthem",
      category: "Rock",
      duration: "3:12",
      artist: "Mike Wilson",
      createdAt: "24-04-2025"
    }
  ];

  const sampleCategories: Category[] = [
    {
      id: 1,
      title: "Pop",
      musicCount: 15,
      createdAt: "20-04-2025"
    },
    {
      id: 2,
      title: "Jazz",
      musicCount: 8,
      createdAt: "18-04-2025"
    },
    {
      id: 3,
      title: "Rock",
      musicCount: 12,
      createdAt: "15-04-2025"
    }
  ];

  // State management
  const [activeTab, setActiveTab] = useState<TabType>('music');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    duration: '',
    artist: '',
    imageFile: null as File | null,
    musicFile: null as File | null
  });

  // Filter and search logic for music
  const filteredMusic = useMemo(() => {
    let filtered = sampleMusic;

    if (searchTerm) {
      filtered = filtered.filter(music =>
        music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        music.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        music.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm]);

  // Filter and search logic for categories
  const filteredCategories = useMemo(() => {
    let filtered = sampleCategories;

    if (searchTerm) {
      filtered = filtered.filter(category =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm]);

  // Get current data based on active tab
  const currentData = activeTab === 'music' ? filteredMusic : filteredCategories;
  
  // Pagination logic
  const totalPages = Math.ceil(currentData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentItems = currentData.slice(startIndex, endIndex);

  // Reset page when tab, search, or entries per page changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, entriesPerPage]);

  // Modal handlers
  const openModal = () => {
    setShowModal(true);
    setFormData({
      title: '',
      category: '',
      duration: '',
      artist: '',
      imageFile: null,
      musicFile: null
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'image' | 'music') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [fileType === 'image' ? 'imageFile' : 'musicFile']: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    closeModal();
  };

  // Action handlers
  const handleView = (id: number) => {
    console.log(`View ${activeTab} ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete ${activeTab} ${id}`);
  };

  // Tab options
  const tabs = [
    { key: 'music' as TabType, label: 'Music' },
    { key: 'categories' as TabType, label: 'Categories' }
  ];

  return (
    <div className="my-10 px-2 md:px-0 max-w-[320px] mx-auto md:mx-0 md:max-w-full">
      {/* Mobile Tab Dropdown */}
      <div className="mb-7 md:hidden">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as TabType)}
          className="w-full px-4 py-2 bg-gray-200 rounded-full text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          {tabs.map((tab) => (
            <option key={tab.key} value={tab.key}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tabs */}
      <div className="mb-7 hidden md:block">
        <div className="flex flex-wrap gap-2 bg-gray-200 w-fit rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer text-gray-900 transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-yellow-500 text-white'
                  : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className='shadow-md bg-gray-800 rounded-xl'>
        {/* Header with Add Button */}
        <div className="p-4 md:p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white capitalize">{activeTab}</h2>
            <button
              onClick={openModal}
              className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors"
            >
              Add {activeTab === 'music' ? 'Music' : 'Category'}
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-600 bg-gray-700 text-white rounded-full px-7 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-300">entries</span>
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <span className="text-sm text-gray-300 whitespace-nowrap">Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-600 bg-gray-700 text-white rounded-full px-4 py-2 text-sm w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder={`Search ${activeTab}...`}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-700">
              <tr>
                {activeTab === 'music' ? (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 tracking-wider">
                      Music
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 tracking-wider">
                      Artist
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 tracking-wider">
                      Action
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 tracking-wider">
                      Music Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 tracking-wider">
                      Action
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={activeTab === 'music' ? 6 : 3} className="px-6 py-8 text-center text-gray-300">
                    No data available in table
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-700">
                    {activeTab === 'music' ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center w-14 h-12 rounded-lg bg-yellow-500 text-white">
                            <Music className="w-5 h-5" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {(item as MusicItem).title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {(item as MusicItem).category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {(item as MusicItem).duration}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {(item as MusicItem).artist}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(item.id)}
                              className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors flex items-center space-x-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center justify-center"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {(item as Category).title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {(item as Category).musicCount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(item.id)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors flex items-center space-x-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center justify-center"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              Showing {currentItems.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, currentData.length)} of {currentData.length} entries
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                Previous
              </button>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  currentPage === totalPages || totalPages === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 ${showModal ? 'flex' : 'hidden'} items-center justify-center z-50 p-4`}>
        <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-300">
                Add {activeTab === 'music' ? 'Music' : 'Category'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="space-y-4">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>

              {/* Music-specific fields */}
              {activeTab === 'music' && (
                <>
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Image
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'image')}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                      >
                        Choose File
                      </label>
                      <span className="text-sm text-gray-500">
                        {formData.imageFile ? formData.imageFile.name : 'No file chosen'}
                      </span>
                    </div>
                  </div>

                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    >
                      <option value="">Select One</option>
                      <option value="Pop">Pop</option>
                      <option value="Jazz">Jazz</option>
                      <option value="Rock">Rock</option>
                      <option value="Classical">Classical</option>
                      <option value="Hip Hop">Hip Hop</option>
                    </select>
                  </div>

                  {/* Music Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Music
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => handleFileChange(e, 'music')}
                        className="hidden"
                        id="music-upload"
                      />
                      <label
                        htmlFor="music-upload"
                        className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                      >
                        Choose File
                      </label>
                      <span className="text-sm text-gray-500">
                        {formData.musicFile ? formData.musicFile.name : 'No file chosen'}
                      </span>
                    </div>
                  </div>

                  {/* Duration and Artist */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="3:45"
                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Artist
                      </label>
                      <input
                        type="text"
                        name="artist"
                        value={formData.artist}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                >
                  Add {activeTab === 'music' ? 'Music' : 'Category'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicManagement;