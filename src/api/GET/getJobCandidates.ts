// EXTERNAL PACKAGES
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import * as qs from 'qs';

// TYPES
import { IYearsOfExperience } from '@src/@types/user';

interface IFilterQuery {
  nationality?: any;
  jobType?: number;
  gender?: string;
  yearsOfExperience?: {
    $eq?: IYearsOfExperience;
  };
  minAge: {
    $gte?: string;
  };
  maxAge: {
    $lte?: string;
  };
  languages: {
    $containsi?: string;
  };
}

const getJobCandidates = async ({
  jobId,
  page,
  pageSize,
  queries,
}: {
  jobId: string;
  page: number;
  pageSize: number;
  queries?: ParsedUrlQuery;
}) => {
  const filters = { ...queries };
  delete filters['page'];
  Object.keys(filters).forEach((key, index) => {
    if (filters[key] === undefined) {
      delete filters[key];
    }
  });

  const filtersquery: IFilterQuery = {
    nationality: +(filters['nationality'] as string) || undefined,
    jobType: +(filters['jobType'] as string) || undefined,
    gender: (filters['gender'] as string) || undefined,
    yearsOfExperience: {
      $eq: (filters['yearsOfExperience'] as IYearsOfExperience) || undefined,
    },
    minAge: {
      $gte: (filters['minAge'] as string) || undefined,
    },
    maxAge: {
      $lte: (filters['maxAge'] as string) || undefined,
    },
    languages: {
      $containsi: (filters['language'] as string) || undefined,
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
    page,
    pageSize,
  };

  return await axios
    .get(`${`/jobs/${jobId}/applicants`}?${query}`, {
      params,
    })
    .then((res) => res.data)
    .catch((error) => {});
};

export { getJobCandidates };
