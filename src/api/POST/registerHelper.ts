// types
import { IUser } from '@src/@types/user';
import { IFormInputs } from '@pages/auth/register/helper';
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

export const registerHelper = async (
  data: IFormInputs,
  changeUserState: (userInfo: IUser) => void,
  router: NextRouter,
  t: any
) => {
  // const dateFormat = DateTime.fromJSDate(new Date(data.dateOfBirth)).toFormat('yyyy-MM-dd');
  const dateFormat = new Date(data.dateOfBirth).toISOString();
  const _data = {
    username: data.email,
    email: data.email,
    firstName: data.name,
    lastName: data.surname,
    dateOfBirth: dateFormat,
    gender: data.gender,
    religion: data.religion,
    phoneNumber: `${data.countryPhoneCode}${fixNumbers(data.phone)}`,
    nationality: +data.nationality,
    location: {
      country: +data.country,
      city: +data.city,
    },
    password: data.password,
    // jobType: [1],
  };

  // console.log(_data);

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.post(
      '/auth/local/register',
      _data,
      {
        headers: {
          'x-client-destination': 'helper',
        },
      }
    );
    console.log('data:', receivedData, 'status: ', status);
    if (status === 200) {
      changeUserState(receivedData.user as IUser);
      const cookieExpiration = data.remember ? 365 : undefined; // Set cookie expiration time (in days)
      Cookies.set('token', receivedData.jwt, { expires: cookieExpiration });
      // notify({ message: `Welcome ${receivedData.user?.firstName}`, router, type: 'success' });
      router.push(ROUTES_URL.navRoutes.user.profile);
    }
  } catch (error: any) {
    console.log('error:', error);
    const message = t(error?.response?.data?.error?.message);

    notify({ message, router, type: 'error' });
  }
};
