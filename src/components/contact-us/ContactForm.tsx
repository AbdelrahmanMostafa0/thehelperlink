// react
import { ReactNode, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

// yup & react-user-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// utils
import { descriptionSchema, emailSchema, nameSchema } from '@src/utils/schema';

// api
import { postContactUs } from '@src/api/POST/postContactUs';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import TextField from '@src/components/TextField';
import Modal from '@src/components/Modal';

interface IProps {
  children?: ReactNode;
}

export interface IFormInputs {
  name: string;
  email: string;
  description: string;
}

const schema = yup
  .object({
    name: nameSchema,
    email: emailSchema,
    description: descriptionSchema,
  })
  .required();

const ContactForm: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation('contact-us') as any;
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    // console.log(data);
    postContactUs(data, router, t, () => setModalOpen(true));
  };
  return (
    <>
      <form
        className="flex flex-col text-center gap-9 bg-white rounded-10 py-14 md:px-10 px-5 w-full max-w-[514px]"
        onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="underline"
          placeholder={t('email')}
          className="text-body1"
          {...register('email')}
          errorText={errors.email?.message}
          error={errors.email?.message !== undefined}
          autoComplete="new-password"
        />
        <TextField
          variant="underline"
          placeholder={t('name')}
          className="text-body1"
          {...register('name')}
          errorText={errors.name?.message}
          error={errors.name?.message !== undefined}
          autoComplete="new-password"
        />
        <TextField
          variant="bordered"
          label={
            <Typography variant="h6" className="text-darkBlue-400">
              {t('description')}
            </Typography>
          }
          placeholder={t('typeHere')}
          className="text-caption px-2"
          multiLine
          rows={10}
          {...register('description')}
          errorText={errors.description?.message}
          error={errors.description?.message !== undefined}
          autoComplete="new-password"
        />

        <Button type="submit" variant="bordered" color="green" className="py-5 mt-8">
          <Typography variant="caption">{t('send')}</Typography>
        </Button>
      </form>
      {/* notify user when the form gets submitted */}
      <Modal
        className="md:min-w-[592px] min-w-[auto] md:h-[347px] h-auto"
        open={modalOpen}
        setOpen={setModalOpen}>
        <div className="w-full flex flex-col items-center justify-between gap-6 min-h-full">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={62}
            height={62}
            className="object-contain"
          />

          <div className="flex flex-col gap-2 text-center">
            <Typography>We’ve received your message.</Typography>
            <Typography>We’ll be in touch with you soon!</Typography>
          </div>
          <Typography>The Helperlink Team</Typography>
        </div>
      </Modal>
    </>
  );
};

export default ContactForm;
