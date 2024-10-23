// types
import { IFormInputs } from '@pages/auth/login';
import { NextRouter } from 'next/router';

// EXTERNAL PACKAGES
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// utils
import { notify } from '@src/utils/notify';

// routes
import { ROUTES_URL } from '@src/routes';

// types
import { IUser } from '@src/@types/user';

export const loginUser = async (
  data: IFormInputs,
  changeUserState: (userInfo: IUser) => void,
  router: NextRouter
) => {
  const _data = {
    identifier: data.email,
    password: data.password,
  };

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.post('/auth/local', _data);
    if (status === 200) {
      changeUserState(receivedData.user as IUser);
      const cookieExpiration = data.remember ? 365 : undefined; // Set cookie expiration time (in days)
      Cookies.set('token', receivedData.jwt, { expires: cookieExpiration });
      router.push(ROUTES_URL.navRoutes.user.profile);
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
