// react
import { ReactNode, useEffect } from 'react';

// next js
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// i18next
import { useTranslation, Trans } from 'next-i18next';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import MultiRangeSlider from '../MultiRangeSlider';

interface IProps {
  children?: ReactNode;
}

const MultiRange: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;

  return (
    <MultiRangeSlider
      max={100}
      min={0}
      step={1}
      // maxValue={watch('maxAge') ? parseInt(watch('maxAge')) : 10}
      // minValue={watch('minAge') ? parseInt(watch('minAge')) : 0}
      // maxCaption={`${watch('maxAge') || 10}${t('Y')} `}
      // minCaption={`${watch('minAge') || 0}${t('Y')} `}
      // onInput={(e) => {
      //   setValue('minAge', e.minValue.toString());
      //   setValue('maxAge', e.maxValue.toString());
      // }}
    />
  );
};

export default MultiRange;
