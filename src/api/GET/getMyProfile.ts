// NEXT JS
import { GetServerSidePropsContext } from 'next';

// EXTERNAL PACKAGES
import axios from 'axios';

// constants
import { API_URL } from '@src/constants';

const getMyProfile = async (ctx?: GetServerSidePropsContext, locale?: string) => {
  let url = '/users/me';
  const headers: Partial<{ Authorization: string; 'Accept-Encoding': string; locale: string }> = {
    Authorization: `Bearer ${ctx?.req.cookies.token}`,
  };
  if (typeof window === 'undefined') {
    url = `${API_URL}/users/me`;
  } else {
    delete headers['Authorization'];
  }

  return await axios
    .get(url, {
      headers,
    })
    .then((res) => res.data)
    .catch((error) => {});
};

export { getMyProfile };
