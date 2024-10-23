// react
import { ReactNode, useEffect, useMemo, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation } from 'next-i18next';

// routes
import { ROUTES_URL } from '@src/routes';

// icons
import { Edit, Trash, Heart } from '@src/assets/icons';

// types
import { IJobPost } from '@src/@types/jobPost';

// utils
import { textColor, bgWithOpacity } from '@src/utils/colorUtils';

// next-usequerystate
import { useQueryState } from 'next-usequerystate';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { shallow } from 'zustand/shallow';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import { helperListTranslator } from '@src/utils/listTranslator';
import { favoriteJob } from '@src/api/PUT/favoriteJob';

interface IProps {
  children?: ReactNode;
  JobPostData: IJobPost;
  color: 'green' | 'blue' | 'orange';
  postType?: 'employer-post' | 'helper-application' | 'helper-favorite-post' | 'none';
  callback?: () => void;
  onFavoriteClicked?: () => void;
  hideCandidateButton?: boolean;
  applicationId?: number;
}

const JobPostCard: React.FC<IProps> = ({
  JobPostData,
  color,
  postType = 'none',
  callback,
  onFavoriteClicked,
  hideCandidateButton,
  applicationId,
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const [favorite, setFavorite] = useState(false);
  const [currentJobId, setCurrentJobId] = useQueryState('currentJobId');
  const isEnglish = useMemo(() => router.locale === 'en-GB', [router.locale]);

  const user = useUserStore((state) => state.userState, shallow);
  const { changeUserState } = useUserStore((state) => state);

  const handleFavoriteJob = (e: any) => {
    e.preventDefault();
    favoriteJob(JobPostData?.id || 0, !favorite, changeUserState).then((res) => {
      if (res?.status === 200) {
        setFavorite((prevState) => !prevState);
        onFavoriteClicked && onFavoriteClicked();
      }
    });
  };

  useEffect(() => {
    if (JobPostData) {
      setFavorite(JobPostData?.isFavourite || false);
    }
  }, [JobPostData]);

  // const isNew = new Date(JobPostData?.publishedAt).getDay() === new Date().getDay();
  const startDate = new Date(JobPostData?.startingDate);
  const today = new Date();
  const isOpen = startDate.getTime() > today.getTime();

  const isSelected = +currentJobId! === JobPostData.id;

  return (
    <div
      className={`w-full sxs:min-w-[300px] min-w-[340px] md:min-w-[412px] max-w-[412px] flex flex-col gap-4 p-9 ssm:px-4 ${
        isSelected ? bgWithOpacity(color) : 'bg-white'
      }  rounded-20 shadow-none hover:shadow-custom-shadow transition-all ease-in duration-300 relative`}>
      {/* post date  */}
      <div className="flex items-center justify-between gap-2">
        {/* <Typography variant="caption" className={`${textColor(color)}`}>
          {isNew ? 'New - ' : 'Post date: '}
          {DateTime.fromJSDate(new Date(JobPostData?.publishedAt)).toFormat('yyyy.MM.dd')}
        </Typography> */}
        <Typography variant="caption" fontweight="medium" className={`${textColor(color)}`}>
          {JobPostData.active ? t('open') : t('closed')}
        </Typography>

        {/* icons: heart for favorite, delete and edit icons  */}
        <div className="flex items-center gap-5">
          {(postType === 'helper-favorite-post' ||
            (user?.userType === 'helper' && postType !== 'helper-application')) && (
            <span onClick={handleFavoriteJob} className="cursor-pointer">
              <Heart
                className={`ssm:w-4 w-6 ssm:h-4 h-6 ${
                  favorite
                    ? '[&_path]:fill-darkOrange-500 [&_path]:stroke-none'
                    : '[&_path]:stroke-darkBlue-200'
                } transition-all duration-300 ease-in [&_path]:stroke-[0.5] sm:[&_path]:stroke-1`}
              />
            </span>
          )}
          {(postType === 'employer-post' || postType === 'helper-application') && (
            <Link
              href={
                postType === 'employer-post'
                  ? `${ROUTES_URL.navRoutes.user.jobPosts.main}/${JobPostData.id}${ROUTES_URL.navRoutes.user.jobPosts.removeJobPost}`
                  : `${ROUTES_URL.navRoutes.user.applications.main}/${applicationId}${ROUTES_URL.navRoutes.user.applications.removeApplication}`
              }>
              <span className="cursor-pointer">
                <Trash className="w-8 sm:w-[19px] h-8 sm:h-[19px] [&_path]:stroke-[0.5] sm:[&_path]:stroke-1 [&_path]:stroke-darkOrange-500" />
              </span>
            </Link>
          )}
          {postType === 'employer-post' && (
            <Link href={`${ROUTES_URL.navRoutes.user.jobPosts.main}/${JobPostData.id}`}>
              <span className="cursor-pointer">
                <Edit className="w-8 sm:w-[19px] h-8 sm:h-[19px] [&_path]:stroke-[0.5] sm:[&_path]:stroke-1 [&_path]:stroke-lightBlue-500" />
              </span>
            </Link>
          )}
        </div>
      </div>
      {/* job types */}
      {JobPostData?.jobType && JobPostData?.jobType.length > 0 && (
        <div className="flex items-center flex-wrap gap-1">
          {helperListTranslator(router.locale || '', JobPostData?.jobType || [])?.map(
            (skill, index) => (
              <Typography key={index} fontweight="medium">
                {skill.name}
                {index !== JobPostData?.jobType.length - 1 && ', '}
              </Typography>
            )
          )}
        </div>
      )}
      {/* job title & description */}
      <Typography variant="caption" fontweight="medium">
        {JobPostData?.title}
      </Typography>
      {/* employer location, nationality, gender, age range, years of experience, religion, number of addults, number of children, skills, languages starts */}
      {/* employer location*/}
      <div className="flex items-center gap-3 flex-wrap">
        <Typography
          textTransform="first-letter-capital"
          variant="caption"
          className="text-darkBlue-200">
          {t('employerLocation')}:
        </Typography>
        <Typography textTransform="first-letter-capital" variant="caption">
          {JobPostData?.employer?.location?.region?.name &&
          JobPostData?.employer?.location?.city?.name
            ? isEnglish
              ? `${JobPostData?.employer?.location?.region?.name}, ${JobPostData?.employer?.location?.city?.name}`
              : `${
                  JobPostData?.employer?.location?.region?.localizations?.find(
                    (localization) => localization.locale === router.locale
                  )?.name
                }, ${
                  JobPostData?.employer?.location?.city?.localizations?.find(
                    (localization) => localization.locale === router.locale
                  )?.name
                }`
            : t('notGiven')}
        </Typography>
      </div>

      {/* nationality*/}
      <div className="flex items-center gap-3 flex-wrap">
        <Typography
          textTransform="first-letter-capital"
          variant="caption"
          className="text-darkBlue-200">
          {t('nationality')}:
        </Typography>
        <Typography textTransform="first-letter-capital" variant="caption">
          {JobPostData?.nationality?.name
            ? isEnglish
              ? JobPostData?.nationality?.name
              : JobPostData?.nationality?.localizations.find(
                  (localization) => localization.locale === router.locale
                )?.name
            : t('notGiven')}
        </Typography>
      </div>

      {/* gender*/}
      <div className="flex items-center gap-3 flex-wrap">
        <Typography
          textTransform="first-letter-capital"
          variant="caption"
          className="text-darkBlue-200">
          {t('gender')}:
        </Typography>
        <Typography textTransform="first-letter-capital" variant="caption">
          {JobPostData?.gender ? t(JobPostData?.gender.toLowerCase()) : t('notGiven')}
        </Typography>
      </div>

      {/* age range*/}
      <div className="flex items-center gap-3 flex-wrap">
        <Typography
          textTransform="first-letter-capital"
          variant="caption"
          className="text-darkBlue-200">
          {t('ageRange')}:
        </Typography>
        <Typography textTransform="first-letter-capital" variant="caption">
          {JobPostData?.minAge && JobPostData.maxAge
            ? isEnglish
              ? `${JobPostData?.minAge} - ${JobPostData?.maxAge}`
              : `${JobPostData?.minAge.toLocaleString(
                  router.locale
                )} - ${JobPostData?.maxAge.toLocaleString(router.locale)}`
            : t('notGiven')}
        </Typography>
      </div>

      {/* years of experience */}
      <div className="flex items-center gap-3 flex-wrap">
        <Typography
          textTransform="first-letter-capital"
          variant="caption"
          className="text-darkBlue-200">
          {t('yearsOfExperience')}:
        </Typography>
        <Typography textTransform="first-letter-capital" variant="caption">
          {JobPostData.yearsOfExperience ? t(JobPostData.yearsOfExperience) : t('notGiven')}
        </Typography>
      </div>

      {/* religion */}
      <div className="flex items-center gap-3 flex-wrap">
        <Typography
          textTransform="first-letter-capital"
          variant="caption"
          className="text-darkBlue-200">
          {t('religion')}:
        </Typography>
        <Typography textTransform="first-letter-capital" variant="caption">
          {JobPostData.religion ? t(JobPostData.religion.toLowerCase()) : t('notGiven')}
        </Typography>
      </div>

      {/* number of adults */}
      <div className="flex items-center gap-3 flex-wrap">
        <Typography
          textTransform="first-letter-capital"
          variant="caption"
          className="text-darkBlue-200">
          {t('numberOfAdults')}:
        </Typography>
        <Typography textTransform="first-letter-capital" variant="caption">
          {JobPostData.employer?.adults ? t(JobPostData.employer?.adults) : t('notGiven')}
        </Typography>
      </div>

      {/* number of children */}
      <div className="flex items-center gap-3 flex-wrap">
        <Typography
          textTransform="first-letter-capital"
          variant="caption"
          className="text-darkBlue-200">
          {t('numberOfChildren')}:
        </Typography>
        <Typography textTransform="first-letter-capital" variant="caption">
          {JobPostData.employer?.children ? t(JobPostData.employer?.children) : t('notGiven')}
        </Typography>
      </div>

      {/* languages */}
      <div className="flex items-center gap-3 flex-wrap">
        <Typography
          textTransform="first-letter-capital"
          variant="caption"
          className="text-darkBlue-200">
          {t('spokenLanguages')}:
        </Typography>
        <div className="flex flex-wrap gap-1">
          {JobPostData.languages && JobPostData.languages?.length > 0 ? (
            JobPostData.languages?.map((lang, index) => (
              <Typography variant="caption" key={index}>
                {t(lang)}
                {index !== (JobPostData.languages?.length || 0) - 1 && ','}
              </Typography>
            ))
          ) : (
            <Typography variant="caption">{t('notGiven')}</Typography>
          )}
        </div>
      </div>
      {/* employer location, nationality, gender, age range, years of experience, religion, number of addults, number of children, skills, languages ends */}

      {postType === 'employer-post' ? (
        hideCandidateButton ? null : (
          <Link
            href={`${ROUTES_URL.navRoutes.user.jobPosts.main}/${JobPostData.id}/candidates`}
            onClick={(e) =>
              (JobPostData.applicants?.count === 0 || !JobPostData.applicants) && e.preventDefault()
            }>
            <Button
              color={color}
              className="sm:absolute -bottom-[26px] ltr:right-[22px] ltr:left-unset rtl:left-[22px] rtl:right-unset">
              <Typography variant="caption">
                {/* {t('seeCandidates', { number: 0 })} */}
                {JobPostData.applicants?.count
                  ? t('seeCandidates', { number: JobPostData.applicants?.count || 0 })
                  : t('noCandidates')}
              </Typography>
            </Button>
          </Link>
        )
      ) : (
        <Link
          href={{
            pathname: `${ROUTES_URL.navRoutes.vacancies}`,
            query: { ...router.query, currentJobId: JobPostData.id },
          }}
          scroll
          shallow={router.pathname.includes(ROUTES_URL.navRoutes.vacancies) ? true : false}
          onClick={(e) => {
            if (isSelected) {
              e.preventDefault();
              if (callback) callback();
            }
          }}>
          <Button
            color={color}
            loadMoreButton
            className="sm:absolute -bottom-[26px] ltr:right-[22px] ltr:left-unset rtl:left-[22px] rtl:right-unset">
            <Typography variant="caption">{t('readMore')}</Typography>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default JobPostCard;
