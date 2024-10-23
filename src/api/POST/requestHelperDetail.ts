// NEXT JS
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const requestHelperDetail = async (
  router: NextRouter,
  helperId: number,
  setApply: React.Dispatch<React.SetStateAction<boolean>>,
  t: any
) => {
  try {
    const { status, data }: AxiosResponse = await axios.post(`/helpers/interest/${helperId}`, {});
    if (status === 200) {
      notify({ message: t('requestSent'), router, type: 'success' });
      setApply(false);
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
