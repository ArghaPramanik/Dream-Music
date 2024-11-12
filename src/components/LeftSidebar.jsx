import React from 'react'
import { Music, Home, TrendingUp, Library, Compass, Settings, LogOut } from 'lucide-react'

export default function LeftSidebar() {
  return (
    <div className="w-64 bg-[#0C0C0C] p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 flex items-center text-[#FF5353]">
        <Music className="mr-2 w-6 h-6" />
        DreamMusic
      </h1>

      <nav className="flex-grow">
        <h2 className="text-xs font-medium text-gray-500 mb-4">MENU</h2>
        <ul className="space-y-4">
          <NavItem icon={Home} text="Home" />
          <NavItem icon={TrendingUp} text="Trends" />
          <NavItem icon={Library} text="Library" />
          <NavItem icon={Compass} text="Discover" />
        </ul>
      </nav>

      <div className="mt-auto">
        <h2 className="text-xs font-medium text-gray-500 mb-4">GENERAL</h2>
        <ul className="space-y-4">
          <NavItem icon={Settings} text="Settings" />
          <NavItem icon={LogOut} text="Log Out" />
        </ul>
      </div>
    </div>
  )
}

function NavItem({ icon: Icon, text }) {
  return (
    <li>
      <a href="#" className="flex items-center text-gray-300 hover:text-white">
        <Icon className="mr-2 w-5 h-5 text-[#FF5353]" />
        {text}
      </a>
    </li>
  )
}