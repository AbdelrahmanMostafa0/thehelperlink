// react
import { ReactNode, useEffect, useState } from 'react';

// next js
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// i18next
import { useTranslation, Trans } from 'next-i18next';

// icons
import { ArrowDown } from '@src/assets/icons';

// hooks
import useComponentVisible from '@src/hooks/useComponentVisible';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';

interface IProps {
  children?: ReactNode;
}

const sorts = ['latest', 'age', 'name'];

const SortSelect: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const { isComponentVisible, ref, setIsComponentVisible } = useComponentVisible(false);

  const [selectedSort, setSelectedSort] = useState<string>(sorts[0]);

  const handleSelectSort = (sort: string) => {
    setSelectedSort(sort);
  };

  return (
    <div
      ref={ref}
      className="flex gap-1 items-center relative cursor-pointer"
      onClick={() => setIsComponentVisible((prevtate) => !prevtate)}>
      <Typography variant="caption">{t('sortBy')}:</Typography>
      <Typography variant="caption" fontweight="book">
        {selectedSort}
      </Typography>
      <ArrowDown />
      {/* drop down */}
      {isComponentVisible && (
        <div className="absolute top-[22px] right-0 shadow-custom-light-shadow rounded-md w-full bg-white overflow-hidden">
          <ul>
            {sorts.map((sort, index) => (
              <li
                key={index}
                onClick={() => handleSelectSort(sort)}
                className={`px-2 py-1 ${
                  selectedSort === sort ? 'bg-darkBlue-100' : 'bg-inherit'
                } hover:bg-darkBlue-100 transition-all ease-in`}>
                <Typography
                  className={`${selectedSort === sort ? 'text-white' : ''} hover:text-white`}
                  variant="caption">
                  {t(sort)}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortSelect;
