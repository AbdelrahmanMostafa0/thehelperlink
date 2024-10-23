// NEXT JS
import { NextRouter } from 'next/router';

// types
import { IUser } from '@src/@types/user';
import { IFormInputs } from '@src/components/user/verifications/ChangePhone';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const updatePhone = async (
  data: IFormInputs,
  changeUserState: (userInfo: IUser) => void,
  router: NextRouter,
  t: any
) => {
  const _data: Partial<any> = {
    phoneNumber: `${data.countryPhoneCode}${data.phone}`,
  };

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.put('/users/me', _data);
    if (status === 200) {
      changeUserState(receivedData as IUser);
      notify({ message: t('phoneChanged'), router, type: 'success' });
      router.reload();
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
