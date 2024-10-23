// icons
import { Message } from '@src/assets/icons';

// i18next
import { useTranslation } from 'next-i18next';

// components
import Button from '@src/components/Button';
import Typography from '@src/components/Typography';

interface IProps {}

const Accordion = ({}: IProps) => {
  const { t } = useTranslation('faq');

  return (
    <div className="px-3">
      <div className="flex flex-col items-center bg-white rounded-10 shadow-custom-shadow text-center py-6 px-6 self-start w-full lg:w-[400px]">
        <Message className="w-16 h-16 mt-16" />
        <Typography className="mt-16">{t('moreQuestions')}</Typography>
        <Typography className="mt-11">{t('feelFreeToEmailUs')}</Typography>
        <Typography className="mt-3 mb-7">{t('emailAddress')}</Typography>
        {/* <Typography className="mt-11">{t('endToEndPayment')}</Typography> */}
        {/* <Button loadMoreButton color="green" className="mt-16">
          <Typography variant="caption">{t('sendEmail')}</Typography>
        </Button> */}
      </div>
    </div>
  );
};

export default Accordion;
