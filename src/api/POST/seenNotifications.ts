// axios
import axios, { AxiosResponse } from 'axios';

export const seenNotifications = async (IDs: number[]) => {
  const _data = {
    data: {
      ids: IDs,
    },
  };

  try {
    const { status, data }: AxiosResponse = await axios.post('notifications/seen', _data);
    return { status: 204 };
  } catch (error: any) {
    return { status: error.response.status };
  }
};
