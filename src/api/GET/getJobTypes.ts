// EXTERNAL PACKAGES
import axios from 'axios';

// constants
import { API_URL } from '@src/constants';

export const getJobTypes = async (locale: string) => {
  let url = '/job-types';
  if (typeof window === 'undefined') {
    url = `${API_URL}/job-types`;
  }
  const params: Partial<{ locale: string; 'pagination[limit]': number; populate: string }> = {
    'pagination[limit]': -1,
    populate: 'localizations',
  };

  return await axios
    .get(url, {
      params,
    })
    .then((res) => res.data)
    .catch((error) => {});
};
