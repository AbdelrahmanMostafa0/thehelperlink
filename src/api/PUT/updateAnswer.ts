// axios
import axios, { AxiosResponse } from 'axios';

export const updateAnswer = async (answerId: number, answer: string) => {
  const _data: Partial<any> = {
    data: {
      answer,
    },
  };

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.put(
      `/answers/${answerId}`,
      _data
    );
    if (status === 200) {
      return { data: receivedData.data, status };
    }
  } catch (error: any) {
    return { data: error.response?.data?.error?.message, status: error.response?.status };
  }
};
