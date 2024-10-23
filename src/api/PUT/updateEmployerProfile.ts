// NEXT JS
import { NextRouter } from 'next/router';

// types
import { IUser } from '@src/@types/user';
import { IFormInputs } from '@src/components/user/profile/EmployerEdit';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';
import { fixNumbers } from '@src/utils/REGEX';

export const updateEmployerProfile = async (
  data: IFormInputs,
  changeUserState: (userInfo: IUser) => void,
  router: NextRouter,
  t: any
) => {
  // const formatedBirthDate = new Date(data.dateOfBirth).toISOString();
  const _data = {
    username: data.email,
    email: data.email,
    firstName: data.name,
    lastName: data.surname,
    gender: data.gender,
    // dateOfBirth: formatedBirthDate,
    phoneNumber: `${data.countryPhoneCode}${fixNumbers(data.phone)}`,
    location: {
      region: +data.region,
      city: +data.city,
    },
    adults: data.numberOfAddults,
    children: data.numberOfChildren,
  };

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.put('/users/me', _data);
    if (status === 200) {
      changeUserState(receivedData as IUser);
      notify({ message: t('profileUpdated'), router, type: 'success' });
    }
  } catch (error: any) {
    notify({ message: error?.response?.data?.error?.message, router, type: 'error' });
  }
};
