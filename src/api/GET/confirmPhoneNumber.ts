// types
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const confirmPhoneNumber = async (
  code: string,
  phoneNumber: string,
  router: NextRouter,
  t: any
) => {
  try {
    const { status, data }: AxiosResponse = await axios.get(
      `/auth/sms-confirmation?confirmation=${code}&phoneNumber=${phoneNumber}`
    );
    if (status === 200) {
      notify({ message: t('phoneVerified'), router, type: 'success' });
      router.reload();
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
