// NEXT JS
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const acceptEvent = async (eventId: number, router: NextRouter, t: any) => {
  try {
    const { status, data }: AxiosResponse = await axios.put(`/meetings/${eventId}`, {
      data: {
        accepted: true,
      },
    });
    if (status === 200) {
      notify({
        message: t('theMeetingHasBeenAccepted'),
        router,
        type: 'success',
      });
    }
  } catch (error: any) {
    notify({ message: error?.response?.data?.error?.message, router, type: 'error' });
  }
};
