// NEXT JS
import { NextRouter } from 'next/router';

// types
import { IUser } from '@src/@types/user';
import { IFormInputs } from '@src/components/user/profile/HelperEdit';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';
import { fixNumbers } from '@src/utils/REGEX';

export const updateHelperProfile = async (
  data: IFormInputs,
  changeUserState: (userInfo: IUser) => void,
  router: NextRouter,
  t: any
) => {
  const formatedBirthDate = new Date(data.dateOfBirth).toISOString();

  const _data: Partial<any> = {
    username: data.email,
    email: data.email,
    firstName: data.name,
    lastName: data.surname,
    gender: data.gender,
    dateOfBirth: formatedBirthDate,
    phoneNumber: `${data.countryPhoneCode}${fixNumbers(data.phone)}`,
    nationality: +data.nationality,
    religion: data.religion,
    location: {
      country: +data.country,
      city: +data.city,
    },
    languages: data.languages?.map((lang) => lang.value) || [],
    jobType: data.skills?.map((skill) => +skill.value) || [],
    skills: data.otherSkills?.map((OS) => +OS.value) || [],
    yearsOfExperience: data.yearsOfExperience,
    bio: data.bio,
  };

  // console.log('_data:', _data);

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.put('/users/me', _data);
    if (status === 200) {
      changeUserState(receivedData as IUser);
      notify({ message: t('profileUpdated'), router, type: 'success' });
    }
  } catch (error: any) {
    notify({ message: error.response?.data?.error?.message, router, type: 'error' });
  }
};
