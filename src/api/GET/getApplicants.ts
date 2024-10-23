// axios
import axios from 'axios';

// constans
import { API_URL } from '@src/constants';

export const getApplicants = async () => {
  let url = '/meetings/applicants';
  if (typeof window === 'undefined') {
    url = `${API_URL}/meetings/applicants`;
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
    .catch((error) => error);
};
