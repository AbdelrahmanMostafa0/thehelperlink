import React, { useEffect, useState } from 'react';

const DoughnutCart = ({ change }) => {
  const [visitorsData, setVisitorsData] = useState([]);

  // دالة لتوليد بيانات زوار عشوائية
  const generateRandomVisitorsData = () => {
    return [
      {
        country: 'Philippines',
        visitors: Math.floor(Math.random() * 300),
        pageViews: Math.floor(Math.random() * 500),
        bounceRate: Math.floor(Math.random() * 100),
      },
      {
        country: 'India',
        visitors: Math.floor(Math.random() * 300),
        pageViews: Math.floor(Math.random() * 500),
        bounceRate: Math.floor(Math.random() * 100),
      },
      {
        country: 'Sri Lanka',
        visitors: Math.floor(Math.random() * 300),
        pageViews: Math.floor(Math.random() * 500),
        bounceRate: Math.floor(Math.random() * 100),
      },
      {
        country: 'Bangladesh',
        visitors: Math.floor(Math.random() * 300),
        pageViews: Math.floor(Math.random() * 500),
        bounceRate: Math.floor(Math.random() * 100),
      },
      {
        country: 'Indonesia',
        visitors: Math.floor(Math.random() * 300),
        pageViews: Math.floor(Math.random() * 500),
        bounceRate: Math.floor(Math.random() * 100),
      },
    ];
  };

  useEffect(() => {
    setVisitorsData(generateRandomVisitorsData()); // توليد بيانات جديدة عند تغيير القيمة
  }, [change]);

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border border-gray-300 whitespace-nowrap px-4 py-3 text-left text-sm sm:text-base">
                Country
              </th>
              <th className="border border-gray-300 whitespace-nowrap px-4 py-3 text-left text-sm sm:text-base">
                Visitors
              </th>
              <th className="border border-gray-300 whitespace-nowrap px-4 py-3 text-left text-sm sm:text-base">
                Jobs Views
              </th>
              <th className="border border-gray-300 whitespace-nowrap px-4 py-3 text-left text-sm sm:text-base">
                Bounce Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {visitorsData.map((data, index) => (
              <tr key={index} className="text-gray-800 hover:bg-green-100 transition duration-300">
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  {data.country}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  {data.visitors}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  {data.pageViews}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full text-center text-gray-800 md:text-xl text-sm font-bold transition-all duration-500"
                      style={{
                        width: `${data.bounceRate}%`,
                        backgroundColor: '#7bdcbd',
                      }}>
                      {data.bounceRate}%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoughnutCart;
