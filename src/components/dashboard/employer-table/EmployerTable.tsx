import Datepicker from '@src/components/Datepicker';
import { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
const dummyData = [
  {
    id: 1,
    Name: 'محمد علي',
    Email: 'mohammed.ali@example.com',
    JobsApplyd: 5,
    Experiance: 3,
  },
  {
    id: 2,
    Name: 'إيمان عبد الله',
    Email: 'eman.abdullah@example.com',
    JobsApplyd: 7,
    Experiance: 5,
  },
  {
    id: 3,
    Name: 'كريم حسن',
    Email: 'kareem.hassan@example.com',
    JobsApplyd: 10,
    Experiance: 8,
  },
  {
    id: 4,
    Name: 'سارة إبراهيم',
    Email: 'sara.ibrahim@example.com',
    JobsApplyd: 4,
    Experiance: 2,
  },
  {
    id: 5,
    Name: 'ياسر محمد',
    Email: 'yasser.mohammed@example.com',
    JobsApplyd: 6,
    Experiance: 4,
  },
  {
    id: 6,
    Name: 'فاطمة زينب',
    Email: 'fatma.zainab@example.com',
    JobsApplyd: 3,
    Experiance: 1,
  },
  {
    id: 7,
    Name: 'علي عادل',
    Email: 'ali.adel@example.com',
    JobsApplyd: 8,
    Experiance: 10,
  },
  {
    id: 8,
    Name: 'مريم يوسف',
    Email: 'mariam.youssef@example.com',
    JobsApplyd: 2,
    Experiance: 1,
  },
  {
    id: 9,
    Name: 'عمر خالد',
    Email: 'omar.khaled@example.com',
    JobsApplyd: 12,
    Experiance: 9,
  },
  {
    id: 10,
    Name: 'هدى سالم',
    Email: 'hoda.salem@example.com',
    JobsApplyd: 9,
    Experiance: 5,
  },
  {
    id: 11,
    Name: 'نور الدين أحمد',
    Email: 'nour.ahmed@example.com',
    JobsApplyd: 5,
    Experiance: 4,
  },
  {
    id: 12,
    Name: 'مايا شريف',
    Email: 'maya.sherif@example.com',
    JobsApplyd: 7,
    Experiance: 3,
  },
  {
    id: 13,
    Name: 'عمر عبد الرحمن',
    Email: 'omar.abdulrahman@example.com',
    JobsApplyd: 4,
    Experiance: 6,
  },
  {
    id: 14,
    Name: 'ليلى نبيل',
    Email: 'layla.nabil@example.com',
    JobsApplyd: 6,
    Experiance: 2,
  },
  {
    id: 15,
    Name: 'يحيى سعيد',
    Email: 'yahya.saeed@example.com',
    JobsApplyd: 3,
    Experiance: 1,
  },
  {
    id: 16,
    Name: 'حنين أسامة',
    Email: 'hanin.osama@example.com',
    JobsApplyd: 9,
    Experiance: 5,
  },
  {
    id: 17,
    Name: 'عماد محمود',
    Email: 'emad.mahmoud@example.com',
    JobsApplyd: 5,
    Experiance: 7,
  },
  {
    id: 18,
    Name: 'خالد ناصر',
    Email: 'khaled.nasser@example.com',
    JobsApplyd: 6,
    Experiance: 4,
  },
  {
    id: 19,
    Name: 'حسن فاروق',
    Email: 'hassan.farouk@example.com',
    JobsApplyd: 2,
    Experiance: 2,
  },
  {
    id: 20,
    Name: 'إيمان سعيد',
    Email: 'eman.saeed@example.com',
    JobsApplyd: 7,
    Experiance: 3,
  },
  {
    id: 21,
    Name: 'محمد يوسف',
    Email: 'mohammed.youssef@example.com',
    JobsApplyd: 3,
    Experiance: 1,
  },
  {
    id: 22,
    Name: 'ياسمين علي',
    Email: 'yasmin.ali@example.com',
    JobsApplyd: 9,
    Experiance: 10,
  },
  {
    id: 23,
    Name: 'ملاك أحمد',
    Email: 'malak.ahmed@example.com',
    JobsApplyd: 5,
    Experiance: 5,
  },
  {
    id: 24,
    Name: 'سامر جابر',
    Email: 'samer.jaber@example.com',
    JobsApplyd: 7,
    Experiance: 8,
  },
  {
    id: 25,
    Name: 'هند عادل',
    Email: 'hend.adel@example.com',
    JobsApplyd: 4,
    Experiance: 2,
  },
  {
    id: 26,
    Name: 'رامي حسن',
    Email: 'rami.hassan@example.com',
    JobsApplyd: 8,
    Experiance: 6,
  },
  {
    id: 27,
    Name: 'لينا إبراهيم',
    Email: 'lina.ibrahim@example.com',
    JobsApplyd: 2,
    Experiance: 1,
  },
  {
    id: 28,
    Name: 'سامي علاء',
    Email: 'samy.alaa@example.com',
    JobsApplyd: 10,
    Experiance: 7,
  },
  {
    id: 29,
    Name: 'سهى خالد',
    Email: 'soha.khaled@example.com',
    JobsApplyd: 4,
    Experiance: 3,
  },
  {
    id: 30,
    Name: 'آدم مراد',
    Email: 'adam.murad@example.com',
    JobsApplyd: 5,
    Experiance: 4,
  },
];

const EmployerTable = () => {
  const [users, setUsers] = useState(dummyData);
  const [search, setSearch] = useState('');
  const filteredData = dummyData.filter((user) => {
    const searchValue = search.toLowerCase().trim();
    if (!searchValue) {
      return users;
    }
    return (
      user.Name.toLowerCase().includes(searchValue) ||
      user.Email.toLowerCase().includes(searchValue)
    );
  });
  return (
    <div
      className="space-y-10 m-10"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        maxWidth: '66.67%',
      }}>
      <div className=" overflow-y-visible">
        <div className="min-w-[800px] mx-4 flex gap-3 items-center">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="max-w-[350px] w-full outline-none border-b-2 py-2 border-none ring-0"
            placeholder="search by name or email"
          />
          <div className="flex items-center">
            <div className="flex gap-2 items-center">
              {/* @ts-ignore */}
              <p>from</p> <Datepicker />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex gap-2 items-center">
              {/* @ts-ignore */}
              <p>to</p> <Datepicker />
            </div>
          </div>
        </div>
      </div>

      <p className="font-heavy mx-4 flex gap-1 items-center">
        Total Employers <FaUsers /> :<span className="font-regular">{dummyData.length}</span>
      </p>
      <div className="drop-shadow-lg rounded-lg bg-white min-h-[80dvh] w-full mx-4 border overflow-auto">
        <div className="grid grid-cols-10 border-b  px-5 min-w-[800px]">
          <div className="col-span-1 text-lg font-heavy border-r-2 py-4 px-2">Id</div>
          <div className="col-span-3 text-lg font-heavy border-r-2 py-4 px-2">Name</div>
          <div className="col-span-3 text-lg font-heavy border-r-2 py-4 px-2">Email</div>
          <div className="col-span-2 text-lg font-heavy border-r-2 py-4 px-2">Jobs posted</div>
          <div className="col-span-1 text-lg font-heavy py-4 px-2">Helpers </div>
        </div>
        {filteredData.map((user) => {
          return <TableRow data={user} />;
        })}
      </div>
    </div>
  );
};

export default EmployerTable;
// @ts-ignore
const TableRow = ({ data }) => {
  return (
    <div className="grid grid-cols-10 border-b  px-5 hover:bg-gray-200 duration-150 cursor-pointer min-w-[800px]">
      <div className="col-span-1 text-lg border-r-2 py-3 px-2">{data.id}</div>
      <div className="col-span-3 text-lg border-r-2 py-3 px-2">{data.Name}</div>
      <div className="col-span-3 text-lg border-r-2 py-3 px-2 line-clamp-1">{data.Email}</div>
      <div className="col-span-2 text-lg border-r-2 py-3 px-2">{data.JobsApplyd}</div>
      <div className="col-span-1 text-lg  py-3 px-2">{data.Experiance}</div>
    </div>
  );
};
