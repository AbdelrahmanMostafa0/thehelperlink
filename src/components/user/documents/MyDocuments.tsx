// react
import React, { useEffect, useState } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// api
import { uploadDocument } from '@src/api/POST/uploadDocument';
import { deleteDocument } from '@src/api/PUT/deleteDocument';

// types
import { IHelperDocuments, IUser } from '@src/@types/user';

// components
import Typography from '@src/components/Typography';
import Upload from '@src/components/Upload';

interface IProps {
  data?: IUser;
}

interface IFiles {
  cv: File | null;
  drivingLicense: File | null;
  firstAidTraining: File | null;
  passport: File | null;
}

export type IField = 'passport' | 'firstAidTraining' | 'drivingLicense' | 'cv';

const MyDocuments: React.FC<IProps> = ({ data }) => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const { userState, changeUserState } = useUserStore((state) => state);
  const [loading, setLoading] = useState({
    cv: false,
    drivingLicense: false,
    firstAidTraining: false,
    passport: false,
  });
  const [files, setFiles] = useState<IFiles>({
    cv: null,
    drivingLicense: null,
    firstAidTraining: null,
    passport: null,
  });
  const [filesInfo, setFilesInfo] = useState<IHelperDocuments>({
    cv: null,
    drivingLicense: null,
    firstAidTraining: null,
    passport: null,
  });

  // console.log('data:', data);
  useEffect(() => {
    if (data) {
      changeUserState(data);
    }
  }, [data]);

  const upload = async (name: IField) => {
    setLoading({ ...loading, [name]: true });
    await uploadDocument(files[name], userState, router, name, t, changeUserState, setFilesInfo)
      .then(() => {
        setLoading({ ...loading, [name]: false });
      })
      .catch(() => {
        setLoading({ ...loading, [name]: false });
      });
  };

  useEffect(() => {
    if (data?.helper?.documents) {
      setFilesInfo(data.helper?.documents);
    }
  }, [data?.helper?.documents]);

  useEffect(() => {
    if (files.firstAidTraining) {
      upload('firstAidTraining');
    }
  }, [files.firstAidTraining]);

  useEffect(() => {
    if (files.passport) {
      upload('passport');
    }
  }, [files.passport]);

  useEffect(() => {
    if (files.cv) {
      upload('cv');
    }
  }, [files.cv]);

  useEffect(() => {
    if (files.drivingLicense) {
      upload('drivingLicense');
    }
  }, [files.drivingLicense]);

  const handleDeleteDoc = (field: IField) => {
    if (!shouldDisable) {
      setLoading({ ...loading, [field]: true });
      deleteDocument(userState, router, field, t, changeUserState)
        .then((_) => {
          setFilesInfo({ ...filesInfo, [field]: null });
          setFiles({ ...files, [field]: null });
          setLoading({ ...loading, [field]: false });
        })
        .catch((_) => {
          setLoading({ ...loading, [field]: false });
        });
    }
  };

  const shouldDisable =
    loading.cv || loading.passport || loading.drivingLicense || loading.firstAidTraining;

  return (
    <div className="w-full flex flex-col text-center">
      <Typography variant="h3" className="text-darkOrange-500 mb-12">
        {t('myDocuments')}
      </Typography>
      <div className="flex flex-col gap-7">
        <Upload
          label={
            <Typography variant="h6" fontweight="book">
              {t('passport') + t('optional')}
            </Typography>
          }
          file={files.passport}
          variant="document"
          loading={loading.passport}
          _fileName={filesInfo.passport?.name}
          previewUrl={filesInfo.passport?.url}
          onChange={(e) => setFiles({ ...files, passport: e.target.files![0] })}
          onDelete={async () => await handleDeleteDoc('passport')}
          disable={shouldDisable}
        />
        <Upload
          label={
            <Typography variant="h6" fontweight="book">
              {t('firstAidLicense') + t('optional')}
            </Typography>
          }
          file={files.firstAidTraining}
          variant="document"
          loading={loading.firstAidTraining}
          _fileName={filesInfo.firstAidTraining?.name}
          previewUrl={filesInfo.firstAidTraining?.url}
          onChange={(e) => setFiles({ ...files, firstAidTraining: e.target.files![0] })}
          onDelete={async () => await handleDeleteDoc('firstAidTraining')}
          disable={shouldDisable}
        />

        <Upload
          label={
            <Typography variant="h6" fontweight="book">
              {t('Drivinglicense') + t('optional')}
            </Typography>
          }
          file={files.drivingLicense}
          variant="document"
          loading={loading.drivingLicense}
          _fileName={filesInfo.drivingLicense?.name}
          previewUrl={filesInfo.drivingLicense?.url}
          onChange={(e) => setFiles({ ...files, drivingLicense: e.target.files![0] })}
          onDelete={async () => await handleDeleteDoc('drivingLicense')}
          disable={shouldDisable}
        />
        <Upload
          label={
            <Typography variant="h6" fontweight="book">
              {t('CV') + t('optional')}
            </Typography>
          }
          file={files.cv}
          variant="document"
          loading={loading.cv}
          _fileName={filesInfo.cv?.name}
          previewUrl={filesInfo.cv?.url}
          onChange={(e) => setFiles({ ...files, cv: e.target.files![0] })}
          onDelete={async () => await handleDeleteDoc('cv')}
          disable={shouldDisable}
        />
      </div>
    </div>
  );
};

export default MyDocuments;
