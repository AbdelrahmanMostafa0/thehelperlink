// react
import { ReactNode, useEffect, useState } from 'react';

// next js
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';

// utils
import { colorDetector } from '@src/utils/colorUtils';
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';

// api
import { getHelpers, getSingleHelper } from '@src/api/GET/getHerlpers';

// types
import { IHelper } from '@src/@types/helper';

// i18next
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// hooks
import useMediaQuery from '@src/hooks/useMediaQuery';

// next-usequerystate
import { useQueryState } from 'next-usequerystate';

// layout
import HelpersLayout from '@src/layout/HelpersLayout';

// components
import DetailHelper from '@src/components/helpers/DetailHelper';
import DetailSkeleton from '@src/components/global/skeleton/DetailSkeleton';

interface IProps {
  children?: ReactNode;
}

const Helpers: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('helpers');
  const windowWidth = useMediaQuery();

  const [currentHelper, setCurrentHelper] = useState<IHelper | null>(null);
  const [currentHelperId, setCurrentHelperId] = useQueryState('currentHelperId');
  const [mobilePage, setMobilePage] = useState<'detail' | 'helpers'>('helpers');

  // helprs list max-height
  const [maxHeightHelpersList, setMaxHeightHelpersList] = useState<string | number>('auto');

  // pagination states
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });
  const [pagination, setPagination] = useState({
    pageCount: 5,
    total: 0,
  });

  // remove currentHelperId query to stop unnecessary rerendering
  const routerQueries = { ...router.query };
  delete routerQueries['currentHelperId'];

  // fetch helpers list list csr
  const {
    data: helpers,
    isFetched,
    isLoading,
    refetch: refetchHelpers,
  } = useQuery<{
    results: IHelper[];
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }>(['get-helpers', +page, routerQueries, router.locale], () =>
    getHelpers({ page: +page, pageSize: 10, queries: routerQueries, locale: router.locale })
  );

  // fetch singler helper csr
  const {
    isIdle,
    data: singleHelperData,
    isLoading: isSingleHelperLoading,
    refetch: refetchSingleHelper,
  } = useQuery<IHelper>(
    ['single-helper', currentHelperId, router.locale],
    () => getSingleHelper(currentHelperId || '', router.locale),
    {
      enabled: currentHelperId !== null || (helpers?.results && helpers.results.length > 0),
    }
  );

  // update pagination state
  useEffect(() => {
    if (helpers?.results?.length) {
      setPagination({ pageCount: helpers.pagination.pageCount, total: helpers?.pagination.total });
    }
  }, [helpers]);

  // if theres no currentHelperId, selects the first helper
  useEffect(() => {
    if (!currentHelperId && helpers?.results && helpers?.results.length > 0) {
      setCurrentHelper(helpers?.results[0]);
      // setCurrentHelperId(helpers?.results[0].id?.toString(), { scroll: false, shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHelperId, helpers?.results]);

  // when we have a valid currentHelperId we select the single helper data
  useEffect(() => {
    if (currentHelperId && singleHelperData) {
      setCurrentHelper(singleHelperData);
      setMobilePage('detail');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleHelperData, currentHelperId]);

  useEffect(() => {
    if (windowWidth < 1024) {
      setMaxHeightHelpersList('fit-content');
    }
  }, [windowWidth]);

  return (
    <>
      <Head>
        <title>{t('helpers')}</title>
        <meta name="description" content="helpers" />
      </Head>
      <HelpersLayout
        refetchHelpers={refetchHelpers}
        refetchSingleHelper={refetchSingleHelper}
        isLoading={isLoading}
        maxHeightHelpersList={maxHeightHelpersList}
        total={pagination.total}
        pageCount={pagination.pageCount}
        setMobilePage={setMobilePage}
        mobilePage={mobilePage}
        usersData={helpers?.results}>
        {isSingleHelperLoading || isIdle ? (
          <DetailSkeleton setMaxHeight={setMaxHeightHelpersList} />
        ) : (
          <DetailHelper
            setMaxHeightHelpersList={setMaxHeightHelpersList}
            userData={currentHelper || undefined}
            color={colorDetector(currentHelper?.id || 0)}
            refetchHelpers={refetchHelpers}
          />
        )}
      </HelpersLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { locale, query } = ctx;
  const routerQueries = { ...query };
  delete routerQueries['currentHelperId'];

  const helperId: string = query['currentHelperId'] as string;
  let forceLogout = false;
  try {
    // fetch helpers list ssr
    queryClient.prefetchQuery<{
      results: IHelper[];
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    }>(['get-helpers', +query['page']! || 1, routerQueries, locale], () =>
      getHelpers({ page: +query['page']! || 1, pageSize: 10, queries: routerQueries, locale })
    );

    // fetch single helper ssr
    if (helperId) {
      await queryClient.prefetchQuery<{ data: IHelper }>(['single-helper', helperId, locale], () =>
        getSingleHelper(helperId || '', locale)
      );
    }
  } catch (error: any) {
    if (error.response?.data?.error?.status === 403) {
      forceLogout = true;
    }
  }

  return ssrAuthHandler({
    ctx,
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'helpers'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    forceLogout,
  });
};

export default Helpers;
