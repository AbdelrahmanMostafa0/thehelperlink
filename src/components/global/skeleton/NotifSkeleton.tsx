// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

interface IProps {
  children?: ReactNode;
}

const NotifSkeleton: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;

  return (
    <div className="min-h-[86px] md:min-w-[395px] min-w-[310px] rounded-10 bg-white shadow-custom-deep-shadow px-5 py-4 flex gap-4">
      <div className="h-[54px] w-[54px] min-h-[54px] min-w-[54px] rounded-full bg-darkBlue-100 object-cover object-center animate-pulse" />
      <div className="flex flex-col gap-3 items-start w-full min-h-[54px] min-w-[54px]">
        <div className="py-1 px-2 rounded-sm bg-darkBlue-100 w-[95px] min-h-[20px] animate-pulse" />
        <div className="py-1 px-2 rounded-sm bg-darkBlue-100 w-2/3 min-h-[15px] animate-pulse" />
      </div>
    </div>
  );
};

export default NotifSkeleton;
