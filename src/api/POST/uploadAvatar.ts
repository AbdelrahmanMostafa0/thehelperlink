// types
import { IUser } from '@src/@types/user';
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const uploadAvatar = async (
  file: any,
  userState: IUser | null,
  router: NextRouter,
  t: any,
  changeUserState: (userInfo: IUser) => void
) => {
  const isHelper = userState?.userType === 'helper';
  const profileImage = new FormData();
  profileImage.append('files', file);
  profileImage.append('ref', isHelper ? 'api::helper.helper' : 'api::employer.employer');
  profileImage.append(
    'refId',
    isHelper ? userState?.helper?.id?.toString() || '' : userState?.employer?.id?.toString() || ''
  );
  profileImage.append('field', 'profileImage');

  try {
    await axios
      .post('/upload', profileImage, {
        headers: {
          'x-client-destination': userState?.userType,
        },
      })
      .then(async ({ data: uploadedData, status: uploadStatus }) => {
        if (uploadStatus === 200) {
          const { status, data: receivedData }: AxiosResponse = await axios.put('/users/me', {
            profileImage: uploadedData[0].id,
          });
          if (status === 200) {
            changeUserState(receivedData as IUser);
            notify({ message: t('yourAvatarHasBeenUploaded'), router, type: 'success' });
          }
        }
      })
      .catch((error) =>
        notify({ message: error?.response?.data?.error?.message, router, type: 'error' })
      );
  } catch (error: any) {
    notify({ message: error?.response?.data?.error?.message, router, type: 'error' });
  }
};
