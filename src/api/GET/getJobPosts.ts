// NEXT JS
import { GetServerSidePropsContext } from 'next';

// EXTERNAL PACKAGES
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import * as qs from 'qs';

// CONSTANTS
import { API_URL } from '@src/constants';

// UTILS
import { fixNumbers } from '@src/utils/REGEX';

interface IFilterQuery {
  maxAge: {
    $lte?: string;
  };
  minAge: {
    $gte?: string;
  };
  yearsOfExperience: {
    $eq?: string;
  };
}

const getJobPosts = async ({
  page,
  pageSize,
  queries,
  locale,
}: {
  page: number;
  pageSize: number;
  queries: ParsedUrlQuery;
  locale?: string;
}) => {
  let url = '/jobs';
  if (typeof window === 'undefined') {
    url = `${API_URL}/jobs`;
  }
  const filters = queries;
  delete filters['currentJobId'];
  delete filters['page'];

  Object.keys(filters).forEach((key, index) => {
    if (filters[key] === undefined) {
      delete filters[key];
    }
  });
  const filtersquery: IFilterQuery = {
    yearsOfExperience: {
      $eq: (filters['yearsOfExperience'] as string) || undefined,
    },
    maxAge: {
      $lte: fixNumbers(filters['maxAge'] as string) || undefined,
    },
    minAge: {
      $gte: fixNumbers(filters['minAge'] as string) || undefined,
    },
  };

  const query = qs.stringify(
    {
      filters: filtersquery,
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const params: Partial<any> = {
    locale,
    page,
    pageSize,
    'filters[location][city]': (filters['city'] as string) || undefined,
    'filters[location][region]': (filters['region'] as string) || undefined,
  };
  if (locale === 'en-GB') {
    delete params['locale'];
  }
  if (!params['filters[location][city]']) delete params['filters[location][city]'];
  if (!params['filters[location][region]']) delete params['filters[location][region]'];

  return await axios
    .get(`${url}?${query}`, {
      params,
    })
    .then((res) => res.data)
    .catch((error) => {});
};

const getSingleJobPost = async (id: string, locale?: string, ctx?: GetServerSidePropsContext) => {
  let url = `/jobs/${id}`;
  const headers: Partial<{ Authorization: string; 'Accept-Encoding': string; locale: string }> = {
    Authorization: `Bearer ${ctx?.req.cookies.token}`,
  };
  if (typeof window === 'undefined') {
    url = `${API_URL}/jobs/${id}`;
  } else {
    delete headers['Authorization'];
  }

  const params: Partial<any> = {
    locale,
  };
  if (locale === 'en-GB') {
    delete params['locale'];
  }

  return await axios
    .get(url, {
      params,
    })
    .then((res) => res.data)
    .catch((error) => {});
};

export { getJobPosts, getSingleJobPost };
