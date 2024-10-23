// NEXT JS
import Head from 'next/head';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import TopSection from '@src/components/about-us/TopSection';
import OurValues from '@src/components/about-us/OurValues';
import OurVision from '@src/components/about-us/OurVision';

export default function AboutUs() {
  const { t } = useTranslation('about-us');

  return (
    <>
      <Head>
        <title>{t('aboutUs')}</title>
        <meta name="description" content="vacancies page" />
      </Head>
      <div className="flex w-full pt-24 pb-20 relative">
        {/* background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home-page-bg-2.png"
          alt="home-bg"
          className="rotate-bg-animation absolute origin-center left-0 right-0 m-auto -top-[300px] w-[100px] h-[100px] max-w-none"
        />
        <div className="z-10 w-full flex flex-col items-start gap-28">
          <TopSection />
          <OurValues />
          <OurVision />
          {/* <WhyChooseUs /> */}
          {/* <Testimonials /> */}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'about-us'])),
  },
});
