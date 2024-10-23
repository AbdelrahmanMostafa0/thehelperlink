// react
import React, { ReactNode, useEffect, useRef } from 'react';

// next js
import { useRouter } from 'next/router';

interface IProps {
  children?: ReactNode;
  setMaxHeight: React.Dispatch<React.SetStateAction<string | number>>;
}

const DetailSkeleton: React.FC<IProps> = ({ setMaxHeight }) => {
  const router = useRouter();

  const ContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ContainerRef) {
      setMaxHeight(ContainerRef.current?.clientHeight || 'auto');
    }
  });

  return (
    <div
      ref={ContainerRef}
      className="flex flex-1 self-start w-full flex-col rounded-tl-20 rounded-tr-20 animate-pulse bg-white">
      {/* social media and logo */}
      <div
        className={`w-full flex justify-end gap-8 px-8 py-6 relative bg-gray-300 rounded-tl-20 rounded-tr-20`}>
        {Array.from(Array(4).keys()).map((_, index) => (
          // className={`${SM.isEmpty ? 'hidden' : ''}`}
          <div
            key={index}
            className="h-[20px] w-[20px] bg-gray-200 rounded-full dark:bg-gray-700"></div>
        ))}
        <div className="h-[70px] w-[70px] bg-gray-200 rounded-full dark:bg-gray-700 absolute ltr:left-9 ltr:right-unset rtl:right-9 rtl:left-unset -bottom-[35px]"></div>
      </div>
      {/* main section */}
      <div className="flex flex-col relative">
        {/* right green line */}
        {/* <div
          className={`w-[7px] h-[170px] absolute top-5 ltr:right-0 ltr:left-unset rtl:left-0 rtl:right-unset rounded-full ${bgColorDark(
            color
          )}`}
        /> */}
        {/* apply button */}
        <div className="flex gap-3 mt-12 mb-5 sm:mb-0 sm:mt-4 ltr:mr-8 rtl:ml-8 self-end items-center relative">
          {/* <span onClick={handleFavortie} className="cursor-pointer">
              <Heart
                className={`w-4 h-4 ${
                  favorite
                    ? '[&_path]:fill-darkOrange-500 [&_path]:stroke-none'
                    : '[&_path]:stroke-darkBlue-200'
                } transition-all duration-300 ease-in`}
              />
            </span> */}
          <div className="w-[170px] h-[44px] bg-gray-200 rounded-md dark:bg-gray-700"></div>
        </div>

        {/* jop post overall detail */}
        <div className="flex flex-col gap-3 px-10">
          {/* company name */}
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>

          {/* job title & description */}
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-56"></div>

          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 min-w-[224px]"></div>

          {/* location, Aviability, salary and post type and ...  starts */}
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
          {/* job-type */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded-10 dark:bg-gray-700"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          </div>

          {/* religion */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded-10 dark:bg-gray-700"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          </div>
          {/* years of experience */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded-10 dark:bg-gray-700"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          </div>

          {/* driving license */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded-10 dark:bg-gray-700"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          </div>
          {/* spoken languages */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded-10 dark:bg-gray-700"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          </div>
          {/* location, Aviability, salary and post type and ...  ends */}
        </div>
        {/* job description, offers, duty, application */}
        <div className="flex flex-col px-10 py-14 gap-8">
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          <div className="flex flex-col gap-2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-5/6 min-w-[224px]"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-5/6 min-w-[224px]"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          <div className="flex flex-col gap-2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 min-w-[224px]"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 min-w-[224px]"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 min-w-[224px]"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 min-w-[224px]"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          <div className="flex flex-col gap-2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 min-w-[224px]"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 min-w-[224px]"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 min-w-[224px]"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 min-w-[224px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
