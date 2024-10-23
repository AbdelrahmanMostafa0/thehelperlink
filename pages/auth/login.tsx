// react & next js
import { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// EXTERNAL PACKAGES START
// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// yup & react-user-form
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// EXTERNAL PACKAGES END

// routes
import { ROUTES_URL } from '@src/routes';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// utils
import { emailSchema, passwordSchema } from '@src/utils/schema';

// api
import { loginUser } from '@src/api/POST/loginUser';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import TextField from '@src/components/TextField';
import Checkbox from '@src/components/Checkbox';

interface IProps {
  children?: ReactNode;
}

export interface IFormInputs {
  email: string;
  password: string;
  remember: boolean;
}

const schema = yup
  .object({
    email: emailSchema,
    password: passwordSchema,
    remember: yup.boolean(),
  })
  .required();

const Login: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation('auth') as any;

  const { changeUserState, userState } = useUserStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    loginUser(data, changeUserState, router);
  };

  return (
    <>
      <Head>
        <title>{t('loginPage')}</title>
        <meta name="description" content="login page" />
      </Head>
      <div className="w-full flex justify-center items-center min-h-screen bg-[url('/images/helpers-page-bg.png')] bg-fixed bg-top bg-cover bg-no-repeat p-4">
        <div className="max-w-[597px] min-h-[489px] w-full bg-white rounded-20 px-5 sm:px-12 md:px-20 pt-8 pb-14">
          <form className="w-full flex flex-col text-center" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h3" className="pb-14" textTransform="first-letter-capital">
              {t('welcome')}
            </Typography>

            <TextField
              variant="underline"
              placeholder={t('email')}
              className="text-body1"
              {...register('email')}
              autoComplete="new-password"
              errorText={errors.email?.message}
              error={errors.email?.message !== undefined}
            />
            <TextField
              variant="underline"
              placeholder={t('password')}
              className=" text-h6 mt-5"
              type="password"
              {...register('password')}
              autoComplete="new-password"
              errorText={errors.password?.message}
              error={errors.password?.message !== undefined}
            />
            <div className="w-full flex justify-between gap-3 flex-wrap items-center mt-4">
              <Controller
                control={control}
                name="remember"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    id="remember-me"
                    labelClassName="text-caption"
                    onChange={onChange}
                    checked={value}>
                    {t('remember')}
                  </Checkbox>
                )}
              />
              <Link
                href={{ pathname: ROUTES_URL.authRoutes.fotgotPassword, query: { email: true } }}>
                <Typography variant="caption" fontweight="book" className="underline">
                  {t('forgotPassword')}
                </Typography>
              </Link>
            </div>
            <Button type="submit" variant="bordered" color="green" className="py-5 mt-8">
              <Typography variant="caption">{t('login')}</Typography>
            </Button>
            <Typography
              variant="body2"
              fontweight="book"
              className="pt-5 flex justify-center gap-5 sm:gap-2 flex-wrap">
              {t('haveNoAccount')}{' '}
              <Link href={ROUTES_URL.authRoutes.register}>
                <span className="font-medium underline whitespace-nowrap">{t('signupFree')}</span>
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: any }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
    },
  };
};

export default Login;
