import Link from 'next/link';
import React, { useState } from 'react';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiUsersFour } from 'react-icons/pi';

import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import { MdOutlineWorkOutline, MdPersonAddAlt } from 'react-icons/md';

const DashboardSidebar = () => {
  const [toggleNav, setToggleNav] = useState(true);
  const asideWrapper = toggleNav
    ? ' h-screen  rounded-r-xl  space-y-1 mt-[50px]'
    : ' w-[50px]  h-screen  rounded-r-xl space-y-1 mt-[50px]';

  return (
    <div className={asideWrapper}>
      <div className={` flex ${!toggleNav ? 'justify-center' : '  justify-start'}    w-full`}>
        <button onClick={() => setToggleNav(!toggleNav)} className="text-2xl hidden md:block">
          {toggleNav ? <GoSidebarExpand /> : <GoSidebarCollapse />}
        </button>
      </div>
      <nav className="h-screen  top-10 p-3 flex flex-col items-center space-y-4">
        <Link
          className={` flex items-center justify-start ${
            toggleNav ? 'lg:w-full lg:py-1 lg:space-x-3 ' : 'justify-center '
          } select-none   rounded-lg hover:bg-white hover:text-lightGreen font-bold active:bg-gray-300`}
          href={'/control-system'}>
          <LuLayoutDashboard className="text-[20px]" />
          <span className={toggleNav ? 'lg:block hidden sm-text' : ' hidden sm-text'}>
            Overview
          </span>
        </Link>
        <Link
          className={` flex items-center justify-start ${
            toggleNav ? 'lg:w-full lg:py-1 lg:space-x-3 ' : 'justify-center '
          } select-none   rounded-lg hover:bg-white hover:text-lightGreen font-bold active:bg-gray-300`}
          href={'/control-system/users'}>
          <PiUsersFour className="text-[20px]" />
          <span className={toggleNav ? 'lg:block hidden sm-text' : ' hidden sm-text'}>Users</span>
        </Link>
        <Link
          className={`flex items-center justify-start ${
            toggleNav ? 'lg:w-full lg:py-1 lg:space-x-3 ' : 'justify-center '
          } select-none   rounded-lg hover:bg-white hover:text-lightGreen font-bold active:bg-gray-300`}
          href={'/control-system/jobs'}>
          <MdOutlineWorkOutline className="text-[20px]" />
          <span className={toggleNav ? 'lg:block hidden sm-text' : ' hidden sm-text'}>Jobs</span>
        </Link>
        <Link
          className={` flex items-center justify-start ${
            toggleNav ? 'lg:w-full lg:py-1 lg:space-x-3 ' : 'justify-center '
          } select-none   rounded-lg hover:bg-white hover:text-lightGreen font-bold active:bg-gray-300`}
          href={'/control-system/employers'}>
          <MdPersonAddAlt className="text-[20px]" />
          <span className={toggleNav ? 'lg:block hidden sm-text' : ' hidden sm-text'}>
            employers
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default React.memo(DashboardSidebar);
