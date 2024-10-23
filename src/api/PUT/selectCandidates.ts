// NEXT JS
import { NextRouter } from 'next/router';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const selectCandidates = async (
  jobId: number,
  candidates: number[],
  router: NextRouter,
  t: any
) => {
  const _data: Partial<any> = {
    data: {
      acceptedApplicants: candidates,
      active: 0,
    },
  };

  try {
    const { status, data }: AxiosResponse = await axios.put(`/jobs/${jobId}`, _data);
    if (status === 200) {
      notify({ message: t('candidatesAreSelectedAndJobIsClosedNow'), router, type: 'success' });
      return { status: 200 };
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
    return { status: error.response?.data?.status };
  }
};
