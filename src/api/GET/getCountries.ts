// axios
import axios from 'axios';

// constans
import { API_URL } from '@src/constants';

export const getCountries = async (locale: string) => {
  let url = '/countries';
  if (typeof window === 'undefined') {
    url = `${API_URL}/countries`;
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
    .catch((error) => error);
};
