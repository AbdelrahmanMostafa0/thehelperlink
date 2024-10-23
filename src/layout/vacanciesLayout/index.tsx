// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation } from 'next-i18next';

// routes
import { ROUTES_URL } from '@src/routes';

// utils
import { colorDetector } from '@src/utils/colorUtils';

// types
import { IJobPost } from '@src/@types/jobPost';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import Filters from '@src/components/global/Filters';
import JobPostCard from '@src/components/global/JobPostCard';
import Pagination from '@src/components/Pagination';
import JobPostSkeleton from '@src/components/global/skeleton/JobPostSkeleton';

interface IProps {
  children?: ReactNode;
  jobPosts?: IJobPost[];
  setMobilePage: React.Dispatch<React.SetStateAction<'detail' | 'jobs'>>;
  mobilePage: 'detail' | 'jobs';
  total: number;
  pageCount: number;
  maxHeightJobList: number | string;
  isLoading: boolean;
  refetchSingleJob: () => void;
  refetchJobPosts: () => void;
}

const VacanciesLayout: React.FC<IProps> = ({
  children,
  jobPosts,
  mobilePage,
  setMobilePage,
  pageCount,
  total,
  maxHeightJobList,
  isLoading = false,
  refetchSingleJob,
  refetchJobPosts,
}) => {
  const router = useRouter();
  const { t } = useTranslation('vacancies');
  const { t: tCommon } = useTranslation('common');

  return (
    <div className="w-full flex flex-col pb-16">
      {/* title and search bar */}
      <div
        className={`w-full flex justify-center items-center h-[300px] bg-[url('/images/vacancies-page-bg.png')] bg-fixed bg-center bg-cover bg-no-repeat p-4 before:absolute relative before:left-0 before:top-0 before:bg-bgGradient before:w-full before:h-full ${
          mobilePage === 'detail' ? 'lg:flex hidden' : 'flex'
        }`}>
        <div className="flex flex-col relative">
          <Typography variant="h3" className="text-white pb-5 text-center">
            {t('currentVacancies')}
          </Typography>
          {/* <SearchField /> */}
        </div>
      </div>
      {/* filters */}
      <div className={`flex w-full ${mobilePage === 'detail' ? 'lg:flex hidden' : 'flex'}`}>
        <Filters filtersType="vacancies" />
      </div>
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4">
        {/* back button in smaller than lg in detail vacancie page */}
        <div className={`${mobilePage === 'detail' ? 'flex lg:hidden' : 'hidden'}`}>
          <Button onClick={() => setMobilePage('jobs')} loadMoreButton back className="my-12">
            {t('backToVacancies')}
          </Button>
        </div>
        {/* job posts */}
        <div className="flex gap-5">
          <div
            className={`flex flex-col min-w-fit ${
              mobilePage === 'detail' ? 'hidden lg:flex' : 'flex'
            }`}>
            {/* job post lists */}
            <div
              style={{
                maxHeight:
                  typeof maxHeightJobList === 'number'
                    ? (maxHeightJobList as number) - 76
                    : maxHeightJobList,
              }}
              className={`flex-col gap-11 overflow-y-auto overflow-x-hidden min-w-fit pb-16 scrollbar-hidden ${
                mobilePage === 'detail' ? 'lg:flex hidden' : 'flex'
              }`}>
              <div
                className={`gap-9 lg:gap-11 lg:px-4 items-center ${
                  mobilePage === 'detail'
                    ? 'lg:flex hidden flex-col'
                    : 'flex flex-row flex-wrap lg:flex-col'
                }`}>
                {!isLoading ? (
                  jobPosts && jobPosts?.length > 0 ? (
                    jobPosts?.map((job, index) => (
                      <JobPostCard
                        key={index}
                        JobPostData={job}
                        color={colorDetector(job.id)}
                        callback={() => setMobilePage('detail')}
                        onFavoriteClicked={() => {
                          refetchSingleJob();
                          refetchJobPosts();
                        }}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 mt-10">
                      <Typography variant="caption">
                        {router.query ? tCommon('couldNotFindJobs') : tCommon('noJobYet')}
                      </Typography>
                      {router.query && (
                        <Link href={ROUTES_URL.navRoutes.vacancies} shallow scroll={false}>
                          <Button loadMoreButton>
                            <Typography variant="caption">{tCommon('clearFilters')}</Typography>
                          </Button>
                        </Link>
                      )}
                    </div>
                  )
                ) : (
                  Array.from(Array(10).keys()).map((_, idx) => <JobPostSkeleton key={idx} />)
                )}
              </div>
            </div>
            {jobPosts && jobPosts.length ? (
              <Pagination pageCount={pageCount} pageSize={10} total={total} />
            ) : (
              <></>
            )}
          </div>
          {/* detail job post */}
          <div
            className={`lg:min-w-[550px] w-full ${
              mobilePage === 'detail' ? 'flex' : 'hidden lg:flex'
            }`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacanciesLayout;
