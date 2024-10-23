// NEXT JS
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const editEvent = async (
  from: string,
  to: string,
  eventId: number,
  router: NextRouter,
  t: any
) => {
  try {
    const { status, data: receivedData }: AxiosResponse = await axios.put(`/meetings/${eventId}`, {
      data: {
        note: '',
        start: new Date(from).toISOString(),
        end: new Date(to).toISOString(),
      },
    });
    if (status === 200) {
      notify({
        message: t('yourEventHasBeenEditedAndInvitationSentToHelper'),
        router,
        type: 'success',
      });
    }
  } catch (error: any) {
    notify({ message: error?.response?.data?.error?.message, router, type: 'error' });
  }
};
