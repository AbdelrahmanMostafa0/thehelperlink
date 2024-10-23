// EXTERNAL PACKAGES
import axios from 'axios';

const getNotifications = async ({
  page,
  pageSize,
  infinite = false,
}: {
  page?: number;
  pageSize?: number;
  infinite?: boolean;
}) => {
  let url = '/notifications/me';

  const params: Partial<any> = {
    page,
    pageSize,
    'pagination[limit]': -1,
    sort: 'createdAt:desc',
  };

  if (!infinite) {
    delete params['pagination[limit]'];
  } else {
    delete params['page'];
    delete params['pageSize'];
  }

  return await axios
    .get(url, {
      params,
    })
    .then((res) => res.data)
    .catch((error) => {});
};

export { getNotifications };
