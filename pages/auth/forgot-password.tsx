// react & next js
import { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// EXTERNAL PACKAGES START
// yup & react-user-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// i18next
import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// EXTERNAL PACKAGES END

// utils
import { passwordSchema, rePasswordSchema, emailSchema } from '@src/utils/schema';

// api
import { ressetPassword } from '@src/api/POST/ressetPassword';
import { sendRessetPasswordEmail } from '@src/api/POST/sendRessetPasswordEmail';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import TextField from '@src/components/TextField';

interface IProps {
  children?: ReactNode;
}

export interface IFormInputs {
  password?: string;
  rePassword?: string;
  email?: string;
}

const Home: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('auth') as any;
  const isEmail = router.query['email'] === 'true';

  const schema = isEmail
    ? yup.object({
        email: emailSchema,
      })
    : yup
        .object({
          password: passwordSchema,
          rePassword: rePasswordSchema,
        })
        .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (isEmail) {
      sendRessetPasswordEmail(data.email!, router, t);
    } else {
      ressetPassword(data, router, t);
    }
  };

  return (
    <>
      <Head>
        <title>{t('forgotPassword')}</title>
        <meta name="description" content={t('forgotPassword')} />
      </Head>
      <div className="w-full p-4 flex justify-center items-center min-h-screen bg-[url('/images/customer-type-bg.png')] bg-center bg-cover bg-no-repeat">
        <div
          className={`flex transition-all text-center duration-200 ease-in flex-col w-full lg:w-1/2 p-6 shadow-custom-shadow rounded-20 bg-white items-start max-w-[592px]`}>
          <Typography variant="h4" className="self-center mb-5">
            {isEmail ? t('enterEmail') : t('changePassword')}
          </Typography>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 items-center">
              {isEmail ? (
                <TextField
                  variant="underline"
                  placeholder={t('email')}
                  className="text-body1"
                  {...register('email')}
                  errorText={errors.email?.message}
                  error={errors.email?.message !== undefined}
                  autoComplete="new-password"
                />
              ) : (
                <>
                  <TextField
                    variant="underline"
                    placeholder={t('password')}
                    type="password"
                    className="text-body1"
                    {...register('password')}
                    errorText={errors.password?.message}
                    error={errors.password?.message !== undefined}
                    autoComplete="new-password"
                  />
                  <TextField
                    variant="underline"
                    placeholder={t('rePassword')}
                    type="password"
                    className="text-body1"
                    {...register('rePassword')}
                    errorText={errors.rePassword?.message}
                    error={errors.rePassword?.message !== undefined}
                    autoComplete="new-password"
                  />
                </>
              )}
              <span className="flex items-end flex-1">
                <Button type="submit" className="px-12" loadMoreButton color="green">
                  <Typography variant="caption">{t('submit')}</Typography>
                </Button>
              </span>
            </div>
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

export default Home;
