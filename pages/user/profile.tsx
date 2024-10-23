// react
import { ReactNode, useEffect } from 'react';

// next js
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// api
import { getJobTypes } from '@src/api/GET/getJobTypes';
import { getNationalities } from '@src/api/GET/getNationalities';
import { getCountries } from '@src/api/GET/getCountries';
import { getSkills } from '@src/api/GET/getSkills';
import {
  getMyProfile,
  // userDataConvertor
} from '@src/api/GET/getMyProfile';
import { getRegions } from '@src/api/GET/getRegions';

// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';

// layout
import UserLayout from '@src/layout/UserLayout';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { shallow } from 'zustand/shallow';

// utils
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';
import { listTranslator } from '@src/utils/listTranslator';

// types
import { IDataList } from '@src/@types/common';
import { IUser } from '@src/@types/user';

// components
import HelperEdit from '@src/components/user/profile/HelperEdit';
import EmployerEdit from '@src/components/user/profile/EmployerEdit';

interface IProps {
  children?: ReactNode;
}

const UserProfile: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user');
  const user = useUserStore((state) => state.userState, shallow);
  const { changeUserState } = useUserStore((state) => state);

  const { data: nationalities } = useQuery<{ data: IDataList[] }>(
    ['nationalities', router.locale],
    () => getNationalities(router.locale || '')
  );
  const { data: countries } = useQuery<{ data: IDataList[] }>(['countries', router.locale], () =>
    getCountries(router.locale || '')
  );

  const { data: regions } = useQuery<{ data: IDataList[] }>(['regions', router.locale], () =>
    getRegions(router.locale || '')
  );

  const { data: jobTypes } = useQuery<{ data: IDataList[] }>(['job-types', router.locale], () =>
    getJobTypes(router.locale || '')
  );

  const { data: skills } = useQuery<{ data: IDataList[] }>(['skills', router.locale], () =>
    getSkills(router.locale || '')
  );

  const { data: userData } = useQuery(['get-my-profile'], () =>
    getMyProfile(undefined, router.locale)
  );

  useEffect(() => {
    if (userData) {
      changeUserState(userData as IUser);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{t('userProfile')}</title>
        <meta name="description" content="user profile" />
      </Head>
      <UserLayout>
        <div className="w-full bg-white rounded-20 shadow-custom-shadow flex flex-col text-center py-8 px-5 md:px-9 lg:px-16">
          {user?.userType === 'employer' ? (
            <EmployerEdit
              userInfo={userData as IUser}
              regions={listTranslator(router.locale || '', regions?.data || []).sort((a, b) =>
                a.attributes.name.localeCompare(b.attributes.name)
              )}
            />
          ) : (
            <HelperEdit
              skills={listTranslator(router.locale || '', skills?.data || [])}
              userInfo={userData as IUser}
              jobTypes={listTranslator(router.locale || '', jobTypes?.data || [])}
              nationalities={listTranslator(router.locale || '', nationalities?.data || []).sort(
                (a, b) => a.attributes.name.localeCompare(b.attributes.name)
              )}
              countries={listTranslator(router.locale || '', countries?.data || []).sort((a, b) =>
                a.attributes.name.localeCompare(b.attributes.name)
              )}
            />
          )}
        </div>
      </UserLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { locale } = ctx;
  let forceLogout = false;
  try {
    await queryClient.fetchQuery<{ data: IUser }>(['get-my-profile'], () =>
      getMyProfile(ctx, locale)
    );
    await queryClient.fetchQuery<{ data: IDataList[] }>(['job-types', locale], () =>
      getJobTypes(locale || '')
    );
    await queryClient.fetchQuery<{ data: IDataList[] }>(['nationalities', locale], () =>
      getNationalities(locale || '')
    );
    await queryClient.fetchQuery<{ data: IDataList[] }>(['countries', locale], () =>
      getCountries(locale || '')
    );
    await queryClient.fetchQuery<{ data: IDataList[] }>(['regions', locale], () =>
      getRegions(locale || '')
    );
    await queryClient.fetchQuery<{ data: IDataList[] }>(['skills', locale], () =>
      getSkills(locale || '')
    );
  } catch (error: any) {
    if (error.response?.data?.error?.status === 403) {
      forceLogout = true;
    }
  }

  return ssrAuthHandler({
    ctx,
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'user'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    forceLogout,
  });
};

export default UserProfile;
