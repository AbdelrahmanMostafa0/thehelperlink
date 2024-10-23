// react
import React, { ReactNode, useEffect } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// icons
import { Cancel } from '@src/assets/icons';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import JobsFilterLabelsMobile from './JobsFilterLabelsMobile';
import HelprsFilterLabelsMobile from './HelprsFilterLabelsMobile';

interface IProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filtersType: 'helpers' | 'vacancies';
}

// @ts-ignore
const FilterModal: React.FC<IProps> = React.forwardRef((props, ref) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { filtersType, modalOpen, setModalOpen } = props;
  const [clearFilter, setClearFilter] = React.useState(false);
  const [submitFilters, setSubmitFilters] = React.useState(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  return (
    <div
      ref={ref}
      className={`flex flex-col p-5 justify-between shadow-custom-shadow bg-white min-w-[300px] h-screen supports-[height:100dvh]:h-[100dvh] fixed transition-all duration-200 ease-in-out top-0 right-0 z-30 ${
        modalOpen ? 'translate-x-0' : 'translate-x-[100%]'
      }`}>
      <div className="flex flex-col h-full">
        {/* header */}
        <div className="flex justify-between items-center gap-5">
          <Typography>{t('filters')}</Typography>
          <span className="p-2 cursor-pointer" onClick={() => setModalOpen(false)}>
            <Cancel className="w-6 h-w-6" />
          </span>
        </div>
        <hr className="my-4" />
        {/* filters */}
        <div className="flex flex-col gap-5 max-h-[calc(100vh-190px)] overflow-y-auto">
          {filtersType === 'helpers' ? (
            <HelprsFilterLabelsMobile
              clearFilter={clearFilter}
              setClearFilter={setClearFilter}
              submitFilters={submitFilters}
              setSubmitFilters={setSubmitFilters}
            />
          ) : (
            <JobsFilterLabelsMobile
              clearFilter={clearFilter}
              setClearFilter={setClearFilter}
              submitFilters={submitFilters}
              setSubmitFilters={setSubmitFilters}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col">
        {/* clear filters and show results buttons */}
        <hr className="my-4" />
        <div className="flex flex-wrap xs:items-center gap-2">
          <Button
            onClick={() => {
              setSubmitFilters(true);
              setModalOpen(false);
            }}
            loadMoreButton
            color="green"
            className="whitespace-nowrap">
            {t('showResults')}
          </Button>
          <Button onClick={() => setClearFilter(true)} className="bg-white whitespace-nowrap">
            {t('clearFilters')}
          </Button>
        </div>
      </div>
    </div>
  );
});

FilterModal.displayName = 'FilterModal';

export default FilterModal;
