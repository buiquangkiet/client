import React from 'react'
import { Link } from 'react-router-dom'
import { ShopIcon, UserIcon } from 'ultils/icons'
import path from 'ultils/paths'

const PrivateSidebar = () => {
  const sidebarItem = [{
    title: 'My Profile',
    icon: <UserIcon />,
    path: path.PERSONAL,
  },
  {
    title: 'My Purchases',
    icon: <ShopIcon />,
    path: path.MY_PURCHASES,
  },

  ]
  return (
    <div className="w-[240px] flex flex-col border min-h-screen items-center ">
      {sidebarItem.map(item =>
        <Link to={item.path} className="flex items-center justify-start p-3 hover:bg-gray-100 w-full gap-3 duration-200">
          <span>{item.icon}</span>
          <span>{item.title}</span>
        </Link>)}
    </div>
  )
}

export default PrivateSidebar
