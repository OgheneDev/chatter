'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Home,
  Users,
  Image,
  MessagesSquare,
  BarChart2,
  Music,
  FileBarChart,
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
  { icon: FileBarChart, name: 'Reports', path: '/reports' },
  { icon: MessagesSquare, name: 'Messages', path: '/messages' },
  { icon: BarChart2, name: 'Insights', path: '/insights' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navbarClass = pathname === '/login' ? 'hidden' : '';

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        className={`
          bg-gray-800 shadow-sm fixed top-0 right-0 left-0 md:left-[250px] z-20 ${navbarClass}
        `}
      >
        <div className="max-w-7xl mx-auto px-5 py-2 mb-1  flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={toggleMenu} className="focus:outline-none md:hidden">
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
            <h2 className="font-semibold text-xl text-white">Admin Panel</h2>
          </div>
          <div className="relative">
            <button className="bg-yellow-500 text-white py-4 px-8 font-semibold text-sm rounded-full">
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-10 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-gray-800 z-30 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4.5 border-b bg-gray-800 border-gray-900">
          <h1 className="text-3xl text-center font-bold text-white">Chatter.</h1>
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
                    onClick={toggleMenu}
                    className={`menu-item py-3 px-6 w-[90%] mx-auto rounded-full flex items-center gap-3 text-sm transition-colors duration-200
                      ${isActive
                        ? 'bg-yellow-500 white font-medium'
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
    </>
  );
};

export default Navbar;
