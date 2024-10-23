// react
import { ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
  mobilePage: 'helpers' | 'detail';
}

const HelpersListSkeleton: React.FC<IProps> = ({ mobilePage }) => {
  return (
    <div
      // style={{ maxHeight: maxHeightHelpersLists }}
      className={`bg-white flex flex-col self-start w-full min-w-[390px] gap-8 lg:gap-0 lg:w-[403px] lg:shadow-custom-light-shadow rounded-[4px] ${
        mobilePage === 'detail' ? 'hidden lg:flex flex-col' : 'flex flex-row flex-wrap'
      }`}>
      {Array.from(Array(10).keys()).map((_, idx) => (
        <div
          key={idx}
          className={`w-full flex flex-col px-5 animate-pulse py-3 pb-0 gap-2  hover:bg-inherit transition-all ease-in rounded-20 hover:border-b hover:md:rounded-bl-[4px] hover:md:rounded-br-[4px] md:rounded-tl-none md:rounded-tr-none shadow-custom-shadow hover:md:shadow-custom-light-shadow md:shadow-none group`}>
          {/* name and image, like function */}
          <div className="flex items-center justify-between">
            {/* name, image */}
            <div className="flex items-center gap-3">
              <div className="h-[32px] w-[32px] bg-gray-200 rounded-full dark:bg-gray-700"></div>

              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-5/6"></div>

          <hr className="border-darkBlue-100 group-hover:opacity-0 opacity-100 transition-all ease-in hidden md:block" />
        </div>
      ))}
    </div>
  );
};

export default HelpersListSkeleton;
