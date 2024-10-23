// types
import { IUser } from '@src/@types/user';

// axios
import axios, { AxiosResponse } from 'axios';

export const favoriteJob = async (
  jobId: number,
  isFavourite: boolean,
  changeUserState: (userInfo: IUser) => void
) => {
  const _data: Partial<any> = {
    favouriteJobs: {
      connect: [jobId],
      disconnect: [jobId],
    },
  };
  if (isFavourite) delete _data.favouriteJobs.disconnect;
  else delete _data.favouriteJobs.connect;

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.put('/users/me', _data);
    if (status === 200) {
      changeUserState(receivedData as IUser);
      return { status };
    }
  } catch (error: any) {
    console.log('error:', error);
    return { status: error.response.status };
  }
};
