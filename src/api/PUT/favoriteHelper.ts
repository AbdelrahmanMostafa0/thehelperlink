// types
import { IUser } from '@src/@types/user';

// axios
import axios, { AxiosResponse } from 'axios';

export const favoriteHelper = async (
  helperId: number,
  isFavourite: boolean,
  changeUserState: (userInfo: IUser) => void
) => {
  const _data: Partial<any> = {
    favouriteHelpers: {
      connect: [helperId],
      disconnect: [helperId],
    },
  };
  if (isFavourite) delete _data.favouriteHelpers.disconnect;
  else delete _data.favouriteHelpers.connect;

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.put('/users/me', _data);
    if (status === 200) {
      changeUserState(receivedData as IUser);
      return { status };
    }
  } catch (error: any) {
    return { status: error.response.status };
  }
};
