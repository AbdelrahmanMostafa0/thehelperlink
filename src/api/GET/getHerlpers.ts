// EXTERNAL PACKAGES
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import * as qs from 'qs';

// CONSTANTS
import { API_URL } from '@src/constants';

// UTILS
import { fixNumbers } from '@src/utils/REGEX';

interface IFilterQuery {
  nationality?: any;
  yearsOfExperience?: {
    $eq?: string;
  };
  gender?: string;
  minAge: {
    $gte?: string;
  };
  maxAge: {
    $lte?: string;
  };
}

const getHelpers = async ({
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
  let url = '/helpers';
  if (typeof window === 'undefined') {
    url = `${API_URL}/helpers`;
  }
  const filters = { ...queries };
  delete filters['currentHelperId'];
  delete filters['page'];
  Object.keys(filters).forEach((key, index) => {
    if (filters[key] === undefined) {
      delete filters[key];
    }
  });

  const filtersquery: IFilterQuery = {
    nationality: +(filters['nationality'] as string) || undefined,
    yearsOfExperience: {
      $eq: (filters['yearsOfExperience'] as string) || undefined,
    },
    gender: (filters['gender'] as string) || undefined,
    minAge: {
      $gte: fixNumbers(filters['minAge'] as string) || undefined,
    },
    maxAge: {
      $lte: fixNumbers(filters['maxAge'] as string) || undefined,
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
  };
  if (locale === 'en-GB') {
    delete params['locale'];
  }

  return await axios
    .get(`${url}?${query}`, {
      params,
    })
    .then((res) => res.data)
    .catch((error) => {});
};

const getSingleHelper = async (id: string, locale?: string) => {
  let url = `/helpers/${id}`;
  if (typeof window === 'undefined') {
    url = `${API_URL}/helpers/${id}`;
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

export { getHelpers, getSingleHelper };
