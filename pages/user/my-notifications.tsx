// react
import { ReactNode, useEffect } from 'react';

// next js
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { GetServerSidePropsContext } from 'next';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// layout
import UserLayout from '@src/layout/UserLayout';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { shallow } from 'zustand/shallow';
import { useNotification } from '@src/zustand_stores/notification';

// api
import { seenNotifications } from '@src/api/POST/seenNotifications';
import { getNotifications } from '@src/api/GET/getNotifications';

// utils
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';

// types
import { INotification } from '@src/@types/notification';

// user query
import { useQuery } from 'react-query';

// components
import Typography from '@src/components/Typography';
import Pagination from '@src/components/Pagination';
import NotifCard from '@src/components/user/notifications/NotifCard';
import NotifSkeleton from '@src/components/global/skeleton/NotifSkeleton';

interface IProps {
  children?: ReactNode;
}

const colors = ['green', 'blue', 'orange'];

const MyNotifications: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const user = useUserStore((state) => state.userState, shallow);
  const { setShouldUpdate, shouldUpdate } = useNotification((state) => state);

  const page = +Number((router.query['page'] as string) || '') || 1;

  // fetch notifications
  const {
    data: notifications,
    isIdle: isNotificationIdle,
    isLoading: isNotificationLoading,
    refetch: refetchNotifications,
  } = useQuery<{
    results: INotification[];
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }>(
    ['get-my-notifications', +page, router.locale, user?.userType],
    () => getNotifications({ page: page, pageSize: 10 }),
    {}
  );

  useEffect(() => {
    if (notifications && notifications.results.length > 0) {
      const seenNotifs = async () =>
        await seenNotifications(notifications.results.map((notif) => notif.id)).then(
          ({ status }) => {
            if (status === 204) {
              setShouldUpdate(true);
              refetchNotifications();
            }
          }
        );
      seenNotifs();
    }
  }, [notifications]);

  return (
    <>
      <Head>
        <title>{t('userNotifications')}</title>
        <meta name="description" content="my notifications" />
      </Head>
      <UserLayout mobileTitle={t('notifications')}>
        <div className="w-full flex flex-col lg:items-start items-center gap-10">
          <div className="flex flex-col gap-5">
            {isNotificationLoading || isNotificationIdle ? (
              Array.from(Array(5).keys()).map((_, idx) => <NotifSkeleton key={idx} />)
            ) : notifications && notifications.results.length > 0 ? (
              notifications?.results?.map((notif, index) => (
                <NotifCard key={index} notif={notif} refetch={refetchNotifications} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 mt-10">
                <Image
                  width={54}
                  height={54}
                  src={
                    user?.userType === 'employer'
                      ? '/images/notification_icon_green.png'
                      : '/images/notification_icon_orange.png'
                  }
                  className="shadow-custom-shadow rounded-full"
                  alt={t('noNotificationYet')}
                />
                <Typography variant="caption">{t('youDontHaveanyNotifications')}</Typography>
              </div>
            )}
          </div>

          {notifications && notifications.results?.length ? (
            <Pagination
              pageCount={notifications.pagination.pageCount || 1}
              pageSize={10}
              total={notifications.pagination.total}
            />
          ) : (
            <></>
          )}
        </div>
      </UserLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { locale } = ctx;
  let forceLogout = false;

  return ssrAuthHandler({
    ctx,
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'user'])),
    },
    forceLogout,
  });
};

export default MyNotifications;
