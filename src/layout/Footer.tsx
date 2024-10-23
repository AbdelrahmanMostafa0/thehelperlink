// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

// icons
import { Globe } from '@src/assets/icons';

// yup & react-user-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// routes
import { ROUTES_URL, footerRoutes } from '@src/routes';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// constants
import { socialMedia } from '@src/constants';

// components
import Typography from '@src/components/Typography';

interface IProps {
  children?: ReactNode;
}

interface IFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email('please provide a valid email.')
      .required('this field is rrequired.')
      .typeError('just type letters.'),
  })
  .required();

const Footer: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;

  const { userState } = useUserStore((state) => state);
  const isEmployer = userState?.userType === 'employer';

  const HAS_ACCESS =
    userState?.userType === 'helper'
      ? userState.confirmed
      : userState?.confirmed && userState.confirmedPhoneNumber;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  const changeLocale = (locale: string) => {
    router.push(router.pathname, router.asPath, {
      locale,
      shallow: false,
    });
  };

  return (
    <footer className="w-full flex flex-col bg-white z-[1]">
      <div className="flex flex-col w-full mx-auto py-12 px-5 lg:p-24">
        <div className="flex flex-col sm:flex-row justify-between w-full flex-wrap gap-16">
          {/* logo and send email form */}
          <div className="flex flex-col">
            <Link href={ROUTES_URL.navRoutes.home} className="self-baseline">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </Link>
            <Typography variant="h5" className="pt-5 max-w-[460px]">
              {/* {t('stayConnected')} */}
              {t('helperLinkSlogan')}
            </Typography>
            {/* <Typography fontweight="book">{t('subcribeToUpdates')}</Typography> */}
            {/* <form
              className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-6 sm:bg-white sm:shadow-custom-shadow px-[3px] py-[1.5px] rounded-[5px] sm:min-w-[467px] mt-9"
              onSubmit={handleSubmit(onSubmit)}>
              <TextField
                placeholder={t('email')}
                className="flex-1 px-2 bg-white shadow-custom-shadow sm:shadow-none sm:bg-inherit w-full"
                // label="first name"
                {...register(t('email'))}
                // error={errors.firstName?.message !== undefined}
                // helperText={errors.firstName?.message}
              />
              <Button color="green" type="submit" className="self-start">
                <Typography variant="caption">{t('registerToNewsletter')}</Typography>
              </Button>
            </form> */}
          </div>
          {/* route links */}
          <div className="flex gap-24">
            <ul className="flex flex-col gap-5">
              {footerRoutes.column1
                .filter((el) => (isEmployer ? true : el.name !== 'postAJob'))
                .map((route, index) => {
                  const isPostAJob = route.name === 'postAJob';

                  return isPostAJob && !HAS_ACCESS ? null : (
                    <li key={index}>
                      <Link href={route.url}>
                        <Typography>{t(route.name)}</Typography>
                      </Link>
                    </li>
                  );
                })}
              {/* change language */}
              <li>
                {/* <Link
                  href={{ pathname: router.pathname, query: router.query }}
                  locale={router.locale === 'en-GB' ? 'ar-SA' : 'en-GB'}> */}
                <div
                  className="flex items-center gap-3"
                  role="button"
                  tabIndex={0}
                  onClick={() => changeLocale(router.locale === 'en-GB' ? 'ar-SA' : 'en-GB')}>
                  <Globe className="w-6 h-6" />
                  <Typography>{router.locale === 'en-GB' ? 'عربی' : 'EN'}</Typography>
                </div>
                {/* </Link> */}
              </li>
            </ul>
            <ul className="flex flex-col gap-5">
              {footerRoutes.column2.map((route, index) => (
                <li key={index}>
                  <Link href={route.url}>
                    <Typography>{t(route.name)}</Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* pravacy and terms&conditions links  */}
        <div className="w-full flex items-center justify-center mt-14 mb-3 gap-5 flex-wrap">
          <Link href={ROUTES_URL.navRoutes.privacy}>
            <Typography variant="body2">{t('privacy')}</Typography>
          </Link>
          <Link href={ROUTES_URL.navRoutes.termsAndConditions}>
            <Typography variant="body2">{t('terms&conditions')}</Typography>
          </Link>
        </div>
        {/* social media and coppy right */}
        <div className="w-full border-t border-darkBlue-100 flex flex-wrap justify-between items-center pt-5 gap-8">
          {/* social media */}
          <div className="flex flex-wrap items-center gap-8">
            {socialMedia.map((SM, index) => (
              <Link key={index} href={SM.url} className="text-darkBlue-500">
                <SM.icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
          {/* coppy right */}
          <Typography variant="caption">
            {t('theHelperLink')} &copy; {new Date().getFullYear()}, {t('allRightReserved')}
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
