// react
import React, { ReactNode, useEffect, useState, useRef, useMemo } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { shallow } from 'zustand/shallow';

// icons
import { Heart } from '@src/assets/icons';

// utils
import { notify } from '@src/utils/notify';
import { helperListTranslator } from '@src/utils/listTranslator';
import { formatDateTimeParts } from '@src/utils/dateConvertor';

// types
import { IHelper } from '@src/@types/helper';

// hooks
import useMediaQuery from '@src/hooks/useMediaQuery';

// api
import { favoriteHelper } from '@src/api/PUT/favoriteHelper';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import DetailHead from './DetailHead';
import ApplyCard from '../vacancies/ApplyCard';

interface IProps {
  children?: ReactNode;
  userData?: IHelper;
  color: 'green' | 'blue' | 'orange';
  setMaxHeightHelpersList: React.Dispatch<React.SetStateAction<string | number>>;
  refetchHelpers: () => void;
}

const DetailHelper: React.FC<IProps> = ({
  userData,
  color,
  setMaxHeightHelpersList,
  refetchHelpers,
}) => {
  const router = useRouter();
  const { t } = useTranslation('helpers');

  const ContainerRef = useRef<HTMLDivElement>(null);
  const isEnglish = useMemo(() => router.locale === 'en-GB', [router.locale]);

  const windowWidth = useMediaQuery();

  const user = useUserStore((state) => state.userState, shallow);
  const { changeUserState } = useUserStore((state) => state);

  const [favorite, setFavorite] = useState<boolean>(false);

  const handleFavoriteHelper = (e: any) => {
    e.preventDefault();
    favoriteHelper(userData?.id || 0, !favorite, changeUserState).then((res) => {
      if (res?.status === 200) {
        setFavorite((prevState) => !prevState);
        refetchHelpers();
      }
    });
  };

  const [apply, setApply] = useState(false);

  useEffect(() => {
    if (ContainerRef && windowWidth > 1024) {
      setMaxHeightHelpersList(ContainerRef.current?.clientHeight || 'auto');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ContainerRef, windowWidth]);

  // useEffect(() => {
  //   if (ContainerRef.current)
  //     ContainerRef.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'nearest',
  //       inline: 'nearest',
  //     });
  // }, [userData]);

  useEffect(() => {
    if (userData) {
      setFavorite(userData?.isFavourite || false);
    }
  }, [userData]);

  const helperAge = new Date().getFullYear() - new Date(userData?.dateOfBirth || '').getFullYear();

  const { date: memberDate } = formatDateTimeParts(userData?.createdAt || '', router.locale || '');

  return (
    <div
      ref={ContainerRef}
      className="flex flex-1 flex-col self-start rounded-tl-[20px] rounded-tr-[20px] overflow-hidden bg-white">
      {/* social media and logo */}
      <DetailHead userData={userData} />
      {/* main section */}
      <div className="flex flex-col relative">
        {/* right green line */}
        {/* <div
          className={`w-[7px] h-[170px] absolute top-5 right-0 rounded-full bg-lightGreen-500`}
        /> */}
        {/* apply button */}
        {user?.userType === 'employer' || !user ? (
          <div className="flex gap-3 mt-12 mb-5 sm:mb-0 sm:mt-4 ltr:mr-8 rtl:ml-8 self-end items-center relative">
            <span
              aria-label="favorite-unfavorite helper"
              tabIndex={0}
              role="button"
              onClick={handleFavoriteHelper}
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
              onClick={() => {
                if (!user) {
                  // router.push(ROUTES_URL.authRoutes.employerRegister);
                  notify({ message: t('employerRegisterComingSoon'), router, type: 'info' });
                } else {
                  setApply(true);
                }
              }}
              loadMoreButton
              color={color}
              className="">
              {t('requestDetails')}
            </Button>
            <ApplyCard
              apply={apply}
              setApply={setApply}
              ID={userData?.id}
              applyFor="helper"
              helperInfo={{
                firstName: userData?.firstName || '',
                lastName: userData?.lastName || '',
              }}
            />
          </div>
        ) : (
          <div className="mt-12 mr-8" />
        )}
        {/* user overall detail */}
        <div className="flex flex-col gap-3 px-10">
          {/* member date */}
          <Typography variant="caption" className="text-darkBlue-400">
            {t('memberSince')}, {memberDate.day + ' ' + memberDate.month + ' ' + memberDate.year}
          </Typography>
          {/* user full name */}
          <Typography>
            {userData?.firstName} {userData?.lastName}
          </Typography>
          {/* user description */}
          <Typography variant="caption" className="text-darkBlue-400">
            {userData?.bio}
          </Typography>
          {/* blur section */}
          <div className={`flex flex-col gap-3 ${!user?.email ? 'blur-sm' : ''}`}>
            {/* nationality, religion, country, city, age, gender, years of experience starts */}

            {/* nationality */}
            <div className="flex items-center gap-3">
              {/* <MapPin className={`w-[18px] h-[18px] [&_path]:stroke-lightGreen-500`} /> */}
              <Typography variant="caption" className="text-darkBlue-200">
                {t('nationality')}:
              </Typography>
              <Typography variant="caption" textTransform="first-letter-capital">
                {(isEnglish
                  ? userData?.nationality?.name
                  : userData?.nationality?.localizations.find(
                      (localization) => localization.locale === router.locale
                    )?.name) || `${t('notGiven')}`}
              </Typography>
            </div>

            {/* religion */}
            <div className="flex items-center gap-3">
              {/* <MapPin className={`w-[18px] h-[18px] [&_path]:stroke-lightGreen-500`} /> */}
              <Typography variant="caption" className="text-darkBlue-200">
                {t('religion')}:
              </Typography>
              <Typography variant="caption" textTransform="first-letter-capital">
                {t(userData?.religion?.toLowerCase() || '') || `${t('notGiven')}`}
              </Typography>
            </div>

            {/* country */}
            <div className="flex items-center gap-3">
              {/* <MapPin className={`w-[18px] h-[18px] [&_path]:stroke-lightGreen-500`} /> */}
              <Typography variant="caption" className="text-darkBlue-200">
                {t('country')}:
              </Typography>
              <Typography variant="caption" textTransform="first-letter-capital">
                {(isEnglish
                  ? userData?.location?.country?.name
                  : userData?.location?.country?.localizations?.find(
                      (localization) => localization.locale === router.locale
                    )?.name) || `${t('notGiven')}`}
              </Typography>
            </div>

            {/* city */}
            <div className="flex items-center gap-3">
              {/* <MapPin className={`w-[18px] h-[18px] [&_path]:stroke-lightGreen-500`} /> */}
              <Typography variant="caption" className="text-darkBlue-200">
                {t('city')}:
              </Typography>
              <Typography variant="caption" textTransform="first-letter-capital">
                {(isEnglish
                  ? userData?.location?.city?.name
                  : userData?.location?.city?.localizations?.find(
                      (localization) => localization.locale === router.locale
                    )?.name) || `${t('notGiven')}`}
              </Typography>
            </div>

            {/* age */}
            <div className="flex items-center gap-3">
              {/* <MapPin className={`w-[18px] h-[18px] [&_path]:stroke-lightGreen-500`} /> */}
              <Typography variant="caption" className="text-darkBlue-200">
                {t('age')}:
              </Typography>
              <Typography variant="caption" textTransform="first-letter-capital">
                {userData?.dateOfBirth
                  ? helperAge.toLocaleString(router.locale)
                  : `${t('notGiven')}`}
              </Typography>
            </div>

            {/* gender */}
            <div className="flex items-center gap-3">
              {/* <MapPin className={`w-[18px] h-[18px] [&_path]:stroke-lightGreen-500`} /> */}
              <Typography variant="caption" className="text-darkBlue-200">
                {t('gender')}:
              </Typography>
              <Typography variant="caption" textTransform="first-letter-capital">
                {t(userData?.gender?.toLowerCase() || '') || `${t('notGiven')}`}
              </Typography>
            </div>

            {/* year of experience */}
            <div className="flex items-center gap-3">
              {/* <MapPin className={`w-[18px] h-[18px] [&_path]:stroke-lightGreen-500`} /> */}
              <Typography variant="caption" className="text-darkBlue-200">
                {t('yearsOfExperience')}:
              </Typography>
              <Typography variant="caption" textTransform="first-letter-capital">
                {userData?.yearsOfExperience?.toLowerCase() || `${t('notGiven')}`}
              </Typography>
            </div>
            {/* nationality, religion, country, city, age, gender, years of experience ends */}

            {/* bio, languages, skills, other skills starts */}
            <div className="flex flex-col py-14 gap-8">
              <Typography variant="h6">{t('myBio')}</Typography>
              {/* <Typography variant="caption">{userData?.helper?.introduction}</Typography> */}
              <Typography textTransform="first-letter-capital" variant="caption">
                {userData?.bio || `${t('notGiven')}`}{' '}
              </Typography>

              {/* languages */}
              <div className="flex flex-col gap-2">
                <Typography variant="h6">{t('spokenLanguages')}</Typography>
                {userData?.languages && userData?.languages.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {userData.languages.map((lang, index) => (
                      <li key={index}>
                        <Typography variant="caption">{t(lang)}</Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="caption" textTransform="first-letter-capital">
                    {t('notGiven')}{' '}
                  </Typography>
                )}
              </div>

              {/* main skills */}
              <div className="flex flex-col gap-2">
                <Typography variant="h6">{t('mainSkills')}</Typography>
                {userData?.jobType && userData?.jobType.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {helperListTranslator(router.locale || '', userData?.jobType)?.map(
                      (skill, index) => (
                        <li key={index}>
                          <Typography variant="caption">{skill.name}</Typography>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <Typography variant="caption" textTransform="first-letter-capital">
                    {t('notGiven')}{' '}
                  </Typography>
                )}
              </div>

              {/* other skills */}
              <div className="flex flex-col gap-2">
                <Typography variant="h6">{t('otherSkills')}</Typography>
                {userData?.skills && userData?.skills.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {helperListTranslator(router.locale || '', userData?.skills)?.map(
                      (otherSkill, index) => (
                        <li key={index}>
                          <Typography variant="caption">{otherSkill.name}</Typography>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <Typography variant="caption" textTransform="first-letter-capital">
                    {t('notGiven')}{' '}
                  </Typography>
                )}
              </div>
            </div>
            {/* bio, languages, skills, other skills ends */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DetailHelper);
