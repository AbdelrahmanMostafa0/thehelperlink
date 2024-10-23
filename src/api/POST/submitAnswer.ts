// axios
import axios, { AxiosResponse } from 'axios';

export const submitAnswers = async (questionId: number, answer: string) => {
  const _data = {
    data: {
      answer,
      question: questionId,
    },
  };

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.post('/answers', _data);
    if (status === 200) {
      return { data: receivedData.data, status };
    }
  } catch (error: any) {
    return { data: error.response?.data?.error?.message, status: error.response?.status };
  }
};
