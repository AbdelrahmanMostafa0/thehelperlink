// NEXT JS
import { GetServerSidePropsContext } from 'next';

// EXTERANL PACKAGE
import axios from 'axios';

// TYPES
import { IJobPost } from '@src/@types/jobPost';

// constants
import { API_URL } from '@src/constants';

const getMyApplications = async (ctx?: GetServerSidePropsContext) => {
  let url = '/applications/me';
  const headers: Partial<{ Authorization: string; 'Accept-Encoding': string }> = {
    Authorization: `Bearer ${ctx?.req.cookies.token}`,
  };
  if (typeof window === 'undefined') {
    url = `${API_URL}/applications/me`;
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

const convertApplicationToJobPost = (data: any[] | undefined) => {
  const newApplications: IJobPost[] | undefined = data?.map((el, _) => el.job);
  return newApplications;
};

export { getMyApplications, convertApplicationToJobPost };
