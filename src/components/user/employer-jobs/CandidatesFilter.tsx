// react
import { ReactNode, useState, useRef, useEffect } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation } from 'next-i18next';

// icons
import { CloseV2, Filter } from '@src/assets/icons';

// hooks
import useMediaQuery from '@src/hooks/useMediaQuery';

// routes
import { ROUTES_URL } from '@src/routes';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import Filters from './Filters';

interface IProps {
  children?: ReactNode;
}

const CandidatesFilter: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [clearFilter, setClearFilter] = useState(false);
  const [submitFilters, setSubmitFilters] = useState(false);
  const windowWidth = useMediaQuery();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [modalRef]);

  const queries = { ...router.query };
  delete queries['page'];
  delete queries['post-id'];
  const queryList = Object.keys(queries).map((q) => q);

  useEffect(() => {
    if (open && windowWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open, windowWidth]);

  return (
    <div
      ref={modalRef}
      className="text-black absolute -top-10 ltr:right-0 ltr:left-unset rtl:left-0 rtl:right-unset">
      <div
        className="flex items-center gap-4 cursor-pointer"
        tabIndex={0}
        aria-label="candidates filters"
        onClick={() => setOpen((prevState) => !prevState)}
        role="button">
        <Filter className="w-5 h-4" />
        <Typography variant="body2">{t('filters')}</Typography>

        {queryList.length > 0 && (
          <span className="flex absolute -top-3 ltr:-right-1 ltr:left-unset rtl:-left-1 rtl:right-unset">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-darkOrange-500 opacity-75" />
            <span className="w-3 h-3 rounded-full bg-darkOrange-500" />
          </span>
        )}
      </div>
      {/* filter modal  */}
      <div
        className={`fixed top-[100px] left-0 z-10 slg:w-full slg:h-full lg:absolute lg:top-7 lg:z-10 lg:ltr:right-0 lg:ltr:left-unset lg:rtl:left-0 lg:rtl:right-unset flex flex-col shadow-custom-shadow bg-white lg:rounded-2xl px-4 py-6 min-w-[281px] transition-all duration-300 ease-in-out ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}>
        {/* title and clear button  */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            <span
              onClick={() => setOpen(false)}
              aria-label={t('closeFilterModal')}
              tabIndex={0}
              role="button">
              <CloseV2 className="w-5 h-5 lg:hidden" />
            </span>
            <Typography fontweight="black">{t('filterBy')}</Typography>
          </div>
          <Link
            href={`${ROUTES_URL.navRoutes.user.jobPosts.main}/${router.query['post-id']}${ROUTES_URL.navRoutes.user.jobPosts.candidates}`}
            shallow
            scroll={false}>
            <span
              tabIndex={0}
              aria-label={t('clearFilter')}
              role="button"
              onClick={() => setClearFilter(true)}>
              <Typography variant="caption" className="text-lightBlue-400">
                {t('clearAll')}
              </Typography>
            </span>
          </Link>
        </div>
        {/* filters fields */}
        <div className="flex flex-col w-full gap-5">
          <Filters
            clearFilter={clearFilter}
            setClearFilter={setClearFilter}
            submitFilters={submitFilters}
            setSubmitFilters={setSubmitFilters}
          />
        </div>
        {/* show result button  */}
        <Button
          className="mt-8"
          onClick={() => {
            setSubmitFilters(true);
            setOpen(false);
          }}>
          <Typography variant="caption">{t('showResults')}</Typography>
        </Button>
      </div>
    </div>
  );
};

export default CandidatesFilter;
