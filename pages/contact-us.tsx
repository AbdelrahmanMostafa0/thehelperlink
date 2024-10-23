// NEXT JS
import Head from 'next/head';

// i18next
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// components
import ContactForm from '@src/components/contact-us/ContactForm';
import GetInTouch from '@src/components/contact-us/GetInTouch';
import Typography from '@src/components/Typography';

export default function ContactUs() {
  const { t } = useTranslation('contact-us');

  return (
    <>
      <Head>
        <title>{t('contactUs')}</title>
        <meta name="description" content="contact us page" />
      </Head>
      <div className="flex w-full md:pt-24 pt-16 pb-20 relative overflow-hidden">
        {/* background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home-page-bg-2.png"
          alt="home-bg"
          className="rotate-bg-animation absolute origin-center left-0 right-0 m-auto -top-[300px] w-[100px] h-[100px] max-w-none"
        />
        <div className="z-10 w-full flex flex-col items-center gap-10 px-4 max-w-7xl mx-auto">
          <Typography variant="h1">{t('contactUs')}</Typography>
          <div className="flex w-full lg:flex-row flex-col-reverse gap-16 justify-center lg:items-start items-center">
            <GetInTouch />
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'contact-us'])),
  },
});
