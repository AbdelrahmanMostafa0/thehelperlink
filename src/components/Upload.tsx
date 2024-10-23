// react
import { ReactNode, useEffect, useRef, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CloseIcon, Edit, Plus, Trash } from '@src/assets/icons';

// components
import Typography from './Typography';
import Spinner from '@src/components/Spinner';

// i18next
import { useTranslation } from 'next-i18next';

interface IProps {
  variant?: 'image' | 'document';
  label?: ReactNode;
  file: File | null;
  userImage?: string;
  _fileName?: string;
  loading: boolean;
  previewUrl?: string;
  onDelete: () => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
}

const Upload: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation('user');
  const {
    variant = 'image',
    label,
    file,
    userImage = '',
    _fileName = undefined,
    loading,
    previewUrl,
    onChange,
    onDelete,
    disable = false,
  } = props;

  const InputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const [fileName, setfileName] = useState('');

  useEffect(() => {
    if (_fileName) {
      setfileName(_fileName);
    }
  }, [_fileName]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      if (variant === 'image') {
        setSelectedImage(URL.createObjectURL(e.target.files![0]));
      }
      setfileName(e.target.value);
      onChange(e);
    }
  };

  const handleDelete = async () => {
    if (!loading && !disable) {
      await onDelete().then((_) => {
        setfileName('');
        setSelectedImage('');
        if (InputRef.current) InputRef.current.value = '';
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col items-start gap-3">
      {label && label}
      {variant === 'image' ? (
        <div
          style={{
            backgroundImage: selectedImage
              ? `url(${selectedImage})`
              : userImage
              ? `url(${userImage})`
              : 'url(/images/user-avatar.png)',
          }}
          className="bg-center bg-no-repeat bg-cover w-[87px] h-[87px] rounded-md self-center relative">
          <span
            title={userImage ? 'edit upload avatar image' : 'add upload avatar image'}
            tabIndex={0}
            aria-label={userImage ? 'edit upload avatar image' : 'add upload avatar image'}
            role="button"
            onClick={() => !loading && InputRef.current?.click()}
            className="absolute top-1 text-lightBlue-500 ltr:right-1 rtl:right-unset ltr:left-unset rtl:left-1 bg-white p-0.5 rounded-sm flex items-center justify-center shadow-custom-light-shadow border-[0.5px] border-lightBlue-500">
            {userImage ? <Edit className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          </span>
          {userImage && (
            <span
              title="delete avatar image"
              tabIndex={0}
              aria-label="delete avatar image"
              onClick={handleDelete}
              role="button"
              className="cursor-pointer absolute top-6 ltr:right-1 rtl:right-unset ltr:left-unset rtl:left-1 bg-white p-0.5 rounded-sm flex items-center justify-center shadow-custom-light-shadow border-[0.5px] border-darkOrange-500">
              <Trash className="w-3 h-3" />
            </span>
          )}
          {loading && (
            <span className="w-full h-full cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 flex items-center justify-center">
              <Spinner className="w-6 h-6" />
            </span>
          )}
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <div
            onClick={() => !loading && InputRef.current?.click()}
            className="text-darkBlue-100 w-full flex cursor-pointer">
            <Typography
              variant="body2"
              fontweight="book"
              className={`${file || fileName ? 'text-darkBlue-300' : 'text-lightGreen-500'}`}>
              {file || fileName
                ? `${fileName.split('\\')[fileName.split('\\').length - 1]}`
                : `+ ${t('Attachfile')}`}
            </Typography>
          </div>

          {(file || fileName) && !loading && (
            <span
              onClick={handleDelete}
              role="button"
              tabIndex={0}
              aria-label="delete upload file"
              className="p-1 cursor-pointer">
              <CloseIcon className="w-3 h-3" />
            </span>
          )}
          {loading && <Spinner />}
          {previewUrl ? (
            <Link href={previewUrl} target="_blank" className="underline text-lightGreen-500">
              <Typography className="text-lightGreen-500" variant="caption">
                {t('preview')}
              </Typography>
            </Link>
          ) : null}
        </div>
      )}
      <input
        disabled={disable}
        accept={
          variant === 'image'
            ? 'image/png, image/gif, image/jpeg, image/jpg'
            : 'application/pdf, image/png, image/gif, image/jpeg, image/jpg'
        }
        ref={InputRef}
        onChange={handleUpload}
        type="file"
        className="hidden"
      />
    </div>
  );
};

export default Upload;
