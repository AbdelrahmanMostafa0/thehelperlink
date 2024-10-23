// react
import { forwardRef, ReactNode, useEffect, useState, useRef } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation, Trans } from 'next-i18next';

// types
import { IUser } from '@src/@types/user';
import { IHelper } from '@src/@types/helper';

// react-query
import { useQuery } from 'react-query';

// icons
import { CloseV2, Search } from '@src/assets/icons';

// api
import { getMyProfile } from '@src/api/GET/getMyProfile';
import { getApplicants } from '@src/api/GET/getApplicants';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// components
import Typography from '@src/components/Typography';
import TextField from '@src/components/TextField';

interface IProps {
  children?: ReactNode;
  selectedItem: IHelper | null;
  onChange: (attendee: IHelper | null) => void;
  errorText?: string;
  error?: boolean;
}

// @ts-ignore
const SearchInput: React.FC<IProps> = forwardRef((props, ref) => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const { t: tCommon } = useTranslation('common') as any;
  const [searchValue, setSearchValue] = useState<string>('');
  const [favoritesList, setFavoritesList] = useState<IHelper[]>([]);
  const [applicantsList, setApplicantsList] = useState<IHelper[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<'applicant' | 'favorites'>('applicant');
  const inputRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const { errorText, error, onChange, selectedItem } = props;
  const user = useUserStore((state) => state.userState);

  const { data: userData } = useQuery(
    ['get-my-profile'],
    () => getMyProfile(undefined, router.locale),
    { enabled: user?.userType === 'employer' }
  );

  const { data: applicants } = useQuery(['get-my-applicants'], () => getApplicants(), {
    enabled: user?.userType === 'employer',
  });

  useEffect(() => {
    if (userData) {
      setFavoritesList((userData as IUser).employer?.favouriteHelpers || []);
    }
  }, [userData]);

  useEffect(() => {
    if (applicants) {
      setApplicantsList((applicants as any[]).map((item) => item.helper) || []);
    }
  }, [applicants]);

  useEffect(() => {
    if (searchValue.length > 0) {
      const filteredList = (selectedGroup === 'favorites' ? favoritesList : applicantsList).filter(
        (item) => {
          const fullName = `${item.firstName} ${item.lastName}`;
          return fullName.toLowerCase().includes(searchValue.toLowerCase());
        }
      );
      selectedGroup === 'favorites'
        ? setFavoritesList(filteredList || (userData as IUser).employer?.favouriteHelpers || [])
        : setApplicantsList(filteredList || (applicants as any[]).map((item) => item.helper) || []);
    } else {
      selectedGroup === 'favorites'
        ? setFavoritesList((userData as IUser)?.employer?.favouriteHelpers || [])
        : setApplicantsList((applicants as any[])?.map((item) => item.helper) || []);
    }
  }, [searchValue, selectedGroup]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div className="flex flex-col gap-4 w-full items-start">
      <div ref={inputRef} className="relative w-full flex">
        <TextField
          autoComplete="new-password"
          onFocus={() => setFocused(true)}
          variant="bordered"
          label={
            <Typography variant="body2" fontweight="book">
              {t('meetWithHelper')}
            </Typography>
          }
          placeholder={t('searchForHelper')}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          startIcon={<Search className="w-4 h-4" />}
          endIcon={
            searchValue.length > 0 && (
              <CloseV2 onClick={() => setSearchValue('')} className="w-4 h-4 cursor-pointer" />
            )
          }
        />
        {/* dropdown */}
        {focused && (
          <div className="absolute top-[78px] z-10 max-h-[250px] overflow-y-auto left-0 w-full bg-customBackground rounded-sm border border-darkBlue-100 shadow-custom-shadow">
            <div className="flex flex-col gap-1">
              <div className="p-2 px-3 flex justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <Typography variant="caption" className="text-lightGreen-500 ">
                    {t('searchFromYour')}
                  </Typography>
                  <div className="flex items-center border border-darkBlue-100 rounded-md">
                    <Typography
                      tabIndex={0}
                      aria-label={t('searchFromFavorites')}
                      role="button"
                      onClick={() => setSelectedGroup('favorites')}
                      variant="caption"
                      className={`p-2 cursor-pointer transition-all duration-300 ease-in-out ${
                        selectedGroup === 'favorites' ? 'bg-lightGreen-500 text-white' : ''
                      }`}>
                      {t('favorites')}
                    </Typography>
                    <Typography
                      tabIndex={0}
                      aria-label={t('searchFromApplicants')}
                      role="button"
                      onClick={() => setSelectedGroup('applicant')}
                      variant="caption"
                      className={`p-2 cursor-pointer transition-all duration-300 ease-in-out ${
                        selectedGroup === 'applicant' ? 'bg-lightGreen-500 text-white' : ''
                      }`}>
                      {t('applicants')}
                    </Typography>
                  </div>
                </div>
                <Typography
                  onClick={() => setFocused(false)}
                  tabIndex={0}
                  role="button"
                  aria-label="close dropdown"
                  variant="caption"
                  textTransform="first-letter-capital"
                  className="text-darkOrange-500">
                  {t('close')}
                </Typography>
              </div>
              {(selectedGroup === 'favorites' ? favoritesList.length : applicantsList.length) >
              0 ? (
                (selectedGroup === 'favorites' ? favoritesList : applicantsList).map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between px-4 py-2 hover:bg-darkBlue-100 cursor-pointer ${
                      selectedItem?.id === item.id ? 'bg-darkBlue-100' : ''
                    }}`}
                    onClick={() => {
                      onChange(item);
                      setSearchValue(`${item.firstName} ${item.lastName}`);
                      setFocused(false);
                    }}>
                    <Typography variant="body2" fontweight="book">
                      {item.firstName} {item.lastName}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography variant="body2" fontweight="book" className="text-center p-4">
                  {t('noHelpersFound')}
                </Typography>
              )}
            </div>
          </div>
        )}
      </div>
      {selectedItem && (
        <div className="flex items-center gap-3">
          <Typography variant="body2" className="text-lightGreen-500">
            {t('selectedHelper')}: {selectedItem?.firstName} {selectedItem?.lastName}
          </Typography>
          <CloseV2
            onClick={() => {
              onChange(null);
              setSearchValue('');
            }}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
      )}
      {error && (
        <Typography variant="caption" className="text-darkOrange-500 ltr:text-left rtl:text-right">
          {tCommon(errorText || '')}
        </Typography>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
