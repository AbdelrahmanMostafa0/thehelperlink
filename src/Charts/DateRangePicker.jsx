import { Datepicker } from 'flowbite-react';
import React, { useState } from 'react';
// import { Datepicker } from 'flowbite-datepicker'; // تأكد من أن Flowbite مثبتة ومستخدمة

const DateRangePicker = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = () => {
    if (startDate && endDate) {
      onDateChange({ start: startDate, end: endDate });
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <h3 className="text-lg font-bold mb-2">Select Date Range</h3>
      <div className="flex space-x-4">
        <Datepicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            handleDateChange();
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholder="Start Date"
          className="border rounded px-2 py-1"
        />
        <Datepicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            handleDateChange();
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholder="End Date"
          className="border rounded px-2 py-1"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
