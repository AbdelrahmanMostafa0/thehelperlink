// EXTERNAL PACKAGES
import axios from 'axios';

// constants
import { API_URL } from '@src/constants';

export const getSkills = async (locale: string) => {
  let url = '/skills';
  if (typeof window === 'undefined') {
    url = `${API_URL}/skills`;
  }
  const params: Partial<{ 'pagination[limit]': number; populate: string }> = {
    populate: 'localizations',
    'pagination[limit]': -1,
  };

  return await axios
    .get(url, {
      params,
    })
    .then((res) => res.data)
    .catch((error) => {});
};
