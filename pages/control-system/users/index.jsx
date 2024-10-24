import React from 'react';
import UserTables from '../../../src/components/dashboard/user-table/UserTables.tsx';
import DashboardSidebar from '../../../src/components/side-bar/DashboardSidebar.jsx';
const index = () => {
  return (
    <div className="flex justify-between">
      <UserTables />
      <div className="w-2/12">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default index;
