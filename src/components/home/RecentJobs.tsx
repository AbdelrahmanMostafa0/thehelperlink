// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation } from 'next-i18next';

// react-indiana-drag-scroll
import ScrollContainer from 'react-indiana-drag-scroll';

// routes
import { ROUTES_URL } from '@src/routes';

// types
import { IJobPost } from '@src/@types/jobPost';

// components
import Typography from '@src/components/Typography';
import JobPostCard from '@src/components/global/JobPostCard';

interface IProps {
  children?: ReactNode;
  jobPosts?: IJobPost[];
}

const colors: ('orange' | 'blue' | 'green')[] = ['green', 'orange', 'blue'];

const RecentJobs: React.FC<IProps> = ({ jobPosts }) => {
  const router = useRouter();
  const { t } = useTranslation('home');

  return (
    <div className="w-full flex flex-col items-center">
      <Typography variant="caption" className="text-lightBlue-500">
        {t('vacancies')}
      </Typography>
      <Typography variant="h1">{t('recentJobs')}</Typography>
      <Typography variant="caption" className="pt-6">
        {t('AreYouAnEmployer')}{' '}
        <Link href={ROUTES_URL.navRoutes.postAJob}>
          <span className="underline font-black">{t('postAJob')}</span>
        </Link>{' '}
        {t('now')}
      </Typography>
      <ScrollContainer
        horizontal
        // vertical
        hideScrollbars
        className="scroll-container flex gap-5 w-full px-5 items-center justify-start lg:justify-center pt-16 pb-8 !overflow-y-hidden overflow-x-auto">
        {jobPosts?.map((post, index) => (
          <JobPostCard
            key={index}
            JobPostData={post}
            color={colors.filter((color, i) => i === index)[0]}
          />
        ))}
      </ScrollContainer>
    </div>
  );
};

export default RecentJobs;
