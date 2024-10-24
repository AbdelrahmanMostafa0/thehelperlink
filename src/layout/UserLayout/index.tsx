// react
import { ReactNode, useState, useMemo } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation } from 'next-i18next';

// react query
import { useQuery } from 'react-query';

/// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { useCandidateSelection } from '@src/zustand_stores/candidateSelection';
import { shallow } from 'zustand/shallow';

// routes
import { ROUTES_URL } from '@src/routes';

// types
import { IJobPost } from '@src/@types/jobPost';
import { IRouteCrumb } from '@src/components/BreadCrumb';
import { IQuiz } from '@src/@types/quiz';

// layout
import UserDropDown from '@src/layout/UserRoutesList';

// api
import { getQuestions } from '@src/api/GET/getQuestions';

// components
import Button from '@src/components/Button';
import Typography from '@src/components/Typography';
import JobPostCard from '@src/components/global/JobPostCard';
import BreadCrumb from '@src/components/BreadCrumb';
import JobPostSkeleton from '@src/components/global/skeleton/JobPostSkeleton';
import ConfirmCandidatesModal from '@src/components/user/employer-jobs/ConfimCandidatesModal';

interface IProps {
  children?: ReactNode;
  page?: 'default' | 'my-job-posts' | 'edit-my-job-posts';
  post?: IJobPost;
  routeLinks?: IRouteCrumb[];
  mobileTitle?: string;
  isLoading?: boolean;
}

const colors: ('green' | 'blue' | 'orange')[] = ['green', 'blue', 'orange'];

const UserLayout: React.FC<IProps> = ({
  children,
  page = 'default',
  post,
  routeLinks,
  mobileTitle,
  isLoading = false,
}) => {
  const router = useRouter();
  const { t } = useTranslation('user');
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const { candidatesList, setIsReadyToSend, isReadyToSend } = useCandidateSelection(
    (state) => state
  );

  const user = useUserStore((state) => state.userState, shallow);
  const HAS_ACCESS =
    user?.userType === 'helper' ? user.confirmed : user?.confirmed && user.confirmedPhoneNumber;

  const { data: quizes } = useQuery<{ results: IQuiz[] }>(
    ['questions', router.locale],
    () => getQuestions(router.locale || ''),
    { enabled: user?.userType === 'helper' }
  );

  const leftSideContainer = useMemo(() => {
    if (user?.userType === 'employer') {
      if (page === 'default') {
        return (
          <div className="flex-col gap-6 hidden lg:flex">
            <UserDropDown isDropDown={false} />
            {HAS_ACCESS && (
              <Link href={ROUTES_URL.navRoutes.postAJob}>
                <Button variant="bordered" color="blue" className="py-5 w-full">
                  <Typography variant="caption">{t('postAJob')}</Typography>
                </Button>
              </Link>
            )}
          </div>
        );
      } else if (page === 'my-job-posts') {
        return isLoading ? (
          <JobPostSkeleton />
        ) : post ? (
          <div className="flex flex-col gap-10">
            <JobPostCard
              hideCandidateButton
              postType="employer-post"
              JobPostData={post}
              color={colors[Math.floor(Math.random() * 3)]}
            />
            {post.active && (
              <Button
                disabled={isReadyToSend && candidatesList.length === 0}
                onClick={() =>
                  isReadyToSend ? setConfirmationModalOpen(true) : setIsReadyToSend(true)
                }
                variant="bordered"
                color={isReadyToSend ? 'green' : 'blue'}
                className="py-5 w-full">
                <Typography variant="caption">
                  {isReadyToSend
                    ? t('confirmCandidatesAndCloseVacancy')
                    : t('selectCandidatesForThisVacancy')}
                </Typography>
              </Button>
            )}
          </div>
        ) : null;
      } else if (page === 'edit-my-job-posts') {
        return isLoading ? (
          <JobPostSkeleton />
        ) : post ? (
          <JobPostCard
            hideCandidateButton
            postType="employer-post"
            JobPostData={post}
            color={colors[Math.floor(Math.random() * 3)]}
          />
        ) : null;
      }
    } else {
      return (
        <div className="flex-col gap-6 hidden lg:flex">
          <UserDropDown isDropDown={false} />
          {HAS_ACCESS && quizes?.results && quizes?.results.length > 0 && (
            <Link href={ROUTES_URL.navRoutes.user.quiz}>
              <Button variant="bordered" color="orange" className="py-5 w-full">
                <Typography variant="caption">{t('takeTheQuiz')}</Typography>
              </Button>
            </Link>
          )}
        </div>
      );
    }
  }, [page, post, user?.userType, t, quizes, isLoading, isReadyToSend, candidatesList]);

  return (
    <>
      <div className="w-screen overflow-x-hidden">
        <img
          src="/images/home-page-bg-2.png"
          alt="home-bg"
          className="rotate-bg-animation fixed origin-center left-0 right-0 m-auto w-[100px] h-[100px] max-w-none mt-[300px]"
        />

        <div className="w-full flex flex-col items-center lg:items-start max-w-5xl mx-auto my-16 px-5 z-10 relative">
          {page === 'edit-my-job-posts' ? (
            <Button
              loadMoreButton
              back
              className="mb-6 self-center lg:self-start"
              onClick={() => router.back()}>
              {t('back')}
            </Button>
          ) : (
            <BreadCrumb routesList={routeLinks || []} className="mb-6" />
          )}
          {mobileTitle && (
            <Typography variant="h2" className="block lg:hidden mb-5">
              {mobileTitle}
            </Typography>
          )}
          <div className="flex flex-col lg:flex-row gap-10  lg:items-start w-full">
            <div className="flex">{leftSideContainer}</div>
            <div className="w-full flex flex-col items-center lg:items-start">{children}</div>
          </div>
        </div>
      </div>
      <ConfirmCandidatesModal
        postId={post?.id || 0}
        open={confirmationModalOpen}
        setOpen={setConfirmationModalOpen}
      />
    </>
  );
};

export default UserLayout;
