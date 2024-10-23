// EXTERNAL PACKAGES
import axios from 'axios';

// constans
import { API_URL } from '@src/constants';

export const getRegions = async (locale: string) => {
  let url = '/regions';
  if (typeof window === 'undefined') {
    url = `${API_URL}/regions`;
  }
  const params: Partial<{
    populate: string;
    'pagination[limit]': number;
  }> = {
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
