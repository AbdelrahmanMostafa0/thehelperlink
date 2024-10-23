// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// yup & react-user-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// utils
import { phoneSchema } from '@src/utils/schema';

// api
import { updatePhone } from '@src/api/PUT/updatePhone';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import TextField from '@src/components/TextField';
import PhoneCode from '@src/components/PhoneCode';

interface IProps {
  prevPhone: string;
  setStage: React.Dispatch<React.SetStateAction<'message' | 'change-phone'>>;
}

export interface IFormInputs {
  phone: string;
  countryPhoneCode: string;
}

const schema = yup
  .object({
    phone: phoneSchema,
  })
  .required();

const ChangePhone: React.FC<IProps> = ({ prevPhone, setStage }) => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;
  const { changeUserState } = useUserStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    updatePhone(data, changeUserState, router, t);
  };

  return (
    <form className="w-full flex" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col gap-6 my-8">
        <Typography>{t('pleaseEnterYourNewPhoneNumber')}</Typography>
        <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7 max-w-[400px] mx-auto justify-center">
          <PhoneCode
            isEmployer
            onChange={(country) => setValue('countryPhoneCode', country.dial_code)}
            value={watch('countryPhoneCode')}
          />
          <TextField
            variant="underline"
            placeholder={t('phone')}
            className=" w-full min-h-[41px] text-body2"
            {...register('phone')}
            errorText={errors.phone?.message}
            error={errors.phone?.message !== undefined}
            autoComplete="new-password"
          />
        </div>
        <div className="flex gap-2 flex-wrap w-full justify-center mt-6">
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

export default ChangePhone;
