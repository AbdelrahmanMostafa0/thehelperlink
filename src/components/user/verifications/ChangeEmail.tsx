// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// yup & react-user-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// utils
import { emailSchema } from '@src/utils/schema';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import Modal from '@src/components/Modal';
import TextField from '@src/components/TextField';
import { updateEmail } from '@src/api/PUT/updateEmail';
import { useUserStore } from '@src/zustand_stores/user';

interface IProps {
  prevEmail: string;
  setStage: React.Dispatch<React.SetStateAction<'message' | 'change-email'>>;
}

export interface IFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: emailSchema,
  })
  .required();

const ChangeEmail: React.FC<IProps> = ({ prevEmail, setStage }) => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;
  const { changeUserState } = useUserStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    updateEmail(data, changeUserState, router, t);
  };

  return (
    <form className="w-full flex" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col gap-6 my-8">
        <Typography>{t('pleaseEnterYourNewEmail')}</Typography>
        <TextField
          variant="bordered"
          placeholder={t('email')}
          className="text-body1 max-w-[300px]"
          {...register('email')}
          errorText={errors.email?.message}
          error={errors.email?.message !== undefined}
          autoComplete="new-password"
        />
        <div className="flex gap-2 flex-wrap w-full justify-center">
          <Button
            onClick={() => setStage('message')}
            color="orange"
            type="button"
            className="min-w-[150px]">
            {t('back')}
          </Button>
          <Button color="green" type="submit" className="min-w-[150px]">
            {t('confirm')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangeEmail;
