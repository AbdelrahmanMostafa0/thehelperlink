import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { A11y } from 'swiper/modules';

const StatsComponent = ({ change }) => {
  const [statsData, setStatsData] = useState([]);

  // دالة لتوليد أرقام عشوائية
  const generateRandomData = () => {
    return [
      { title: 'Workers', total: Math.floor(Math.random() * 300) }, // رقم عشوائي بين 0 و 300
      { title: 'Agencies', total: Math.floor(Math.random() * 700) }, // رقم عشوائي بين 0 و 700
      { title: 'Jobs Active', total: Math.floor(Math.random() * 500) }, // رقم عشوائي بين 0 و 500
      { title: 'Jobs not Active', total: Math.floor(Math.random() * 200) }, // رقم عشوائي بين 0 و 200
    ];
  };

  useEffect(() => {
    setStatsData(generateRandomData()); // توليد بيانات جديدة عند تغيير القيمة
  }, [change]);

  return (
    <div className="grid grid-cols-4 gap-3">
      {/* <Swiper
        slidesPerView={1}
        spaceBetween={50}
        modules={[A11y]}
        breakpoints={{
          1000: {
            slidesPerView: 3,
          },
          750: {
            slidesPerView: 2.3,
          },
          430: {
            slidesPerView: 1.6,
          },
          380: {
            slidesPerView: 1.3,
          },
          300: {
            slidesPerView: 1,
          },
        }}> */}
      {statsData.map((data, index) => (
        <div className="bg-green-400 flex flex-col items-center justify-center text-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-2xl font-bold text-white mb-1 whitespace-nowrap">{data.title}</h3>
          <span className="font-bold text-2xl text-white"> {data.total}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsComponent;
