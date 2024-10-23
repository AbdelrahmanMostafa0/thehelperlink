import { IDataList } from '@src/@types/common';

export const listTranslator = (locale: string, data: IDataList[]): IDataList[] => {
  // if locale is en-GB then return the same data
  if (locale === 'en-GB') {
    return data;
  }

  // if locale is not en-GB then translate the data
  const translatedData = data.map((item) => {
    const localizations = item.attributes.localizations?.data;
    const translation = localizations?.find(
      (localization) => localization.attributes.locale === locale
    );
    if (translation) {
      return {
        ...item,
        attributes: {
          ...item.attributes,
          name: translation.attributes.name,
        },
      };
    }
    return item;
  });
  return translatedData;
};

interface IHelperDataList {
  id: number;
  name: string;
  code?: string;
  locale: string;
  localizations: {
    id: number;
    name: string;
    code?: string;
    locale: string;
  }[];
}

export const helperListTranslator = (
  locale: string,
  data: IHelperDataList[]
): IHelperDataList[] => {
  // if locale is en-GB then return the same data
  if (locale === 'en-GB') {
    return data;
  }

  // if locale is not en-GB then translate the data
  const translatedData = data.map((item) => {
    const localizations = item.localizations;
    const translation = localizations?.find((localization) => localization.locale === locale);
    if (translation) {
      return {
        ...item,
        name: translation.name,
      };
    }
    return item;
  });
  return translatedData;
};
