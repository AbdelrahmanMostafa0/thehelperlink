// types
import { IUser } from '@src/@types/user';
import { IFormInputs } from '@src/components/vacancies/ApplyCard';
import { NextRouter } from 'next/router';

// EXTERNAL PACKAGES
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

// routes
import { ROUTES_URL } from '@src/routes';

export const postApplication = async (data: IFormInputs, router: NextRouter, jobId: number) => {
  const _data = {
    data: {
      description: data.description,
      job: jobId,
    },
  };
  // console.log(_data);

  try {
    const { status, data }: AxiosResponse = await axios.post('/applications', _data);
    return { status };
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
    return { status: error.response.status };
  }
};
