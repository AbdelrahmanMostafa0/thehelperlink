// EXTERNAL PACKAGES
import axios from 'axios';

// constans
import { API_URL } from '@src/constants';

export const getQuestions = async (locale: string) => {
  let url = '/questions/me';
  if (typeof window === 'undefined') {
    url = `${API_URL}/questions/me`;
  }
  const params: Partial<{
    'pagination[limit]': number;
  }> = {
    'pagination[limit]': -1,
  };

  return await axios
    .get(url, {
      params,
    })
    .then((res) => res.data)
    .catch((error) => {});
};
