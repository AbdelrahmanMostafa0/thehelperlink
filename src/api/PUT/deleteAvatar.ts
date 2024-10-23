// NEXT Js
import { NextRouter } from 'next/router';

// types
import { IUser } from '@src/@types/user';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const deleteAvatar = async (
  router: NextRouter,
  t: any,
  changeUserState: (userInfo: IUser) => void
) => {
  try {
    const { status, data: receivedData }: AxiosResponse = await axios.put('/users/me', {
      profileImage: null,
    });
    if (status === 200) {
      changeUserState(receivedData as IUser);
      notify({ message: t('yourAvatarHasBeenDeleted'), router, type: 'success' });
    }
  } catch (error: any) {
    notify({ message: error?.response?.data?.error?.message, router, type: 'error' });
  }
};
