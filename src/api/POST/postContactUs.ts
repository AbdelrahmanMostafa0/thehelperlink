// types
import { IUser } from '@src/@types/user';
import { IFormInputs } from '@src/components/contact-us/ContactForm';
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const postContactUs = async (
  data: IFormInputs,
  router: NextRouter,
  t: any,
  onSuccess: () => void
) => {
  const _data = {
    data: {
      name: data.name,
      email: data.email,
      description: data.description,
    },
  };

  try {
    const { status, data }: AxiosResponse = await axios.post('/contact-submissions', _data);
    if (status === 200) {
      onSuccess();
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
