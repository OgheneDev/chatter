'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  Image,
  Play,
  Music,
  MessagesSquare,
  Gamepad2,
  Heart,
  Shield,
  FileBarChart,
  HelpCircle,
  BarChart2,
} from 'lucide-react';

type MenuItem = {
  icon: React.ElementType;
  name: string;
  path: string;
};

const menuItems: MenuItem[] = [
  { icon: Home, name: 'Dashboard', path: '/' },
  { icon: Users, name: 'Users', path: '/users' },
  { icon: Image, name: 'Posts', path: '/posts' },
  { icon: Music, name: 'Music', path: '/music' },
  { icon: MessagesSquare, name: 'Messages', path: '/messages' },
  { icon: BarChart2, name: 'Insights', path: '/insights' },
  { icon: FileBarChart, name: 'Reports', path: '/reports' },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const sidebarClass = pathname === '/login' ? 'md:hidden' : '';

  return (
    <div className={`sidebar bg-gray-800 p-0 w-[250px] h-full hidden md:block fixed top-0 left-0 border-r border-gray-900 ${sidebarClass}`}>
      {/* Header */}
      <div className="p-4.5 border-b bg-gray-800 border-gray-900">
        <h1 className="text-3xl text-center font-bold text-white">Cube.</h1>
      </div>

      {/* Menu Items */}
      <div className="py-4">
        <ul className="flex flex-col">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`menu-item py-3 px-6 w-[90%] mx-auto rounded-full flex items-center gap-3 text-sm transition-colors duration-200
                     ${isActive 
                       ? 'bg-yellow-500  font-medium' 
                       : 'text-white'
                     }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;