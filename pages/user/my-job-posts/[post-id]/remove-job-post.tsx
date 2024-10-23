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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// icons
import { Trash } from '@src/assets/icons';

// routes
import { ROUTES_URL } from '@src/routes';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import { deleteJobPost } from '@src/api/DELETE/deleteJobPost';

interface IProps {
  children?: ReactNode;
}

const RemoveJobPost: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user');

  return (
    <>
      <Head>
        <title>{t('removeJobPost')}</title>
        <meta name="description" content="remove job post" />
      </Head>
      <div className="w-full p-4 flex justify-center items-center min-h-screen bg-[url('/images/customer-type-bg.png')] bg-center bg-cover bg-no-repeat">
        <div className="flex flex-col w-full p-12 pt-16 shadow-custom-shadow rounded-20 bg-white text-start items-start max-w-[592px]">
          <Trash className="w-13 h-12 [&>path]:stroke-darkOrange-500" />
          <Typography className="mt-11 mb-10" variant="h3">
            {t('deleteTitlePost')}
          </Typography>

          <div className="flex xs:items-center items-start gap-3 flex-col-reverse xs:flex-row">
            <Button
              onClick={async () =>
                deleteJobPost(router, t).then(() =>
                  router.push(ROUTES_URL.navRoutes.user.jobPosts.main)
                )
              }
              color="orange"
              className="flex items-center gap-1">
              <Trash className="w-[19px] h-[19px] [&>path]:stroke-darkOrange-500" />
              <Typography variant="caption" className="whitespace-nowrap">
                {t('yesDeleteIt')}
              </Typography>
            </Button>
            <Link href={ROUTES_URL.navRoutes.user.jobPosts.main}>
              <Button loadMoreButton color="green">
                <Typography variant="caption" className="whitespace-nowrap">
                  {t('keepPost')}
                </Typography>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: any }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'user'])),
    },
  };
};

export default RemoveJobPost;
