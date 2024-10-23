// react
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation, Trans } from 'next-i18next';

// routes
import { ROUTES_URL } from '@src/routes';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { shallow } from 'zustand/shallow';

// utils
import { formatDateTimeParts } from '@src/utils/dateConvertor';
import { helperListTranslator } from '@src/utils/listTranslator';

// icons
import { Heart } from '@src/assets/icons';

// types
import { IJobPost } from '@src/@types/jobPost';

// api
import { favoriteJob } from '@src/api/PUT/favoriteJob';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import DetailHead from './DetailHead';
import ApplyCard from '@src/components/vacancies/ApplyCard';

interface IProps {
  children?: ReactNode;
  JobPostData?: IJobPost;
  color: 'green' | 'blue' | 'orange';
  setMaxHeightJobList: React.Dispatch<React.SetStateAction<string | number>>;
  refetchJobPosts: () => void;
}

const DetailJobPost: React.FC<IProps> = ({
  JobPostData,
  color,
  setMaxHeightJobList,
  refetchJobPosts,
}) => {
  const router = useRouter();
  const { t } = useTranslation('vacancies');

  const ContainerRef = useRef<HTMLDivElement>(null);

  const [favorite, setFavorite] = useState(false);
  const isEnglish = useMemo(() => router.locale === 'en-GB', [router.locale]);

  const user = useUserStore((state) => state.userState, shallow);
  const { changeUserState } = useUserStore((state) => state);

  const [apply, setApply] = useState(false);

  const handleFavoriteJob = (e: any) => {
    e.preventDefault();
    favoriteJob(JobPostData?.id || 0, !favorite, changeUserState).then((res) => {
      if (res?.status === 200) {
        setFavorite((prevState) => !prevState);
        refetchJobPosts();
      }
    });
  };

  useEffect(() => {
    if (ContainerRef) {
      setMaxHeightJobList(ContainerRef.current?.clientHeight || 'auto');
    }
  });

  useEffect(() => {
    if (JobPostData) {
      setFavorite(JobPostData?.isFavourite || false);
    }
  }, [JobPostData]);

  const { date: startDate, time: startTime } = formatDateTimeParts(
    JobPostData?.startingDate || '',
    router.locale || ''
  );

  return (
    <div
      ref={ContainerRef}
      className="flex flex-1 self-start w-full flex-col rounded-tl-20 rounded-tr-20 bg-white">
      {/* social media and logo */}
      <DetailHead JobPostData={JobPostData} color={color} />
      {/* main section */}
      <div className="flex flex-col relative">
        {/* right green line */}
        {/* <div
          className={`w-[7px] h-[170px] absolute top-5 ltr:right-0 ltr:left-unset rtl:left-0 rtl:right-unset rounded-full ${bgColorDark(
            color
          )}`}
        /> */}
        {/* apply button */}
        {user?.userType === 'helper' || !user ? (
          <div className="flex gap-3 mt-12 mb-5 sm:mb-0 sm:mt-4 ltr:mr-8 rtl:ml-8 self-end items-center relative">
            <span
              aria-label="favorite-unfavorite helper"
              tabIndex={0}
              role="button"
              onClick={handleFavoriteJob}
              className="cursor-pointer">
              <Heart
                className={`w-6 h-6 ${
                  favorite
                    ? '[&_path]:fill-darkOrange-500 [&_path]:stroke-darkOrange-500'
                    : '[&_path]:stroke-darkBlue-200'
                }`}
              />
            </span>
            <Button
              type="button"
              onClick={() => {
                if (!user) {
                  router.push(ROUTES_URL.authRoutes.helperRegister);
                } else {
                  setApply(true);
                }
              }}
              loadMoreButton
              color={color}
              className="">
              {t('applyNow')}
            </Button>
            <ApplyCard apply={apply} setApply={setApply} ID={JobPostData?.id} />
          </div>
        ) : (
          <div className="mt-12 mr-8" />
        )}

        {/* jop post overall detail */}
        <div className="flex flex-col gap-3 px-10 ssm:px-4">
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
          <Typography>{JobPostData?.title}</Typography>
          {/* employer location, nationality, gender, age range, years of experience, religion, number of addults, number of children, skills, languages starts */}
          {/* starting date*/}
          <div className="flex items-center gap-3">
            <Typography
              textTransform="first-letter-capital"
              variant="caption"
              className="text-darkBlue-200">
              {t('startingDate')}:
            </Typography>
            <Typography textTransform="first-letter-capital" variant="caption">
              {JobPostData?.startingDate
                ? `${startDate.day} ${startDate.month} ${startDate.year}`
                : t('notGiven')}
            </Typography>
          </div>

          {/* employer location */}
          <div className="flex items-center gap-3">
            {/* <MapPin className={`w-[18px] h-[18px] ${strokeColor(color)}`} /> */}
            <div className="flex items-center gap-3">
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
          </div>

          {/* religion */}
          <div className="flex items-center gap-3">
            {/* <Book className={`w-[18px] h-[18px] ${strokeColor(color)}`} /> */}
            <div className="flex items-center gap-3">
              <Typography
                textTransform="first-letter-capital"
                variant="caption"
                className="text-darkBlue-200">
                {t('religion')}:
              </Typography>
              <Typography textTransform="first-letter-capital" variant="caption">
                {JobPostData?.religion ? t(JobPostData.religion.toLowerCase()) : t('notGiven')}
              </Typography>
            </div>
          </div>
          {/* years of experience */}
          <div className="flex items-center gap-3">
            {/* <Coffee className={`w-[18px] h-[18px] ${strokeColor(color)}`} /> */}
            <div className="flex items-center gap-3">
              <Typography
                textTransform="first-letter-capital"
                variant="caption"
                className="text-darkBlue-200">
                {t('yearsOfExperience')}:
              </Typography>
              <Typography textTransform="first-letter-capital" variant="caption">
                {JobPostData?.yearsOfExperience ? t(JobPostData.yearsOfExperience) : t('notGiven')}
              </Typography>
            </div>
          </div>
          {/* driving license */}
          <div className="flex items-center gap-3">
            {/* <DriverLicense className={`w-[18px] h-[18px] ${strokeColor(color)}`} /> */}
            <Typography variant="caption" className="text-darkBlue-200">
              {t('drivingLicense')}:
            </Typography>
            <Typography variant="caption" textTransform="first-letter-capital">
              {JobPostData?.drivingLicense ? t('required') : t('notRequired')}
            </Typography>
          </div>

          {/* spoken languages */}
          <div className="flex items-center gap-3">
            {/* <Lang className={`w-[18px] h-[18px] ${strokeColor(color)}`} /> */}
            <div className="flex items-center gap-3">
              <Typography
                textTransform="first-letter-capital"
                variant="caption"
                className="text-darkBlue-200">
                {t('spokenLanguages')}:
              </Typography>
              <div className="flex flex-wrap gap-1">
                {JobPostData?.languages && JobPostData.languages?.length > 0 ? (
                  JobPostData.languages?.map((lang, index) => (
                    <Typography key={index} variant="caption">
                      {t(lang)}
                      {index !== (JobPostData.languages?.length || 0) - 1 && ','}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="caption">{t('notGiven')}</Typography>
                )}
              </div>
            </div>
          </div>

          {/* nationality*/}
          <div className="flex items-center gap-3">
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
          <div className="flex items-center gap-3">
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
          <div className="flex items-center gap-3">
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

          {/* number of adults */}
          <div className="flex items-center gap-3">
            <Typography
              textTransform="first-letter-capital"
              variant="caption"
              className="text-darkBlue-200">
              {t('numberOfAdults')}:
            </Typography>
            <Typography textTransform="first-letter-capital" variant="caption">
              {JobPostData?.employer?.adults ? t(JobPostData?.employer?.adults) : t('notGiven')}
            </Typography>
          </div>

          {/* number of children */}
          <div className="flex items-center gap-3">
            <Typography
              textTransform="first-letter-capital"
              variant="caption"
              className="text-darkBlue-200">
              {t('numberOfChildren')}:
            </Typography>
            <Typography textTransform="first-letter-capital" variant="caption">
              {JobPostData?.employer?.children ? t(JobPostData?.employer?.children) : t('notGiven')}
            </Typography>
          </div>
          {/* location, Aviability, salary and post type and ...  ends */}
        </div>
        {/* job description, offers, duty, application */}
        <div className="flex flex-col px-10 ssm:px-4 py-14 gap-8">
          <Typography variant="h5">{t('jobDescription')}</Typography>
          <div
            className="[&>ol]:list-decimal [&_strong]:font-heavy [&_img]:max-w-[100%] [&>ul]:list-disc [&>ul]:pl-4 [&>h1]:text-h4 md:[&>h1]:text-h4_small [&>h2]:text-h4 md:[&>h2]:text-h4_small [&>h3]:text-h4 md:[&>h3]:text-h4_small [&>h4]:text-h4 md:[&>h4]:text-h4_small [&>h5]:text-h5 md:[&>h5]:text-h5_small [&>h6]:text-h6 md:[&>h6]:text-h6_small [&>p]:text-body1"
            dangerouslySetInnerHTML={{ __html: JobPostData?.description || '' }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailJobPost;
