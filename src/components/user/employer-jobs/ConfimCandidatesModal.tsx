// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

// types
import { ROUTES_URL } from '@src/routes';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import Modal from '@src/components/Modal';
import { useCandidateSelection } from '@src/zustand_stores/candidateSelection';
import { selectCandidates } from '@src/api/PUT/selectCandidates';

interface IProps {
  children?: ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  postId: number;
}

const ConfirmCandidatesModal: React.FC<IProps> = ({ open, setOpen, postId }) => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const { candidatesList, setIsReadyToSend, isReadyToSend } = useCandidateSelection(
    (state) => state
  );

  const handleCandidates = async () => {
    if (isReadyToSend) {
      // send candidates to backend
      await selectCandidates(postId, candidatesList, router, t).then((_) =>
        router.push(ROUTES_URL.navRoutes.user.jobPosts.main)
      );
    }
  };

  return (
    <Modal className="md:min-w-[592px] min-w-[auto]" open={open} setOpen={setOpen}>
      <div className="w-full flex flex-col items-center justify-between min-h-full">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={62}
          height={62}
          className="object-contain"
        />
        <Typography variant="h3" className="text-black mt-6 mb-4 text-center">
          {t('confirmSelection')}
        </Typography>
        <Typography fontweight="book" className="mb-4 text-center">
          {t('confirmSelectionDescription')}
        </Typography>
        <div className="flex gap-2 items-center flex-wrap">
          <Button onClick={handleCandidates} color="green">
            <Typography variant="body2">{t('yesConfirm')}</Typography>
          </Button>
          <Button onClick={() => setOpen(false)} color="orange">
            <Typography variant="body2">{t('noCancel')}</Typography>
          </Button>
        </div>
        <Typography variant="h6" fontweight="book" className="mt-10">
          {t('theHelperlinkTeam')}
        </Typography>
      </div>
    </Modal>
  );
};

export default ConfirmCandidatesModal;
