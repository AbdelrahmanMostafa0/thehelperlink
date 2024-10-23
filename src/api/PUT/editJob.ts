// NEXT JS
import { NextRouter } from 'next/router';

// types
import { IFormInputs } from '@pages/post-a-job';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

export const editJob = async (jobId: number, data: IFormInputs, router: NextRouter, t: any) => {
  const _data: Partial<any> = {
    data: {
      title: data.title,
      description: data.description,
      nationality: +data.nationality,
      religion: data.religion,
      startingDate: data.startingDate ? new Date(data.startingDate)?.toISOString() : undefined,
      jobType: data.skills?.map((skill) => +skill.value) || [],
      minAge: +data.minAge,
      maxAge: +data.maxAge,
      gender: data.gender,
      location: {
        city: data.city,
        region: data.region,
      },
      drivingLicense: data.drivingLicense,
      yearsOfExperience: data.yearsOfExperience,
      languages: data.languages?.map((lang) => lang.value) || [],
    },
  };

  if (!data.nationality) delete _data.data['nationality'];
  if (!data.religion) delete _data.data['religion'];
  if (!data.startingDate) delete _data.data['startingDate'];

  try {
    const { status, data }: AxiosResponse = await axios.put(`/jobs/${jobId}`, _data);
    if (status === 200) {
      notify({ message: t('jobHasBeenUpdated'), router, type: 'success' });
      return { status: 200 };
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
    return { status: error.response?.data?.status };
  }
};
