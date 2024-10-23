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

export const deleteDocument = async (
  userState: IUser | null,
  router: NextRouter,
  field: IField,
  t: any,
  changeUserState: (userInfo: IUser) => void
) => {
  try {
    const docClone: IHelperDocuments | undefined = _.cloneDeep(userState?.helper?.documents);
    const newDocs = docClone
      ? Object.keys(docClone).reduce((acc: any, key) => {
          acc[key] = docClone[key as keyof typeof docClone]
            ? docClone[key as keyof typeof docClone]?.id
            : null;
          return acc;
        }, {})
      : {};

    newDocs[field] = null;

    const { status, data: receivedData }: AxiosResponse = await axios.put('/users/me', {
      documents: newDocs,
    });
    if (status === 200) {
      changeUserState(receivedData as IUser);
      notify({ message: t('yourFiledHasBeenDeleted'), router, type: 'success' });
    }
  } catch (error: any) {
    notify({ message: error?.response?.data?.error?.message, router, type: 'error' });
  }
};
