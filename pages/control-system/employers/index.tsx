import EmployerTable from '@src/components/dashboard/employer-table/EmployerTable';
import React from 'react';
import DashboardSidebar from '../../../src/components/side-bar/DashboardSidebar.jsx';

const index = () => {
  return (
    <div className="flex justify-between">
      <div className="w-2/12">
        <DashboardSidebar />
      </div>
      <EmployerTable />
    </div>
  );
};

export default index;
