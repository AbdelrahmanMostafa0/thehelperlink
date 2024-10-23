// EXTERNAL PACKAGES
import axios, { AxiosResponse } from 'axios';

export const CreateUserChat = async () => {
  try {
    const { status, data }: AxiosResponse = await axios.post('/users/me/create-chatengine-user');
    return { status };
  } catch (error: any) {
    return { status: error.response.status };
  }
};
