// NEXT JS
import { GetServerSidePropsContext } from 'next';
// axios
import axios from 'axios';

// constans
import { API_URL } from '@src/constants';

const getEmployerJobs = async ({
  page,
  pageSize,
  locale,
  ctx,
}: {
  page: number;
  pageSize: number;
  locale?: string;
  ctx?: GetServerSidePropsContext;
}) => {
  let url = '/jobs/me';

  const headers: Partial<{ Authorization: string; 'Accept-Encoding': string; locale: string }> = {
    Authorization: `Bearer ${ctx?.req.cookies.token}`,
  };

  if (typeof window === 'undefined') {
    url = `${API_URL}/jobs/me`;
  } else {
    delete headers['Authorization'];
  }

  const params: Partial<any> = {
    locale,
    page,
    pageSize,
  };
  if (locale === 'en-GB') {
    delete params['locale'];
  }

  return await axios
    .get(url, {
      params,
      headers,
    })
    .then((res) => res.data)
    .catch((error) => error);
};

export { getEmployerJobs };
