import React from 'react'
import LineChart from '../../src/Charts/LineCart';
import BubbleCart from '../../src/Charts/BubbleCart';
import Overview from '../../src/Charts/Overview';
  // استيراد المكتبة


 const ControlSystem = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  const bubbleData = {
    datasets: [
      {
        label: 'Dataset 1',
        data: [
          { x: 65, y: 59, r: 30, name: 'Philippines' },    // الفلبين
          { x: 59, y: 80, r: 45, name: 'India' },          // الهند
          { x: 80, y: 81, r: 35, name: 'Sri Lanka' },      // سريلانكا
          { x: 81, y: 56, r: 50, name: 'Bangladesh' },     // بنغلاديش
          { x: 56, y: 55, r: 25, name: 'Indonesia' },      // إندونيسيا
          { x: 70, y: 75, r: 35, name: 'Pakistan' },       // باكستان
          { x: 75, y: 65, r: 50, name: 'Nepal' },          // نيبال
          { x: 66, y: 62, r: 40, name: 'Thailand' },       // تايلاند
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',  // لون أحمر
          'rgba(54, 162, 235, 0.5)',  // لون أزرق
          'rgba(255, 206, 86, 0.5)',  // لون أصفر
          'rgba(75, 192, 192, 0.5)',  // لون أخضر
          'rgba(153, 102, 255, 0.5)', // لون بنفسجي
          'rgba(255, 159, 64, 0.5)',  // لون برتقالي
          'rgba(100, 255, 218, 0.5)', // لون تركوازي
          'rgba(255, 99, 132, 0.5)',  // لون أحمر ثاني
          'rgba(54, 162, 235, 0.5)',  // لون أزرق ثاني
        ],      },
    ],
  };
  return (
    <div className=''>
       over views ControlSystem
       <div className='flex flex-col justify-start md:container  md:w-8/12 w-full '>
       <Overview/>
       <BubbleCart chartData={bubbleData} />
       <LineChart chartData={data} />

       </div>

    </div>
  )
}
export default  ControlSystem