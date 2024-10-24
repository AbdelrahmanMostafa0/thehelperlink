import React, { useState } from 'react';
import LineChart from '../../src/Charts/LineCart';
import Overview from '../../src/Charts/Overview';
import DoughnutCart from '../../src/Charts/BubbleCart';
import DateRangePicker from '../../src/Charts/DateRangePicker';
import 'flowbite/dist/flowbite.css';
import DashboardSidebar from '../../src/components/side-bar/DashboardSidebar';

const ControlSystem = () => {
  const [change, setChange] = useState(false);
  const handleDateChange = (dates) => {
    setChange(!change);
  };
  return (
    <div className="flex ">
      <div
        className="md:space-y-20 space-y-5 mt-10 w-10/12 "
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <DateRangePicker onDateChange={handleDateChange} />

        <Overview change={change} />
        <hr />
        <DoughnutCart change={change} />
        <hr />
        <LineChart change={change} />
      </div>
      <div className="w-2/12">
        <DashboardSidebar />
      </div>
    </div>
  );
};
export default ControlSystem;
