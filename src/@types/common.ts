export interface IDataList {
  id: number;
  attributes: {
    name: string;
    locale: string;
    localizations: {
      data: {
        id: string;
        attributes: {
          name: string;
          locale: string;
        };
      }[];
    };
  };
}

export interface IDataLocalized {
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
