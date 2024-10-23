// types
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const deleteApplication = async (router: NextRouter, t: any) => {
  try {
    const { status, data }: AxiosResponse = await axios.delete(
      `/applications/${router.query['application-id'] || ''}`
    );
    if (status === 200) {
      notify({ message: t('yourApplicationHasBeenDeleted'), router, type: 'success' });
    }
  } catch (error: any) {
    notify({ message: error?.response?.data?.error?.message, router, type: 'error' });
  }
};
