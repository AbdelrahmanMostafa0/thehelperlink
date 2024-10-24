import Datepicker from '@src/components/Datepicker';
import { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { FaFileDownload } from 'react-icons/fa';

const dummyData = [
  {
    id: 1,
    Name: 'John Smith',
    Email: 'john.smith@example.com',
    JobsApplyd: 5,
    Languages: 'En, Ar',
    Experiance: 3,
  },
  {
    id: 2,
    Name: 'Emily Johnson',
    Email: 'emily.johnson@example.com',
    JobsApplyd: 7,
    Languages: 'En',
    Experiance: 5,
  },
  {
    id: 3,
    Name: 'Carlos Mendez',
    Email: 'carlos.mendez@example.com',
    JobsApplyd: 10,
    Languages: 'En, Ar',
    Experiance: 8,
  },
  {
    id: 4,
    Name: 'Isabella Rossi',
    Email: 'isabella.rossi@example.com',
    JobsApplyd: 4,
    Languages: 'En, Ar',
    Experiance: 2,
  },
  {
    id: 5,
    Name: 'Liam O’Connor',
    Email: 'liam.oconnor@example.com',
    JobsApplyd: 6,
    Languages: 'En',
    Experiance: 4,
  },
  {
    id: 6,
    Name: 'Sophia Williams',
    Email: 'sophia.williams@example.com',
    JobsApplyd: 3,
    Languages: 'En',
    Experiance: 1,
  },
  {
    id: 7,
    Name: 'Michael Brown',
    Email: 'michael.brown@example.com',
    JobsApplyd: 8,
    Languages: 'Ar, En',
    Experiance: 10,
  },
  {
    id: 8,
    Name: 'Olivia Davis',
    Email: 'olivia.davis@example.com',
    JobsApplyd: 2,
    Languages: 'En',
    Experiance: 1,
  },
  {
    id: 9,
    Name: 'Lucas Wilson',
    Email: 'lucas.wilson@example.com',
    JobsApplyd: 12,
    Languages: 'En',
    Experiance: 9,
  },
  {
    id: 10,
    Name: 'Ava Martinez',
    Email: 'ava.martinez@example.com',
    JobsApplyd: 9,
    Languages: 'En',
    Experiance: 5,
  },
  {
    id: 11,
    Name: 'Noah Anderson',
    Email: 'noah.anderson@example.com',
    JobsApplyd: 5,
    Languages: 'En, Ar',
    Experiance: 4,
  },
  {
    id: 12,
    Name: 'Mia Taylor',
    Email: 'mia.taylor@example.com',
    JobsApplyd: 7,
    Languages: 'En',
    Experiance: 3,
  },
  {
    id: 13,
    Name: 'Benjamin Thomas',
    Email: 'benjamin.thomas@example.com',
    JobsApplyd: 4,
    Languages: 'Ar',
    Experiance: 6,
  },
  {
    id: 14,
    Name: 'Charlotte Jackson',
    Email: 'charlotte.jackson@example.com',
    JobsApplyd: 6,
    Languages: 'En',
    Experiance: 2,
  },
  {
    id: 15,
    Name: 'Elijah White',
    Email: 'elijah.white@example.com',
    JobsApplyd: 3,
    Languages: 'Ar, En',
    Experiance: 1,
  },
  {
    id: 16,
    Name: 'Amelia Harris',
    Email: 'amelia.harris@example.com',
    JobsApplyd: 9,
    Languages: 'En',
    Experiance: 5,
  },
  {
    id: 17,
    Name: 'James Clark',
    Email: 'james.clark@example.com',
    JobsApplyd: 5,
    Languages: 'En, Ar',
    Experiance: 7,
  },
  {
    id: 18,
    Name: 'Harper Lewis',
    Email: 'harper.lewis@example.com',
    JobsApplyd: 6,
    Languages: 'En',
    Experiance: 4,
  },
  {
    id: 19,
    Name: 'Henry Robinson',
    Email: 'henry.robinson@example.com',
    JobsApplyd: 2,
    Languages: 'En',
    Experiance: 2,
  },
  {
    id: 20,
    Name: 'Evelyn Walker',
    Email: 'evelyn.walker@example.com',
    JobsApplyd: 7,
    Languages: 'Ar, En',
    Experiance: 3,
  },
  {
    id: 21,
    Name: 'Alexander Young',
    Email: 'alexander.young@example.com',
    JobsApplyd: 3,
    Languages: 'En',
    Experiance: 1,
  },
  {
    id: 22,
    Name: 'Mason King',
    Email: 'mason.king@example.com',
    JobsApplyd: 9,
    Languages: 'Ar',
    Experiance: 10,
  },
  {
    id: 23,
    Name: 'Ella Scott',
    Email: 'ella.scott@example.com',
    JobsApplyd: 5,
    Languages: 'En',
    Experiance: 5,
  },
  {
    id: 24,
    Name: 'Daniel Green',
    Email: 'daniel.green@example.com',
    JobsApplyd: 7,
    Languages: 'En, Ar',
    Experiance: 8,
  },
  {
    id: 25,
    Name: 'Scarlett Adams',
    Email: 'scarlett.adams@example.com',
    JobsApplyd: 4,
    Languages: 'En',
    Experiance: 2,
  },
  {
    id: 26,
    Name: 'Sebastian Baker',
    Email: 'sebastian.baker@example.com',
    JobsApplyd: 8,
    Languages: 'En',
    Experiance: 6,
  },
  {
    id: 27,
    Name: 'Grace Perez',
    Email: 'grace.perez@example.com',
    JobsApplyd: 2,
    Languages: 'En',
    Experiance: 1,
  },
  {
    id: 28,
    Name: 'Jack Murphy',
    Email: 'jack.murphy@example.com',
    JobsApplyd: 10,
    Languages: 'En, Ar',
    Experiance: 7,
  },
  {
    id: 29,
    Name: 'Zoe Carter',
    Email: 'zoe.carter@example.com',
    JobsApplyd: 4,
    Languages: 'En',
    Experiance: 3,
  },
  {
    id: 30,
    Name: 'William Mitchell',
    Email: 'william.mitchell@example.com',
    JobsApplyd: 5,
    Languages: 'En, Ar',
    Experiance: 4,
  },
];

const UserTables = () => {
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
        Total Users <FaUsers /> :<span className="font-regular">{dummyData.length}</span>
      </p>
      <div className="drop-shadow-lg rounded-lg bg-white min-h-[80dvh] w-full mx-4 border overflow-auto">
        <div className="grid grid-cols-12 border-b  px-5 min-w-[800px]">
          <div className="col-span-1 text-lg font-heavy border-r-2 py-5 px-2">Id</div>
          <div className="col-span-3 text-lg font-heavy border-r-2 py-5 px-2">Name</div>
          <div className="col-span-3 text-lg font-heavy border-r-2 py-5 px-2">Email</div>
          <div className="col-span-2 text-lg font-heavy border-r-2 py-5 px-2">Jobs Applyd</div>
          <div className="col-span-1 text-lg font-heavy border-r-2 py-5 px-2">Lang</div>
          <div className="col-span-1 text-lg font-heavy py-5 px-2 border-r-2">Exp</div>
          <div className="col-span-1 text-lg font-heavy py-5 px-2 text-center">CV</div>
        </div>
        {filteredData.map((user) => {
          return <TableRow data={user} />;
        })}
      </div>
    </div>
  );
};

export default UserTables;
// @ts-ignore
const TableRow = ({ data }) => {
  return (
    <div className="grid grid-cols-12 border-b  px-5 hover:bg-gray-200 duration-150 cursor-pointer min-w-[800px]">
      <div className="col-span-1 text-lg border-r-2 py-3 px-2">{data.id}</div>
      <div className="col-span-3 text-lg border-r-2 py-3 px-2">{data.Name}</div>
      <div className="col-span-3 text-lg border-r-2 py-3 px-2 line-clamp-1">{data.Email}</div>
      <div className="col-span-2 text-lg border-r-2 py-3 px-2">{data.JobsApplyd}</div>
      <div className="col-span-1 text-lg border-r-2 py-3 px-2">{data.Languages}</div>
      <div className="col-span-1 text-lg  py-3 px-2 border-r-2">{data.Experiance}</div>
      <div className="col-span-1 text-lg  py-3 px-2 flex items-center justify-center">
        <a href="/cv.pdf" download={`${data.Name}.pdf`}>
          <FaFileDownload />
        </a>
      </div>
    </div>
  );
};
