// types
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const deleteEvent = async (eventId: number, router: NextRouter, t: any) => {
  try {
    const { status, data }: AxiosResponse = await axios.delete(`/meetings/${eventId}`);
    if (status === 200) {
      notify({ message: t('YourMeetingHasBeendDeleted'), router, type: 'success' });
    }
  } catch (error: any) {
    notify({ message: error?.response?.data?.error?.message, router, type: 'error' });
  }
};
