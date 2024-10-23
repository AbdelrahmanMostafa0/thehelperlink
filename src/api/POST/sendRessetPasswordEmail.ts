// NEXT JS
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const sendRessetPasswordEmail = async (email: string, router: NextRouter, t: any) => {
  const _data = {
    email,
  };

  try {
    const { status, data }: AxiosResponse = await axios.post('/auth/forgot-password', _data);
    if (status === 200) {
      notify({ message: t('resetPasswordEmailSent'), router, type: 'success' });
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
