// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

interface IProps {
  children?: ReactNode;
}

const JobPostSkeleton: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <div
      className={`w-full animate-pulse min-w-[340px] md:min-w-[412px] max-w-[412px] flex flex-col gap-4 p-9 bg-white rounded-20 shadow-none hover:shadow-custom-shadow transition-all ease-in duration-300 relative`}>
      {/* post date  */}
      <div className="flex items-center justify-between gap-2">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
      </div>
      {/* company data */}
      <div className="flex items-center gap-3">
        <div className="h-[32px] w-[32px] bg-gray-200 rounded-full dark:bg-gray-700"></div>

        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      </div>
      {/* job title & description */}
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>

      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-72"></div>

      {/* location, Aviability, salary and post type  starts */}
      {/* general info */}
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 bg-gray-200 rounded-10 dark:bg-gray-700"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      </div>
      {/* location */}
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 bg-gray-200 rounded-10 dark:bg-gray-700"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      </div>
      {/* Aviability */}
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 bg-gray-200 rounded-10 dark:bg-gray-700"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      </div>
      {/* salary */}
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 bg-gray-200 rounded-10 dark:bg-gray-700"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      </div>
      {/* location, Aviability, salary and post type  ends */}
      <div className="w-[160px] h-[44px] bg-gray-200 rounded-md dark:bg-gray-700 sm:absolute -bottom-[26px] ltr:right-[22px] ltr:left-unset rtl:left-[22px] rtl:right-unset"></div>
    </div>
  );
};

export default JobPostSkeleton;
