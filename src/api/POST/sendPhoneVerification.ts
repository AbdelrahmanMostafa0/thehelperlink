// NEXT JS
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const sendPhoneVerification = async (phoneNumber: string, router: NextRouter, t: any) => {
  const _data: Partial<any> = {
    phoneNumber,
  };

  try {
    const { status, data }: AxiosResponse = await axios.post('/auth/send-sms-confirmation', _data);
    if (status === 200) {
      notify({ message: t('phoneVerificationSent'), router, type: 'success' });
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
