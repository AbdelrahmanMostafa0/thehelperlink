// NEXT JS
import Head from 'next/head';

// i18next
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

// components
import Typography from '@src/components/Typography';

export default function FAQ() {
  const { t } = useTranslation('privacy');

  return (
    <>
      <Head>
        <title>{t('privacyPolicy')}</title>
        <meta name="description" content="Privacy page" />
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
          <Typography variant="h1" className="max-w-[700px]">
            {t('privacyPolicy')}
          </Typography>
          <div className="flex flex-col pt-16">
            <Typography>{t('privacyDetail')}</Typography>
            <Typography variant="h4" className="mt-10">
              {t('firstHeader')}
            </Typography>
            <Typography className="mt-4">
              {t('firstHeaderDetail')}
              <br /> <br />
              {t('weMayCollectYou')}
            </Typography>
            <Typography variant="h4" className="mt-10">
              {t('a')}. {t('infoYouGaveUs')}
            </Typography>
            <Typography className="mt-4">{t('infoYouGaveUsDetail')}</Typography>
            <Typography variant="h4" className="mt-10">
              {t('b')}. {t('infoWeCollectAboutYou')}
            </Typography>
            <Typography className="mt-4">{t('infoWeCollectAboutYouDetail')}</Typography>
            <Typography variant="h4" className="mt-10">
              {t('c')}. {t('infoWeReceiveFromOtherSource')}
            </Typography>
            <Typography className="mt-4">{t('infoWeReceiveFromOtherSourceDetail')}</Typography>
            <Typography variant="h4" className="mt-10">
              {t('secondHeader')}
              <br /> <br />
              {t('cookies')}
            </Typography>
            <Typography className="mt-4">{t('cookiesDetail')}</Typography>
            <Typography variant="h4" className="mt-10">
              {t('weUseTheFollowingCookies')}
            </Typography>
            <div className="mt-4 ltr:pl-4 rtl:pr-4">
              <ul className="list-disc">
                {Array.from(Array(4).keys()).map((index) => (
                  <li key={index} className="mb-3">
                    <Typography>
                      <span className="font-heavy">{t(`followingCookiesHeader${index + 1}`)}</span>
                      {` ${t(`followingCookiesDetail${index + 1}`)}`}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
            <Typography variant="h4" className="mt-10">
              {t('weUseInformationHeldAboutYou')}
            </Typography>
            <div className="mt-4 ltr:pl-4 rtl:pr-4">
              <ul className="list-disc">
                {Array.from(Array(16).keys()).map((index) => (
                  <li key={index} className="mb-3">
                    <Typography>{t(`weUseInformationHeldAboutYouDetail${index + 1}`)}</Typography>
                  </li>
                ))}
              </ul>
            </div>
            <Typography variant="h4" className="mt-10">
              {t('informationWeReceiveFromOtherSources')}
            </Typography>
            <Typography className="mt-4">
              {t('informationWeReceiveFromOtherSourcesDetail')}
            </Typography>
            <Typography variant="h4" className="mt-10">
              {t('disclosureOfYourInformation')}
            </Typography>
            <Typography className="mt-4">
              {t('disclosureOfYourInformationTitle')}
              <br /> <br />
            </Typography>
            <div className="mt-4 ltr:pl-4 rtl:pr-4">
              <ul className="list-disc">
                {Array.from(Array(8).keys()).map((index) => (
                  <li key={index} className="mb-3">
                    <Typography>{t(`disclosureOfYourInformationDetail${index + 1}`)}</Typography>
                  </li>
                ))}
              </ul>
            </div>
            <Typography variant="h4" className="mt-10">
              {t('consentToProcessingData')}
            </Typography>
            <Typography className="mt-4 leading-7">{t('consentToProcessingDataDetail')}</Typography>
            <Typography variant="h4" className="mt-10">
              {' '}
              {t('yourRights')}
            </Typography>
            <Typography className="mt-4">{t('yourRightsDetail')}</Typography>
            <Typography variant="h4" className="mt-10">
              {t('changesUoOurPrivacyPolicy')}
            </Typography>
            <Typography className="mt-4">
              {t('changesUoOurPrivacyPolicyTitle1')}
              <br /> <br />
              {t('changesUoOurPrivacyPolicyDetail1')} <br /> <br />
              {t('changesUoOurPrivacyPolicyTitle2')}
              <br /> <br />
              {t('changesUoOurPrivacyPolicyDetail2')}
            </Typography>
            <br /> <br />
            <br /> <br />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale }: { locale: any }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'privacy'])),
    },
  };
};
