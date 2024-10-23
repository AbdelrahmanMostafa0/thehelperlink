// react
import { ReactNode, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation } from 'next-i18next';

// icons
import { Email } from '@src/assets/icons';

// types
import { IUser } from '@src/@types/user';
import { ROUTES_URL } from '@src/routes';

// api
import { sendEmailVerification } from '@src/api/POST/sendEmailVerification';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import Modal from '@src/components/Modal';
import ChangeEmail from './ChangeEmail';

interface IProps {
  children?: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  userData: IUser | null;
}

const EmailVerification: React.FC<IProps> = ({ open, setOpen, userData }) => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;
  const [stage, setStage] = useState<'message' | 'change-email'>('message');

  return (
    <Modal className="md:min-w-[592px] min-w-[auto]" open={open} setOpen={setOpen}>
      <div className="w-full flex flex-col items-center justify-between min-h-full">
        {stage === 'message' ? (
          <>
            <Email className="w-[41px] h-[39px] min-h-[39px] min-w-[41px] mt-14 mb-8" />
            <div className="flex flex-col text-center">
              <Typography variant="h3" className="text-black">
                {t('verifyYourEmail')}
              </Typography>
              <Typography fontweight="book" variant="body1" className="mt-4">
                {t('weHaveSentAnEmailTo')} {userData?.email?.slice(0, 5)}
                {userData?.email
                  ? Array.from(Array((userData?.email || '').length - 5).keys()).map((_) => '*')
                  : ''}{' '}
                {t('toVerifyYourEmailAddressAndActivateYourAccount')}
              </Typography>
              <div className="flex gap-2 flex-wrap pb-8 pt-8 justify-center">
                <Button
                  onClick={() => sendEmailVerification(userData?.email || '', router, t)}
                  color="orange">
                  {t('resendEmail')}
                </Button>
                <Button onClick={() => setStage('change-email')} color="green">
                  {t('enterNewEmail')}
                </Button>
                <Link href={ROUTES_URL.navRoutes.contactUs}>
                  <Button color="blue">{t('contactSupport')}</Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <ChangeEmail prevEmail={userData?.email || ''} setStage={setStage} />
        )}
      </div>
    </Modal>
  );
};

export default EmailVerification;
