// react
import React, { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation } from 'next-i18next';

// routes
import { ROUTES_URL } from '@src/routes';

// types
import { IHelper } from '@src/@types/helper';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import Filters from '@src/components/global/Filters';
import HelperCard from '@src/components/helpers/HelperCard';
import Pagination from '@src/components/Pagination';
import HelpersListSkeleton from '@src/components/global/skeleton/HelpersListSkeleton';

interface IProps {
  children?: ReactNode;
  usersData?: IHelper[];
  setMobilePage: React.Dispatch<React.SetStateAction<'detail' | 'helpers'>>;
  mobilePage: 'detail' | 'helpers';
  total: number;
  pageCount: number;
  maxHeightHelpersList: string | number;
  isLoading: boolean;
  refetchSingleHelper: () => void;
  refetchHelpers: () => void;
}

const HelpersLayout: React.FC<IProps> = ({
  children,
  usersData,
  mobilePage,
  pageCount,
  setMobilePage,
  total,
  maxHeightHelpersList,
  isLoading = false,
  refetchSingleHelper,
  refetchHelpers,
}) => {
  const router = useRouter();
  const { t } = useTranslation('helpers');
  const { t: tCommon } = useTranslation('common');

  return (
    <div className="w-full flex flex-col pb-16">
      {/* title and search bar */}
      <div
        className={`w-full flex justify-center items-center h-[300px] bg-[url('/images/helpers-page-bg.png')] bg-fixed bg-center bg-cover bg-no-repeat p-4 before:absolute relative before:left-0 before:top-0 before:bg-bgGradient before:w-full before:h-full ${
          mobilePage === 'detail' ? 'lg:flex hidden' : 'flex'
        }`}>
        <div className="flex flex-col relative">
          <Typography variant="h3" className="text-white pb-5 text-center">
            {t('helpersProfile')}
          </Typography>
          {/* <SearchField searchType="helpers" /> */}
        </div>
      </div>
      {/* filters */}
      <div className={`flex w-full ${mobilePage === 'detail' ? 'lg:flex hidden' : 'flex'}`}>
        <Filters filtersType="helpers" />
      </div>

      <div className="flex flex-col w-full max-w-7xl mx-auto px-4">
        {/* back button in smaller than lg in detail helpers page */}
        <div className={`${mobilePage === 'detail' ? 'flex lg:hidden' : 'hidden'}`}>
          <Button onClick={() => setMobilePage('helpers')} loadMoreButton back className="my-12">
            {t('backToHelpers')}
          </Button>
        </div>
        {/* helpers container */}
        <div className="flex gap-5">
          <div
            className={`flex flex-col w-full lg:w-[403px] ${
              mobilePage === 'detail' ? 'hidden lg:flex' : 'flex'
            }`}>
            {/* helpers' lists */}
            <div
              style={{
                maxHeight:
                  typeof maxHeightHelpersList === 'number'
                    ? (maxHeightHelpersList as number) - 76
                    : maxHeightHelpersList,
              }}
              className={`flex-col gap-7 w-full lg:w-[403px] pb-5 px-2 py-2 pt-2 overflow-y-auto overflow-x-hidden min-w-fit scrollbar-hidden ${
                mobilePage === 'detail' ? 'hidden lg:flex' : 'flex'
              }`}>
              {isLoading ? (
                <HelpersListSkeleton mobilePage={mobilePage} />
              ) : usersData && usersData?.length > 0 ? (
                <div
                  // style={{ maxHeight: maxHeightHelpersLists }}
                  className={`flex flex-col self-start w-full min-w-[auto] gap-8 lg:gap-0 lg:w-[403px] lg:shadow-custom-light-shadow rounded-[4px] ${
                    mobilePage === 'detail' ? 'hidden lg:flex flex-col' : 'flex flex-row flex-wrap'
                  }`}>
                  {usersData?.map((user, index) => (
                    <HelperCard
                      onFavoriteClicked={() => {
                        refetchHelpers();
                        refetchSingleHelper();
                      }}
                      key={index}
                      userData={user}
                      callback={() => {
                        setMobilePage('detail');
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 mt-10">
                  <Typography variant="caption">
                    {router.query ? tCommon('couldNotFindHelpers') : tCommon('noHelperYet')}
                  </Typography>
                  {router.query && (
                    <Link href={ROUTES_URL.navRoutes.helpers} shallow scroll={false}>
                      <Button loadMoreButton>
                        <Typography variant="caption">{tCommon('clearFilters')}</Typography>
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
            {usersData && usersData?.length > 0 ? (
              <Pagination pageCount={pageCount} pageSize={10} total={total} />
            ) : (
              <></>
            )}
          </div>
          {/* detail helper */}
          <div className={`flex-1 ${mobilePage === 'detail' ? 'flex' : 'hidden lg:flex'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpersLayout;
