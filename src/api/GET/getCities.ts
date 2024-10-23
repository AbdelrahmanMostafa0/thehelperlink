import axios from 'axios';

// constans
import { API_URL } from '@src/constants';

export const getCities = async (locale: string, relatedId?: string, isRegion: boolean = false) => {
  let url = '/cities';
  if (typeof window === 'undefined') {
    url = `${API_URL}/cities`;
  }
  const params: Partial<any> = {
    populate: 'localizations',
    'filters[country][id][$eq]': relatedId,
    'filters[region][id][$eq]': relatedId,
    'pagination[limit]': -1,
  };

  if (params['filters[country][id][$eq]'] === undefined || isRegion) {
    delete params['filters[country][id][$eq]'];
  }
  if (params['filters[region][id][$eq]'] === undefined || !isRegion) {
    delete params['filters[region][id][$eq]'];
  }

  return await axios
    .get(url, {
      params,
    })
    .then((res) => res.data)
    .catch((error) => error);
};
