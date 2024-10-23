// react
import { ReactNode, useEffect, useMemo, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

// routes
import { ROUTES_URL } from '@src/routes';

// icons
import { BulbMessage, Calendar, Check, Heart } from '@src/assets/icons';

// types

// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { shallow } from 'zustand/shallow';

// types
import { IHelper } from '@src/@types/helper';

// api
import { favoriteHelper } from '@src/api/PUT/favoriteHelper';

// utils
import { useCandidateSelection } from '@src/zustand_stores/candidateSelection';
import { helperListTranslator } from '@src/utils/listTranslator';

// components
import Typography from '@src/components/Typography';

interface IProps {
  children?: ReactNode;
  userData?: IHelper;
  callback?: () => void;
  onFavoriteClicked?: () => void;
  isCandidate?: boolean;
  applicationId?: number;
}

const HelperCard: React.FC<IProps> = ({
  userData,
  callback,
  onFavoriteClicked,
  isCandidate,
  applicationId,
}) => {
  const router = useRouter();
  const { t } = useTranslation('helpers');
  const isEnglish = useMemo(() => router.locale === 'en-GB', [router.locale]);
  const [favorite, setFavorite] = useState<boolean>(false);

  const { candidatesList, changeCandidatesList, isReadyToSend } = useCandidateSelection(
    (state) => state
  );

  const user = useUserStore((state) => state.userState, shallow);
  const { changeUserState } = useUserStore((state) => state);

  const handleFavoriteHelper = (e: any) => {
    e.preventDefault();
    favoriteHelper(userData?.id || 0, !favorite, changeUserState).then((res) => {
      if (res?.status === 200) {
        setFavorite((prevState) => !prevState);
        onFavoriteClicked && onFavoriteClicked();
      }
    });
  };

  useEffect(() => {
    if (userData) {
      setFavorite(userData?.isFavourite || false);
    }
  }, [userData]);

  const selected = +router.query['currentHelperId']! === userData?.id;

  const handleChangeCandidateList = (e: any) => {
    e.preventDefault();
    if (candidatesList.includes(applicationId || 0)) {
      changeCandidatesList(candidatesList.filter((id) => id !== applicationId));
    } else {
      changeCandidatesList([...candidatesList, applicationId || 0]);
    }
  };

  const isChosen = candidatesList.includes(applicationId || 0);

  return (
    <Link
      href={{
        pathname: `${ROUTES_URL.navRoutes.helpers}`,
        query: { ...router.query, currentHelperId: userData?.id },
      }}
      shallow
      scroll
      onClick={(e) => {
        if (isReadyToSend) {
          e.preventDefault();
          handleChangeCandidateList(e);
        }
        if (selected) {
          e.preventDefault();
          if (callback) callback();
        }
      }}>
      <div
        className={`w-full flex flex-col px-5 py-3 pb-0 gap-2 ${
          selected ? 'bg-hleperBackground' : ''
        } hover:bg-inherit md:hover:bg-hleperBackground transition-all ease-in rounded-20 hover:border-b hover:md:rounded-bl-[4px] hover:md:rounded-br-[4px] md:rounded-tl-none md:rounded-tr-none shadow-custom-shadow hover:md:shadow-custom-light-shadow md:shadow-none group`}>
        {/* name and image, like function */}
        <div className="flex items-center justify-between">
          {/* name, image */}
          <div className="flex items-center gap-3">
            <Image
              src={userData?.profileImage?.url || '/images/user-avatar.png'}
              alt={userData?.firstName || ''}
              width={32}
              height={32}
              style={{ objectPosition: 'center center' }}
              className="rounded-full h-[32px] object-cover"
            />
            <Typography variant="caption">
              {userData?.firstName} {userData?.lastName}
            </Typography>
            <Typography className="!text-[12px] leading-[150%] text-darkBlue-200 flex items-center gap-2">
              <span className="min-w-[5px] min-h-[5px] rounded-full bg-darkBlue-200" />{' '}
              {/* replace english name if locale is not en-GB */}
              {isEnglish
                ? userData?.nationality?.name
                : userData?.nationality?.localizations.find(
                    (localization) => localization.locale === router.locale
                  )?.name}
            </Typography>
          </div>
          {user?.userType === 'employer' && (
            <div className="flex items-center gap-2">
              {!isCandidate && (
                <span
                  aria-label="favorite-unfavorite helper"
                  tabIndex={0}
                  role="button"
                  onClick={handleFavoriteHelper}
                  className="p-2">
                  <Heart
                    className={`ssm:w-4 w-6 ssm:h-4 h-6 ${
                      favorite
                        ? '[&_path]:fill-darkOrange-500 [&_path]:stroke-darkOrange-500'
                        : '[&_path]:stroke-darkBlue-200'
                      // group-hover:opacity-100 opacity-100 md:opacity-0
                    } transition-all duration-300 ease-in [&_path]:stroke-[0.5] sm:[&_path]:stroke-1`}
                  />
                </span>
              )}
              {isCandidate && (
                <>
                  <span
                    aria-label="send message to helper"
                    tabIndex={0}
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push({
                        pathname: ROUTES_URL.navRoutes.user.myInbox,
                        query: {
                          username: userData?.chatengineUsername,
                        },
                      });
                    }}
                    className="p-2 text-black">
                    <BulbMessage className={`w-4  h-3`} />
                  </span>
                  <span
                    aria-label="set appointment with helper"
                    tabIndex={0}
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(
                        `${ROUTES_URL.navRoutes.user.myCalendar}?helperId=${userData?.id}`
                      );
                    }}
                    className="p-2 text-black">
                    <Calendar className={`w-4  h-4 [&_path]:stroke-black`} />
                  </span>
                </>
              )}
            </div>
          )}
        </div>
        {userData?.jobType && (
          <Typography fontweight="black">
            {helperListTranslator(router.locale || '', userData?.jobType)?.map((job, index) => {
              return `${job.name}${userData?.jobType?.length - 1 !== index ? ', ' : ''}`;
            })}
          </Typography>
        )}
        <div className="w-full flex">
          <Typography variant="caption" className="pb-3 flex-1">
            {userData?.bio}
          </Typography>
          <span
            // onClick={handleChangeCandidateList}
            className={`border border-darkBlue-100 rounded-full py-[11px] px-[10px] ssm:mb-2 flex items-center justify-center transition-all duration-300 ease-in-out ${
              isReadyToSend ? 'opacity-100 visible' : 'invisible opacity-0'
            } ${
              isChosen
                ? 'border-transparent bg-lightGreen-500 text-white'
                : 'border-darkBlue-100 bg-transparent text-transparent'
            }`}
            role="radio"
            tabIndex={0}
            aria-label="select-helper">
            <Check className="" />
          </span>
        </div>
        <hr className="border-darkBlue-100 group-hover:opacity-0 opacity-100 transition-all ease-in hidden md:block" />
      </div>
    </Link>
  );
};

export default HelperCard;
