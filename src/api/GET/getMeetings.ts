// EXTERNAL PACKAGES
import axios from 'axios';

// constants
import { API_URL } from '@src/constants';

export const getMyMeetings = async (from?: string, to?: string) => {
  let url = '/meetings/me';
  if (typeof window === 'undefined') {
    url = `${API_URL}/meetings/me`;
  }
  const params: Partial<{ from: string; to: string }> = {
    from: from || new Date(new Date().getTime() - 45 * 60 * 1000).toISOString(),
    to: to || new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
  };

  return await axios
    .get(url, {
      params,
    })
    .then((res) => res.data)
    .catch((error) => {});
};
