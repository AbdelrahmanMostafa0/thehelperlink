import { Bubble } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // استيراد المكتبة
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels);

const BubbleCart = ({ chartData }) => {
    const options = {
        plugins: {
          datalabels: {
            display: true,
            formatter: (value) => value.name || '', 
            color: 'black',
            font: {
              size: 14,
            },
          },
        },
      };
  
  return <Bubble data={chartData} options={options} />;
};

export default BubbleCart;
