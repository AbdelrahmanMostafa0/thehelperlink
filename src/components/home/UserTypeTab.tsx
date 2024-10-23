// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// components
import Typography from '@src/components/Typography';
import userTypeStore from '@src/zustand_stores/userTypeStore';

interface IProps {
  children?: ReactNode;
}

const UserTypeTab: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { userType, setUserType } = userTypeStore();

  return (
    <>
      <div
        className={`h-10 w-1/4  min-w-[192px] rounded-full bg-darkBlue-100 shadow-custom-inset-shadow items-center justify-evenly z-[2] relative self-center flex`}>
        <span
          className={`min-w-[55%] min-h-[100%] absolute ltr:right-0 ltr:left-unset rtl:left-0 rtl:right-unset bg-white rounded-full transition-all duration-200 ease-in ${
            userType === 'helper' ? 'ltr:-translate-x-[82%] rtl:translate-x-[82%]' : 'translate-x-0'
          }`}
        />

        <span
          className="w-1/2 flex items-center justify-center relative cursor-pointer"
          onClick={() => setUserType('helper')}>
          <Typography variant="caption">{t('helper')}</Typography>
        </span>
        <span
          className="w-1/2 flex items-center justify-center relative cursor-pointer"
          onClick={() => setUserType('employer')}>
          <Typography variant="caption">{t('employer')}</Typography>
        </span>
      </div>
    </>
  );
};

export default UserTypeTab;
