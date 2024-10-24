import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registering the ChartJS elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const DoughnutCart = () => {
  const data = {
    labels: ['Philippines', 'India', 'Sri Lanka', 'Bangladesh', 'Indonesia'],
    datasets: [
      {
        label: 'Dataset 1',
        data: ["31", "22", "16", "16", "15"],
        backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'], // Colors
        borderColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'], // Border colors
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable maintaining aspect ratio
    plugins: {
      title: {
        display: false, // إخفاء عنوان الرسم البياني إذا كنت لا تحتاجه
      },
      legend: {
        display: false, // إخفاء أسطورة الرسم البياني
      },
      datalabels: {
        anchor: 'center', // تحديد موضع الأرقام
        align: 'center',
        formatter: (value) => {
          return `${value}%`; // تنسيق تسميات البيانات
        },
      },
    }
  };
  return (
    <div className='flex md:flex-row justify-between flex-col items-center md:gap-0 gap-10 p-1 sm:h-[300px] h-[250px] '>
      <div style={{height:"100%"}}>
      <Doughnut data={data} options={options} />
      </div>
        <ul  className='gap-2 grid grid-cols-2 '>
          <li className='flex items-center gap-2 justify-between'> <span className='bg-[#FF6384] w-[30px] h-[12px]'></span> <span>Philippines</span></li>
          <li className='flex items-center gap-2 justify-between'> <span className='bg-[#FF9F40] w-[30px] h-[12px]'></span> <span>India</span></li>
          <li className='flex items-center gap-2 justify-between'> <span className='bg-[#FFCD56] w-[30px] h-[12px]'></span> <span>Sri</span></li>
          <li className='flex items-center gap-2 justify-between'> <span className='bg-[#4BC0C0] w-[30px] h-[12px]'></span> <span>Bangladesh</span></li>
          <li className='flex items-center gap-2 justify-between'> <span className='bg-[#36A2EB] w-[30px] h-[12px]'></span> <span>Indonesia</span></li>
        </ul>
    </div>
  );
};

export default DoughnutCart;
