// react
import { ReactNode } from 'react';
import { shallow } from 'zustand/shallow';
// next js
// import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// components
import Typography from '@src/components/Typography';
import userTypeStore from '@src/zustand_stores/userTypeStore';
import { useUserStore } from '@src/zustand_stores/user';
import Link from 'next/link';
import { getLangBoolean } from '@src/utils/getLangBoolean';

interface IProps {
  children?: ReactNode;
}

const UserTypeTab: React.FC<IProps> = () => {
  // const router = useRouter();
  const { t } = useTranslation('common');
  const lang = getLangBoolean();

  const { userType, setUserType } = userTypeStore();
  const user = useUserStore((state) => state.userState, shallow);
  // console.log(user);
  if (user) return <></>;
  return (
    <>
      <Link
        href={'auth/register'}
        className="max-w-[350px] w-full border py-2 px-4 rounded-full bg-white mx-auto text-darkGreen-500 font-black hover:bg-darkGreen-500 hover:text-white duration-100">
        {lang ? 'سجل كعامل' : 'Register up as a Helper'}
      </Link>
    </>
  );
};

export default UserTypeTab;
