import React, {  useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { A11y  } from 'swiper/modules';

const StatsComponent = () => {
  return (
    <div >
      {/* <h2 className="text-xl font-bold mb-4 text-center">Statistics Overview</h2> */}
      <Swiper
        slidesPerView={1}
        spaceBetween={50}
        modules={[  A11y]}

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
        }}
      >
  <SwiperSlide>
    
  <div className="flex flex-col items-center">
          <div className="w-52 h-52 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg">
            <span className="text-2xl font-semibold">{900}</span>
          </div>
          <span className="mt-2 font-semibold">Total Workers</span>
        </div>
   
  </SwiperSlide>

  <SwiperSlide>
    
  <div className="flex flex-col items-center">
          <div className="w-52 h-52 bg-green-500 text-white flex items-center justify-center rounded-full shadow-lg">
            <span className="text-2xl font-semibold">{20}</span>
          </div>
          <span className="mt-2 font-semibold">Total Agencies</span>
        </div>
 
</SwiperSlide>

<SwiperSlide>
    
<div className="flex flex-col items-center">
          <div className="w-52 h-52 bg-yellow-500 text-white flex items-center justify-center rounded-full shadow-lg">
            <span className="text-2xl font-semibold">{252}</span>
          </div>
          <span className="mt-2 font-semibold">Total Jobs Available</span>
        </div>
 
</SwiperSlide>


</Swiper>

    </div>
  );
};

export default StatsComponent;
