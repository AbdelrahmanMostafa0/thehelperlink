// NEXT JS
import { NextRouter } from 'next/router';

// types
import { IUser } from '@src/@types/user';
import { IFormInputs } from '@src/components/user/verifications/ChangeEmail';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';
import { sendEmailVerification } from '../POST/sendEmailVerification';

export const updateEmail = async (
  data: IFormInputs,
  changeUserState: (userInfo: IUser) => void,
  router: NextRouter,
  t: any
) => {
  const _data: Partial<any> = {
    email: data.email,
  };

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.put('/users/me', _data);
    if (status === 200) {
      changeUserState(receivedData as IUser);
      notify({ message: t('emailChanged'), router, type: 'success' });
      sendEmailVerification(receivedData.email, router, t);
      router.reload();
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
