// react
import { ReactNode, useEffect, useRef, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation } from 'next-i18next';

// yup & react-user-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// routes
import { ROUTES_URL } from '@src/routes';

// utils
import { applicationDescriptionSchema } from '@src/utils/schema';

// api
import { postApplication } from '@src/api/POST/postApplication';
import { requestHelperDetail } from '@src/api/POST/requestHelperDetail';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import TextField from '../TextField';
import { useUserStore } from '@src/zustand_stores/user';
import { CreateUserChat } from '@src/api/POST/createChatEnigneUser';
import { getMyProfile } from '@src/api/GET/getMyProfile';
import { useQuery } from 'react-query';
import { IUser } from '@src/@types/user';
import Spinner from '../Spinner';

interface IProps {
  children?: ReactNode;
  setApply: React.Dispatch<React.SetStateAction<boolean>>;
  apply: boolean;
  ID?: number;
  applyFor?: 'job' | 'helper';
  helperInfo?: {
    firstName: string;
    lastName: string;
  };
}

export interface IFormInputs {
  description: string;
}

const schema = yup
  .object({
    description: applicationDescriptionSchema,
  })
  .required();

const ApplyCard: React.FC<IProps> = ({ setApply, apply, ID, applyFor = 'job', helperInfo }) => {
  const router = useRouter();
  const { t } = useTranslation('vacancies') as any;
  const { t: helperT } = useTranslation('helpers');
  const ApplyCardRef = useRef<HTMLDivElement>(null);
  const { userState: user, changeUserState } = useUserStore((state) => state);
  const [shouldUpdateUserData, setShouldUpdateUserData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: userData } = useQuery(
    ['get-my-profile'],
    () => getMyProfile(undefined, router.locale),
    { enabled: shouldUpdateUserData }
  );

  const profileNotCompleted = user?.helper?.score !== 1;

  useEffect(() => {
    if (shouldUpdateUserData && userData) {
      changeUserState(userData as IUser);
      setShouldUpdateUserData(false);
      router.push(`${ROUTES_URL.navRoutes.vacancies}/thank-you`);
    }
  }, [shouldUpdateUserData, userData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      description: '',
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    // console.log(data);
    setIsLoading(true);
    if (applyFor === 'job') {
      postApplication(data, router, ID || 0)
        .then(({ status }) => {
          if (status === 200) {
            if (user?.chatengineUsername) {
              router.push(`${ROUTES_URL.navRoutes.vacancies}/thank-you`);
              setIsLoading(false);
            } else {
              CreateUserChat()
                .then(({ status }) => {
                  if (status === 201) {
                    setShouldUpdateUserData(true);
                  }
                  setIsLoading(false);
                })
                .catch((err) => {
                  setIsLoading(false);
                });
            }
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else {
      requestHelperDetail(router, ID || 0, setApply, helperT);
    }
  };

  useEffect(() => {
    if (apply) {
      ApplyCardRef.current?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center',
      });
    }
  }, [apply]);

  useEffect(() => {
    if (apply) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [apply]);

  return (
    <>
      <div
        ref={ApplyCardRef}
        className={`bg-white w-full sm:w-auto p-4 py-6 sm:px-12 sm:py-10 sm:rounded-20 fixed left-1/2 top-1/2 right-unset -translate-x-1/2 -translate-y-1/2 md:transform-none md:absolute md:top-0 md:left-unset ltr:md:right-0 ltr:md:left-unset rtl:md:left-0 rtl:md:right-unset z-30 flex flex-col transition-all ease-in ${
          apply ? 'visible opacity-100' : 'invisible opacity-0'
        }`}>
        {applyFor === 'job' && profileNotCompleted && (
          <>
            <Typography fontweight="book">
              {t('yourAccountIs')} <span className="text-darkOrange-500">{t('notComplete')}</span>{' '}
              {t('beSure')}
            </Typography>
            <Link href={ROUTES_URL.navRoutes.user.profile}>
              <Button loadMoreButton color="green" className="mt-5 mb-11 self-center">
                {t('updateMyProfile')}
              </Button>
            </Link>
          </>
        )}
        <Typography variant="caption" className="text-lightGreen-500 mb-2">
          {applyFor === 'job' ? t('confirmYourAppliation') : helperT('requsetDetailsOfTheHelper')}
        </Typography>
        {applyFor === 'helper' && (
          <Typography variant="h5" className="mb-8 mt-5">
            {helperInfo?.firstName} {helperInfo?.lastName}
          </Typography>
        )}
        <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {applyFor === 'job' && (
            <TextField
              variant="bordered"
              placeholder={t('typeHere')}
              label={
                <Typography className="text-darkBlue-400" variant="h6" fontweight="book">
                  {t('addMotivation')}
                </Typography>
              }
              multiLine
              rows={10}
              {...register('description')}
              errorText={errors.description?.message}
              error={errors.description?.message !== undefined}
              autoComplete="new-password"
            />
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-5">
            <Button
              type="button"
              loadMoreButton
              back
              color="orange"
              onClick={() => setApply(false)}>
              <Typography variant="caption">
                {applyFor === 'job' ? t('back') : helperT('back')}
              </Typography>
            </Button>
            <Button
              disabled={isLoading || (profileNotCompleted && applyFor === 'job')}
              type="submit"
              loadMoreButton
              color="green"
              className="min-w-[200px] min-h-[44px]">
              {isLoading ? (
                <Spinner className="w-4 h-4" />
              ) : (
                <Typography variant="caption" className="whitespace-nowrap">
                  {applyFor === 'job' ? t('sendApplication') : helperT('sendRequest')}
                </Typography>
              )}
            </Button>
          </div>
        </form>
      </div>
      <div
        className={`bg-darkBlue-500/30 w-screen h-screen fixed top-0 left-0 z-20 transition-all ease-in ${
          apply ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={() => setApply(false)}
      />
    </>
  );
};

export default ApplyCard;
