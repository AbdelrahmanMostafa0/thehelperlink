// NEXT JS
import { NextRouter } from 'next/router';
// types
import { IFormInputs } from '@pages/auth/forgot-password';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

// routes
import { ROUTES_URL } from '@src/routes';

export const ressetPassword = async (data: IFormInputs, router: NextRouter, t: any) => {
  const _data = {
    password: data.password,
    passwordConfirmation: data.rePassword,
    code: router.query['code'],
  };

  try {
    const { status, data }: AxiosResponse = await axios.post('/auth/reset-password', _data);
    if (status === 200) {
      notify({ message: t('passwordChanged'), router, type: 'success' });
      setTimeout(() => {
        router.push(ROUTES_URL.authRoutes.login);
      }, 2000);
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
