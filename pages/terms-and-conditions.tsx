// react
import { ReactNode } from 'react';

// next js
import Head from 'next/head';
import { useRouter } from 'next/router';

// i18next
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// components
import Typography from '@src/components/Typography';

interface IProps {
  children?: ReactNode;
}

const TermsAndConditions: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('terms-and-conditions') as any;

  return (
    <>
      <Head>
        <title>{t('termsAndConditions')}</title>
        <meta name="description" content={t('termsAndConditions')} />
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
          <Typography variant="h1" className="">
            {t('termsAndConditions')}
          </Typography>
          <div className="flex flex-col pt-16">
            {/* section 1 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('1ParagraphTitle1')}
                <span className="text-lightGreen-500">{t('1ParagraphTitle2')}</span>
              </Typography>

              <div className="flex flex-col gap-5 pt-5">
                {Array.from(Array(4).keys()).map((index) => (
                  <Typography key={index} fontweight="book">
                    {` ${t(`1ParagraphDescription${index + 1}`)}`}
                  </Typography>
                ))}
              </div>
            </div>

            {/* section 2 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('2ParagraphTitle')}
              </Typography>

              <div className="flex flex-col gap-5 pt-5">
                {Array.from(Array(4).keys()).map((index) => (
                  <Typography key={index} fontweight="book">
                    {` ${t(`2ParagraphDescription${index + 1}`)}`}
                  </Typography>
                ))}
              </div>
            </div>

            {/* section 3 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('3ParagraphTitle')}
              </Typography>

              <div className="flex flex-col gap-5 pt-5">
                <Typography fontweight="book">{t('3ParagraphDescription')}</Typography>
                {Array.from(Array(5).keys()).map((index) => (
                  <Typography key={index} fontweight="book">
                    <span className="font-heavy">
                      "{`${t(`3ParagraphOptionTitle${index + 1}`)}`}":
                    </span>
                    {` ${t(`3ParagraphOptionDescription${index + 1}`)}`}
                  </Typography>
                ))}
              </div>
            </div>

            {/* section 4 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('4ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('4ParagraphDescription')}</Typography>
            </div>

            {/* section 5 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('5ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('5ParagraphDescription1')}</Typography>
              <div className="mt-4 ltr:pl-4 rtl:pr-4">
                <ul className="list-disc">
                  {Array.from(Array(4).keys()).map((index) => (
                    <li key={index} className="mb-3">
                      <Typography fontweight="medium">
                        {t(`5ParagraphOption${index + 1}`)}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
              <Typography fontweight="book">{t('5ParagraphDescription2')}</Typography>
            </div>

            {/* section 6 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('6ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('6ParagraphDescription1')}</Typography>
              <div className="mt-4 ltr:pl-4 rtl:pr-4">
                <ul className="list-disc">
                  {Array.from(Array(16).keys()).map((index) => (
                    <li key={index} className="mb-3">
                      <Typography fontweight="medium">
                        {t(`6ParagraphOption${index + 1}`)}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
              <Typography fontweight="book">{t('6ParagraphDescription2')}</Typography>
              <Typography fontweight="book">{t('6ParagraphDescription3')}</Typography>
              <Typography fontweight="book">{t('6ParagraphDescription4')}</Typography>
            </div>

            {/* section 7 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('7ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('7ParagraphDescription')}</Typography>
              <div className="mt-4 ltr:pl-4 rtl:pr-4">
                <ul className="list-disc">
                  {Array.from(Array(5).keys()).map((index) => (
                    <li key={index} className="mb-3">
                      <Typography fontweight="medium">
                        {t(`7ParagraphOption${index + 1}`)}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ltr:pl-4 rtl:pr-4 flex flex-col gap-5">
                {Array.from(Array(4).keys()).map((index) => (
                  <Typography fontweight="book">
                    <span className="font-heavy">
                      {t(`7ParagraphOption6Sub${index + 1}Title`)} -
                    </span>
                    {` ${t(`7ParagraphOption6Sub${index + 1}Description`)}`}
                  </Typography>
                ))}
              </div>
            </div>

            {/* section 8 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('8ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('8ParagraphDescription1')}</Typography>
              <div className="mt-4 ltr:pl-4 rtl:pr-4">
                <ul className="list-disc">
                  {Array.from(Array(13).keys()).map((index) => (
                    <li key={index} className="mb-3">
                      <Typography fontweight="medium">
                        {t(`8ParagraphOption${index + 1}`)}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
              <Typography fontweight="book">{t('8ParagraphDescription2')}</Typography>
              <Typography fontweight="book">{t('8ParagraphDescription3')}</Typography>
              <Typography fontweight="book">{t('8ParagraphDescription4')}</Typography>
              <Typography fontweight="book">{t('8ParagraphDescription5')}</Typography>
              <Typography fontweight="book">{t('8ParagraphDescription6')}</Typography>
              <Typography fontweight="book">{t('8ParagraphDescription7')}</Typography>
            </div>

            {/* section 9 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('9ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('9ParagraphDescription')}</Typography>
            </div>

            {/* section 10 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('10ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('10ParagraphDescription1')}</Typography>
              <Typography fontweight="book">{t('10ParagraphDescription2')}</Typography>
              <div className="mt-4 ltr:pl-4 rtl:pr-4">
                <ul className="list-disc">
                  {Array.from(Array(5).keys()).map((index) => (
                    <li key={index} className="mb-3">
                      <Typography fontweight="medium">
                        {t(`10ParagraphOption${index + 1}`)}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
              <Typography fontweight="book">{t('10ParagraphDescription3')}</Typography>
              <Typography fontweight="book">{t('10ParagraphDescription4')}</Typography>
            </div>

            {/* section 11 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('11ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('11ParagraphDescription')}</Typography>
            </div>

            {/* section 12 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('12ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('12ParagraphDescription1')}</Typography>
              <Typography fontweight="book">{t('12ParagraphDescription2')}</Typography>
              <Typography fontweight="book">{t('12ParagraphDescription3')}</Typography>
              <Typography fontweight="book">{t('12ParagraphDescription4')}</Typography>
            </div>

            {/* section 13 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('13ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('13ParagraphDescription')}</Typography>
            </div>

            {/* section 14 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('14ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('14ParagraphDescription')}</Typography>
            </div>

            {/* section 15 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('15ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('15ParagraphDescription')}</Typography>
            </div>

            {/* section 16 */}
            <div className="flex flex-col gap-5 mt-5">
              <Typography variant="h5" fontweight="heavy">
                {t('16ParagraphTitle')}
              </Typography>
              <Typography fontweight="book">{t('16ParagraphDescription')}</Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: any }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'terms-and-conditions'])),
    },
  };
};

export default TermsAndConditions;
