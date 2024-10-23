// react
import { ReactNode, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

// types
import { IUser } from '@src/@types/user';
import { ROUTES_URL } from '@src/routes';

// api
import { sendPhoneVerification } from '@src/api/POST/sendPhoneVerification';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import Modal from '@src/components/Modal';
import ChangePhone from './ChangePhone';
import SmsVerificationInput from './SmsVerificationInput';

interface IProps {
  children?: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  userData: IUser | null;
}

const PhoneVerification: React.FC<IProps> = ({ open, setOpen, userData }) => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;
  const [stage, setStage] = useState<'message' | 'change-phone'>('message');

  return (
    <Modal className="sm:min-w-[592px] min-w-[auto]" open={open} setOpen={setOpen}>
      <div className="w-full flex flex-col items-center justify-between min-h-full">
        {stage === 'message' ? (
          <>
            <Image
              src="/images/logo.png"
              alt="logo"
              width={62}
              height={62}
              className="object-contain"
            />
            <Typography variant="h3" className="text-black mt-6">
              {t('welcome')}
            </Typography>
            <Typography fontweight="book" variant="body1" className="mt-4">
              {t('thankYouForSigningUp')}
            </Typography>
            <Typography fontweight="book" variant="body1" className="mb-8 mt-9">
              {t('weJustNeedYouToVerifyYourPhoneNumberToActivateYourAccount')}
            </Typography>
            <Typography fontweight="book" variant="body1" className="">
              {t('pleaseEnterTheCode')}
            </Typography>
            <SmsVerificationInput codeLength={6} phoneNumber={userData?.phoneNumber || ''} />
            <div className="flex gap-2 flex-wrap pb-4 justify-center">
              <Button
                onClick={() => sendPhoneVerification(userData?.phoneNumber || '', router, t)}
                color="orange">
                {t('resendCode')}
              </Button>
              <Button onClick={() => setStage('change-phone')} color="green">
                {t('enterNewPhone')}
              </Button>
              <Link href={ROUTES_URL.navRoutes.contactUs}>
                <Button color="blue">{t('contactSupport')}</Button>
              </Link>
            </div>
          </>
        ) : (
          <ChangePhone setStage={setStage} prevPhone={userData?.phoneNumber || ''} />
        )}
      </div>
    </Modal>
  );
};

export default PhoneVerification;
