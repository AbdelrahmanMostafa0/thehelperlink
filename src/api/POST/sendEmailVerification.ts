// NEXT Js
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const sendEmailVerification = async (email: string, router: NextRouter, t: any) => {
  const _data: Partial<any> = {
    email,
  };

  try {
    const { status, data }: AxiosResponse = await axios.post(
      '/auth/send-email-confirmation',
      _data
    );
    if (status === 200) {
      notify({ message: t('EmailVerificationSent'), router, type: 'success' });
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
