"use client"

import React from 'react';
import { 
  Users, 
  FileText, 
  Video, 
  Music, 
  MessageSquare, 
  Bell, 
  Heart, 
  CheckCircle,
  Bookmark,
  Clock
} from 'lucide-react';

import { StatCard } from './StatCard';



const StatsGrid: React.FC = () => {
  const statsData = [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      count: 11,
      label: "Users",
      iconColor: "bg-gradient-to-br from-red-300 to-red-400",
      link: "/users"
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      count: 219,
      label: "Posts",
      iconColor: "bg-gradient-to-br from-green-400 to-emerald-500",
      link: "/posts"
    },
    {
      icon: <Video className="w-6 h-6 text-white" />,
      count: 15,
      label: "Reels",
      iconColor: "bg-gradient-to-br from-blue-300 to-blue-400",
      link: "/reels"
    },
    {
      icon: <Music className="w-6 h-6 text-white" />,
      count: 0,
      label: "Music",
      iconColor: "bg-gradient-to-br from-orange-300 to-orange-400",
      link: "/music"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      count: 3,
      label: "Rooms",
      iconColor: "bg-gradient-to-br from-purple-300 to-purple-400",
      link: "/rooms"
    },
    {
      icon: <Bell className="w-6 h-6 text-white" />,
      count: 0,
      label: "Notifications",
      iconColor: "bg-gradient-to-br from-teal-400 to-cyan-500",
      link: "/notifications"
    },
    {
      icon: <Heart className="w-6 h-6 text-white" />,
      count: 11,
      label: "Interests",
      iconColor: "bg-gradient-to-br from-blue-300 to-blue-400",
      link: "/interests"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      count: 0,
      label: "Verification Requests",
      iconColor: "bg-gradient-to-br from-red-300 to-pink-400",
      link: "/verification-requests"
    },
    {
      icon: <Bookmark className="w-6 h-6 text-white" />,
      count: 0,
      label: "Bookmarks",
      iconColor: "bg-gradient-to-br from-teal-400 to-cyan-500",
      link: "/bookmarks"
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      count: 0,
      label: "Pending",
      iconColor: "bg-gradient-to-br from-blue-300 to-indigo-400",
      link: "/pending"
    }
  ];

  return (
    <div className=" min-h-screen">
      <div className="max-w-7xl mx-auto">
    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-[14px]  border border-gray-200 ">
              <StatCard
                icon={stat.icon}
                count={stat.count}
                label={stat.label}
                iconColor={stat.iconColor}
                link={stat.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;