// types
import { IUser } from '@src/@types/user';
import { IFormInputs } from '@pages/auth/register/employer';
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';
import { fixNumbers } from '@src/utils/REGEX';

// js-cookie
import Cookies from 'js-cookie';

// routes
import { ROUTES_URL } from '@src/routes';

export const registerEmployer = async (
  data: IFormInputs,
  changeUserState: (userInfo: IUser) => void,
  router: NextRouter
) => {
  // const dateFormat = new Date(data.dateOfBirth).toISOString();
  const _data = {
    username: data.email,
    email: data.email,
    firstName: data.name,
    lastName: data.surname,
    // dateOfBirth: dateFormat,
    gender: data.gender,
    phoneNumber: `${data.countryPhoneCode}${fixNumbers(data.phone)}`,
    location: {
      region: +data.region,
      city: +data.city,
    },
    password: data.password,
  };

  // console.log('datA:', _data);

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.post(
      '/auth/local/register',
      _data,
      {
        headers: {
          'x-client-destination': 'employer',
        },
      }
    );
    if (status === 200) {
      changeUserState(receivedData.user as IUser);
      const cookieExpiration = data.remember ? 365 : undefined; // Set cookie expiration time (in days)
      Cookies.set('token', receivedData.jwt, { expires: cookieExpiration });
      router.push(ROUTES_URL.navRoutes.user.profile);
    }
  } catch (error: any) {
    notify({ message: error?.response?.data?.error?.message, router, type: 'error' });
  }
};
