// types
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const deleteJobPost = async (router: NextRouter, t: any) => {
  try {
    const { status, data }: AxiosResponse = await axios.delete(
      `/jobs/${router.query['post-id'] || ''}`
    );
    if (status === 200) {
      notify({ message: t('yourJobPostHasBeenDeleted'), router, type: 'success' });
    }
  } catch (error: any) {
    notify({ message: error?.response?.data?.error?.message, router, type: 'error' });
  }
};
