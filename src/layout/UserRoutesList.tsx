// react
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation } from 'next-i18next';

// js-cookie
import Cookies from 'js-cookie';

// zustand store
import { shallow } from 'zustand/shallow';
import { useUserStore } from '@src/zustand_stores/user';
import { useNotification } from '@src/zustand_stores/notification';

// react-query
import { useQuery } from 'react-query';

// routes
import { ROUTES_URL, employerProfileLinks, helperProfileLinks } from '@src/routes';

// icons
import { Close } from '@src/assets/icons';

// api
import { uploadAvatar } from '@src/api/POST/uploadAvatar';
import { deleteAvatar } from '@src/api/PUT/deleteAvatar';
import { getMyProfile } from '@src/api/GET/getMyProfile';
import { getNotifications } from '@src/api/GET/getNotifications';

// utils
import { e2a, fixNumbers } from '@src/utils/REGEX';

// types
import { INotification } from '@src/@types/notification';

// components
import Typography from '@src/components/Typography';
import Upload from '@src/components/Upload';

interface IProps {
  children?: ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isDropDown?: boolean;
  callBack?: () => void;
}

const UserRoutesList: React.FC<IProps> = ({
  open = true,
  setOpen,
  isDropDown = true,
  callBack,
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  // user avatar states
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [avatarLoading, setAvatarLoading] = useState<boolean>(false);

  const user = useUserStore((state) => state.userState, shallow);
  const { setShouldUpdate, shouldUpdate } = useNotification((state) => state);
  const changeUserState = useUserStore((state) => state.changeUserState);
  const logoutUser = useUserStore((state) => state.logoutUser, shallow);
  const isAdmin = user?.email == 'elrefai99@gmail.com';
  const HAS_ACCESS = isAdmin
    ? true
    : user?.userType === 'helper'
    ? user.confirmed
    : user?.confirmed && user.confirmedPhoneNumber;

  const isHelper = user?.userType === 'helper' && !isAdmin;

  const isArabic = router.locale === 'ar-SA';

  const sameRoute = (route: string) => router.pathname.includes(route);

  const { data: userData } = useQuery(['get-my-profile'], () =>
    getMyProfile(undefined, router.locale)
  );

  // fetch notifications
  const { data: notifications, refetch: refetchNotifications } = useQuery<{
    results: INotification[];
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }>(['all-notifications', user?.userType], () => getNotifications({ infinite: true }), {});

  const unseenNotifsCount = notifications?.results?.filter(
    (notif) => notif.unseen === true
  )?.length;

  const uploadUserImage = async () => {
    setAvatarLoading(true);
    await uploadAvatar(userAvatar, user, router, t, changeUserState)
      .then(() => {
        setAvatarLoading(false);
      })
      .catch(() => {
        setAvatarLoading(false);
      });
  };

  const handleDeleteAvatar = async () => {
    {
      setAvatarLoading(true);
      await deleteAvatar(router, t, changeUserState)
        .then(() => {
          setAvatarLoading(false);
        })
        .catch(() => {
          setAvatarLoading(false);
        });
    }
  };

  useEffect(() => {
    if (userData) {
      changeUserState(userData);
    }
  }, [userData]);

  useLayoutEffect(() => {
    if (isDropDown) {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open, isDropDown]);

  const handleCloseContainer = () => {
    if (callBack) {
      callBack();
    }
    if (isDropDown && setOpen) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (userAvatar) {
      uploadUserImage();
    }
  }, [userAvatar]);

  useEffect(() => {
    if (shouldUpdate) {
      refetchNotifications();
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);

  return (
    <div
      className={`bg-white rounded-20 py-5 flex flex-col w-full ssm:min-w-[auto] min-w-[360px] max-w-[360px] mx-auto transition-all ease-in self-start ${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
      } ${
        isDropDown
          ? 'absolute top-[80px] ltr:right-0 ltr:left-unset rtl:left-0 rtl:right-unset shadow-custom-shadow max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hidden'
          : ''
      }`}>
      {isDropDown && (
        <span onClick={handleCloseContainer} className="self-end cursor-pointer px-5">
          <Close className="w-[35px] h-[35px]" />
        </span>
      )}

      {/* user image, name, phone & email */}
      <div className="flex gap-5 px-5">
        <Upload
          file={userAvatar}
          variant="image"
          loading={avatarLoading}
          userImage={
            (isHelper ? user?.helper?.profileImage?.url : user?.employer?.profileImage?.url) ||
            undefined
          }
          onChange={(e) => setUserAvatar(e.target.files![0])}
          onDelete={handleDeleteAvatar}
          disable={avatarLoading}
        />
        <div className="flex flex-col gap-2">
          <Typography
            fontweight="book"
            textTransform="first-letter-capital"
            className="w-[213px] overflow-hidden whitespace-nowrap text-ellipsis">
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <Typography
            variant="caption"
            className="w-[213px] overflow-hidden whitespace-nowrap text-ellipsis">
            {isArabic
              ? // ? `${e2a(user?.phoneNumber || '').replace('+', '')}+`
                `${fixNumbers(user?.phoneNumber || '').replace('+', '')}+`
              : fixNumbers(user?.phoneNumber || '')}
          </Typography>
          <Typography className="!text-[12px] !leading-[20px] w-[213px] overflow-hidden whitespace-nowrap text-ellipsis">
            {user?.email}
          </Typography>
        </div>
      </div>
      <hr className="border-darkBlue-100 mt-5 mb-6 mx-5" />
      {/* profile lists */}
      <ul className="flex flex-col">
        {(isHelper ? helperProfileLinks : employerProfileLinks)
          .filter((el) => (HAS_ACCESS ? el : el.url === '/user/profile'))
          .map((route, index) => (
            <Link href={route.url} key={index} onClick={handleCloseContainer}>
              <li
                className={`px-5 flex items-center gap-5 transition-all hover:bg-darkOrange-100/40 py-2 ${
                  sameRoute(route.url) ? 'bg-darkBlue-100/20' : ''
                }`}>
                {route.icon ? (
                  <span className="rounded-full p-2 bg-darkBlue-100 text-darkBlue-500">
                    <route.icon className="w-5 h-5" />
                  </span>
                ) : (
                  <span className="w-9 h-9" />
                )}
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center justify-between w-full">
                    <Typography variant="body2">{t(route.name)}</Typography>
                    {route.name === 'myNotifications' &&
                    unseenNotifsCount &&
                    unseenNotifsCount > 0 ? (
                      <div className="p-1 bg-lightGreen-500 rounded-full min-w-[26px] min-h-[26px] flex items-center justify-center">
                        <Typography variant="caption" className="text-white">
                          {unseenNotifsCount.toLocaleString(router.locale)}
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                  {route.url === '/user/profile' && user?.userType === 'helper' && (
                    <Typography variant="caption" className="text-darkOrange-500" fontweight="book">
                      {t('yourScoreIs')} {(user?.helper?.score || 0) * 100}%
                    </Typography>
                  )}
                </div>
              </li>
            </Link>
          ))}
      </ul>
      <div className="flex-1 flex justify-end items-end">
        <span
          onClick={() => {
            router.push(ROUTES_URL.navRoutes.home).then((_) => {
              logoutUser();
              Cookies.remove('token');
              handleCloseContainer();
            });
          }}
          className="cursor-pointer mt-5 py-2 px-5">
          <Typography variant="caption" fontweight="heavy">
            {t('logout')}
          </Typography>
        </span>
      </div>
    </div>
  );
};

export default UserRoutesList;
