// react
import React from 'react';

// nextjs
import { useRouter } from 'next/router';

// yup & react-user-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// components
import Button from '@src/components/Button';
import TextField from '@src/components/TextField';
import { useTranslation } from 'react-i18next';

interface IProps {}

interface IFormInputs {
  firstName: string;
  lastName: string;
}

const schema = yup
  .object({
    firstName: yup.string().required('this field is rrequired.').typeError('just type letters.'),
    lastName: yup.string().required('this field is rrequired.').typeError('just type letters.'),
  })
  .required();

const SampleForm: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          variant="underline"
          placeholder={t('firstName')}
          className="text-body1"
          {...register('firstName')}
          errorText={errors.firstName?.message}
          error={errors.firstName?.message !== undefined}
          autoComplete="new-password"
        />

        <TextField
          variant="underline"
          placeholder={t('lastName')}
          className="text-body1"
          {...register('lastName')}
          errorText={errors.lastName?.message}
          error={errors.lastName?.message !== undefined}
          autoComplete="new-password"
        />

        <Button type="submit">Confirm</Button>
      </div>
    </form>
  );
};

export default SampleForm;
