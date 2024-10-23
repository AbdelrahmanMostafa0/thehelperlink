// types
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const addEvent = async (
  from: string,
  to: string,
  helperId: number,
  router: NextRouter,
  t: any
) => {
  const _data: Partial<any> = {
    data: {
      note: '',
      start: new Date(from).toISOString(),
      end: new Date(to).toISOString(),
      helper: helperId,
    },
  };

  console.log('data', _data);

  try {
    const { status, data }: AxiosResponse = await axios.post('/meetings', _data);
    if (status === 200) {
      notify({
        message: t('EventHasBeenCreatedAndInvitationSentToTheHelper'),
        router,
        type: 'success',
      });
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
