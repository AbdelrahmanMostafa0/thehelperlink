import React from 'react';
import LineChart from '../../src/Charts/LineCart';
import Overview from '../../src/Charts/Overview';
import DoughnutCart from '../../src/Charts/BubbleCart';

const ControlSystem = () => {
  return (
    <div className="">
      <div
        className="space-y-20 mt-10"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '100%',
          maxWidth: '66.67%',
        }}>
        <Overview />
        <DoughnutCart />
        <LineChart />
      </div>
    </div>
  );
};
export default ControlSystem;
// const bubbleData = {
//   datasets: [
//     {
//       label: 'Countries graph workers',
//       // data: [
//       //   { x: 95, y:80, r: 30, name: 'Philippines ' },    // الفلبين
//       //   { x: 40, y:90, r: 0, name: '' },    // الفلبين
//       //   { x: 58, y:55, r: 30, name: 'India' },          // الهند
//       //   { x: 49, y:45, r: 30, name: 'Sri Lanka' },      // سريلانكا
//       //   { x: 78, y:24, r: 30, name: 'Bangladesh' },     // بنغلاديش
//       //   // { x: 100, y:100, r: 30, name: 'Indonesia' },      // إندونيسيا
//       //   { x: 85, y:57, r: 30, name: 'Pakistan' },       // باكستان
//       //   { x: 56, y:35, r: 30, name: 'Nepal' },          // نيبال
//       //   // { x: 7, y:100, r: 30, name: 'Thailand' },       // تايلاند
//       // ],
//       // backgroundColor: [
//       //   'rgba(255, 99, 132, 0.5)',  // لون أحمر
//       //   'rgba(54, 162, 235, 0.5)',  // لون أزرق
//       //   'rgba(255, 206, 86, 0.5)',  // لون أصفر
//       //   'rgba(75, 192, 192, 0.5)',  // لون أخضر
//       //   'rgba(153, 102, 255, 0.5)', // لون بنفسجي
//       //   // 'rgba(255, 159, 64, 0.5)',  // لون برتقالي
//       //   'rgba(100, 255, 218, 0.5)', // لون تركوازي
//       //   'rgba(255, 99, 132, 0.5)',  // لون أحمر ثاني
//       //   'rgba(54, 162, 235, 0.5)',  // لون أزرق ثاني
//       // ],
//       },
//   ],
// };
