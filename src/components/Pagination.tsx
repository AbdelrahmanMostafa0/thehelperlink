// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// next-usequerystate
import { useQueryState } from 'next-usequerystate';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';

interface IProps {
  children?: ReactNode;
  total: number;
  pageCount: number;
  pageSize: number;
}

const Pagination: React.FC<IProps> = ({ total, pageCount, pageSize = 5 }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });

  return (
    <div className=" flex flex-col gap-3 text-center items-center">
      <Typography fontweight="book" variant="caption">
        {t('showing')}{' '}
        <span className="font-medium">
          {(+page * pageSize - pageSize + 1).toLocaleString(router.locale)}
        </span>{' '}
        {t('to')}{' '}
        <span className="font-medium">
          {(+page * pageSize > total ? total : +page * pageSize).toLocaleString(router.locale)}
        </span>{' '}
        {t('of')} <span className="font-medium">{total.toLocaleString(router.locale)}</span>{' '}
        {t('entries')}
      </Typography>
      <div className="flex items-center gap-2">
        <Button
          className="min-h-[44px]"
          loadMoreButton
          back
          disabled={+page === 1}
          onClick={() =>
            setPage((prevState) => (+prevState - 1).toString(), { scroll: true, shallow: true })
          }>
          <Typography variant="caption">{t('prev')}</Typography>
        </Button>
        <Button
          className="min-h-[44px]"
          color="green"
          loadMoreButton
          disabled={+page === pageCount}
          onClick={() =>
            setPage((prevState) => (+prevState + 1).toString(), { scroll: true, shallow: true })
          }>
          <Typography variant="caption">{t('next')}</Typography>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
