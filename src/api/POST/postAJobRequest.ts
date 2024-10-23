// types
import { IFormInputs } from '@pages/post-a-job';
import { NextRouter } from 'next/router';

// EXTERNAL PACKAGES
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

// routes
import { ROUTES_URL } from '@src/routes';

export const postAJobRequest = async (data: IFormInputs, router: NextRouter, t: any) => {
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
    const { status, data }: AxiosResponse = await axios.post('/jobs', _data);
    if (status === 200) {
      notify({ message: t('applicationSuccess'), router, type: 'success' });
      setTimeout(() => {
        router.push(ROUTES_URL.navRoutes.user.jobPosts.main);
      }, 3000);
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
