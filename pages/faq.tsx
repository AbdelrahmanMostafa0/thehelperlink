// NEXT JS
import Head from 'next/head';

// i18next
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// components
import Accordion from '@src/components/faq/Accordion';
import MoreQuestions from '@src/components/faq/MoreQuestions';

import Typography from '@src/components/Typography';

export default function FAQ() {
  const { t } = useTranslation('faq');

  return (
    <>
      <Head>
        <title>{t('frequentlyAskedQuestions')}</title>
        <meta name="description" content="FAQ page" />
      </Head>
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 pt-24 pb-20 relative">
        {/* background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home-page-bg-2.png"
          alt="home-bg"
          className="rotate-bg-animation absolute origin-center left-0 right-0 m-auto -top-[300px] w-[100px] h-[100px] max-w-none"
        />
        {/* page content */}
        <div className="z-10">
          {/* title & description */}
          {/* <Typography
          variant="body1"
          className="max-w-[700px] uppercase text-lightBlue-500 font-black">
          {t('FAQ')}
        </Typography> */}
          <Typography variant="h1" className="max-w-[700px]">
            {t('frequentlyAskedQuestions')}
          </Typography>
          <div className="flex flex-col lg:flex-row justify-around pt-16">
            {/* faq Accordion */}
            <Accordion />
            {/* more questions card */}
            <MoreQuestions />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale }: { locale: any }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'faq'])),
    },
  };
};
