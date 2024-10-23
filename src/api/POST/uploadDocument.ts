// NEXT JS
import { NextRouter } from 'next/router';

// types
import { IHelperDocuments, IUser } from '@src/@types/user';
import { IField } from '@src/components/user/documents/MyDocuments';

// axios
import axios, { AxiosResponse } from 'axios';

// utils
import { notify } from '@src/utils/notify';

// lodash
import _ from 'lodash';

export const uploadDocument = async (
  file: any,
  userState: IUser | null,
  router: NextRouter,
  field: IField,
  t: any,
  changeUserState: (userInfo: IUser) => void,
  setFilesInfo: React.Dispatch<React.SetStateAction<IHelperDocuments>>
) => {
  const document = new FormData();
  document.append('files', file);
  document.append('ref', 'api::helper.helper');
  document.append('refId', userState?.helper?.id?.toString() || '');
  document.append('field', `documents.${field}`);

  const docClone: IHelperDocuments | undefined = _.cloneDeep(userState?.helper?.documents);
  const newDocs = docClone
    ? Object.keys(docClone).reduce((acc: any, key) => {
        acc[key] = docClone[key as keyof typeof docClone]
          ? docClone[key as keyof typeof docClone]?.id
          : null;
        return acc;
      }, {})
    : {};

  try {
    await axios
      .post('/upload', document, {
        headers: {
          'x-client-destination': 'helper',
        },
      })
      .then(async ({ data: uploadedData, status: uploadStatus }) => {
        if (uploadStatus === 200) {
          const { status, data: receivedData }: AxiosResponse = await axios.put('/users/me', {
            documents: {
              ...newDocs,
              [field]: uploadedData[0].id,
            },
          });
          const _data = receivedData as IUser;
          if (status === 200) {
            changeUserState(receivedData as IUser);
            if (_data?.helper?.documents) {
              setFilesInfo(_data.helper.documents);
            }
            notify({ message: t('yourFileHasBeenAttached'), router, type: 'success' });
          }
        }
      })
      .catch((error) =>
        notify({ message: error?.response?.data?.error?.message, router, type: 'error' })
      );
  } catch (error: any) {
    notify({ message: error?.response?.data?.error?.message, router, type: 'error' });
  }
};
