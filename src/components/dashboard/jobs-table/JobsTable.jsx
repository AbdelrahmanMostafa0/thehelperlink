import Datepicker from '@src/components/Datepicker';
import { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
const dummyData = [
  {
    id: 1,
    Type: 'Babysitter',
    Location: 'Riyadh',
    exp: 3,
    Gender: 'Female',
    Age: 28,
  },
  {
    id: 2,
    Type: 'Driver',
    Location: 'Jeddah',
    exp: 5,
    Gender: 'Male',
    Age: 35,
  },
  {
    id: 3,
    Type: 'Housekeeping',
    Location: 'Dammam',
    exp: 2,
    Gender: 'Female',
    Age: 30,
  },
  {
    id: 4,
    Type: 'Helper',
    Location: 'Mecca',
    exp: 4,
    Gender: 'Male',
    Age: 32,
  },
  {
    id: 5,
    Type: 'Babysitter',
    Location: 'Medina',
    exp: 6,
    Gender: 'Female',
    Age: 40,
  },
  {
    id: 6,
    Type: 'Driver',
    Location: 'Khobar',
    exp: 7,
    Gender: 'Male',
    Age: 38,
  },
  {
    id: 7,
    Type: 'Housekeeping',
    Location: 'Tabuk',
    exp: 1,
    Gender: 'Female',
    Age: 25,
  },
  {
    id: 8,
    Type: 'Helper',
    Location: 'Abha',
    exp: 3,
    Gender: 'Male',
    Age: 29,
  },
  {
    id: 9,
    Type: 'Babysitter',
    Location: 'Taif',
    exp: 5,
    Gender: 'Female',
    Age: 33,
  },
  {
    id: 10,
    Type: 'Driver',
    Location: 'Jizan',
    exp: 4,
    Gender: 'Male',
    Age: 36,
  },
  {
    id: 11,
    Type: 'Housekeeping',
    Location: 'Najran',
    exp: 2,
    Gender: 'Female',
    Age: 27,
  },
  {
    id: 12,
    Type: 'Helper',
    Location: 'Al Qassim',
    exp: 6,
    Gender: 'Male',
    Age: 39,
  },
  {
    id: 13,
    Type: 'Babysitter',
    Location: 'Hail',
    exp: 3,
    Gender: 'Female',
    Age: 29,
  },
  {
    id: 14,
    Type: 'Driver',
    Location: 'Al Ahsa',
    exp: 8,
    Gender: 'Male',
    Age: 42,
  },
  {
    id: 15,
    Type: 'Housekeeping',
    Location: 'Yanbu',
    exp: 5,
    Gender: 'Female',
    Age: 35,
  },
  {
    id: 16,
    Type: 'Helper',
    Location: 'Riyadh',
    exp: 4,
    Gender: 'Male',
    Age: 31,
  },
  {
    id: 17,
    Type: 'Babysitter',
    Location: 'Jeddah',
    exp: 6,
    Gender: 'Female',
    Age: 37,
  },
  {
    id: 18,
    Type: 'Driver',
    Location: 'Dammam',
    exp: 7,
    Gender: 'Male',
    Age: 40,
  },
  {
    id: 19,
    Type: 'Housekeeping',
    Location: 'Mecca',
    exp: 3,
    Gender: 'Female',
    Age: 32,
  },
  {
    id: 20,
    Type: 'Helper',
    Location: 'Medina',
    exp: 2,
    Gender: 'Male',
    Age: 28,
  },
];

const JobsTable = () => {
  const [users, setUsers] = useState(dummyData);
  const [search, setSearch] = useState('');
  const filteredData = dummyData.filter((user) => {
    const searchValue = search.toLowerCase().trim();
    if (!searchValue) {
      return users;
    }
    return (
      user.Type.toLowerCase().includes(searchValue) ||
      user.Gender.toLowerCase().includes(searchValue) ||
      user.Location.toLowerCase().includes(searchValue)
    );
  });
  return (
    <div className="space-y-10 m-10">
      <div className=" overflow-y-visible">
        <div className="min-w-[800px] mx-4 flex gap-3 items-center">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="max-w-[350px] w-full outline-none border-b-2 py-2 border-none ring-0"
            placeholder="search by type or gender or location"
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
        <div className="grid grid-cols-8 border-b   min-w-[800px]">
          <div className="col-span-1 text-lg font-heavy border-x-2 py-4 px-2 text-center">Id</div>
          <div className="col-span-2 text-lg font-heavy border-x-2 py-4 px-2 text-center">Type</div>
          <div className="col-span-2 text-lg font-heavy border-x-2 py-4 px-2 text-center">
            gender
          </div>
          <div className="col-span-1 text-lg font-heavy py-4 px-2 text-center">Exp </div>
          <div className="col-span-1 text-lg font-heavy border-x-2 py-4 px-2 text-center">
            location
          </div>
          <div className="col-span-1 text-lg font-heavy py-4 px-2 text-center">Age </div>
        </div>
        {filteredData.map((user) => {
          return <TableRow data={user} />;
        })}
      </div>
    </div>
  );
};

export default JobsTable;
// @ts-ignore
const TableRow = ({ data }) => {
  console.log(data);

  return (
    <div className="grid grid-cols-8 border-b   hover:bg-gray-200 duration-150 cursor-pointer min-w-[800px]">
      <div className="col-span-1 text-lg border-x-2 py-3 px-2 text-center">{data.id}</div>
      <div className="col-span-2 text-lg border-x-2 py-3 px-2 text-center">{data.Type}</div>
      <div className="col-span-2 text-lg border-x-2 py-3 px-2 text-center">{data.Gender}</div>
      <div className="col-span-1 text-lg py-3 px-2 line-clamp-1 text-center">{data.exp}</div>
      <div className="col-span-1 text-lg  border-x-2 py-3 px-2 text-center">{data.Location}</div>
      <div className="col-span-1 text-lg  py-3 px-2 text-center">{data.Age}</div>
    </div>
  );
};
