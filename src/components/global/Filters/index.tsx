// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// hooks
import useComponentVisible from '@src/hooks/useComponentVisible';

// components
import Button from '@src/components/Button';
import Typography from '@src/components/Typography';
import JobsFiltersLabelDesktop from './JobsFiltersLabelDesktop';
import HelprsFiltersLabelDesktop from './HelprsFiltersLabelDesktop';
import FilterModal from './FilterModal';

interface IProps {
  children?: ReactNode;
  filtersType: 'vacancies' | 'helpers';
}

const Filters: React.FC<IProps> = ({ filtersType = 'vacancies' }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  // check active filters
  const queries = { ...router.query };
  if (filtersType === 'helpers') {
    delete queries['currentHelperId'];
  } else {
    delete queries['currentJobId'];
  }
  delete queries['page'];
  const queryList = Object.keys(queries).map((q) => q);

  return (
    <div className="w-full flex py-3 lg:bg-white mb-8 relative">
      <div className="w-full hidden lg:flex max-w-7xl mx-auto gap-2 px-4 items-center flex-wrap">
        <Typography variant="caption" className="mr-2 w-full lg:w-auto">
          {t('filters')}
        </Typography>
        {filtersType === 'helpers' ? (
          <HelprsFiltersLabelDesktop setModalOpen={setIsComponentVisible} />
        ) : (
          <JobsFiltersLabelDesktop setModalOpen={setIsComponentVisible} />
        )}
      </div>
      <span className="relative lg:hidden">
        {queryList.length > 0 && (
          <span className="flex absolute -top-1 ltr:-right-1 ltr:left-unset rtl:-left-1 rtl:right-unset">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-darkOrange-500 opacity-75" />
            <span className="w-3 h-3 rounded-full bg-darkOrange-500" />
          </span>
        )}

        <Button
          className="flex lg:hidden ltr:ml-5 rtl:mr-5"
          color="green"
          loadMoreButton
          onClick={() => setIsComponentVisible(true)}>
          <Typography variant="caption">{t('showFilters')}</Typography>
        </Button>
      </span>

      {/* modal filter */}
      <FilterModal
        ref={ref}
        filtersType={filtersType}
        modalOpen={isComponentVisible}
        setModalOpen={setIsComponentVisible}
      />
    </div>
  );
};

export default Filters;
