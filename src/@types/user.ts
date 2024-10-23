import { IDataLocalized } from './common';
import { IHelper as IExtendedHelper } from './helper';
import { IJobPost } from './jobPost';

// user type
export interface IUser {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  provider: 'local';
  confirmed: boolean;
  confirmedPhoneNumber: boolean;
  blocked: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  employer?: IEmployer;
  helper?: IHelper;
  userType: 'helper' | 'employer';
  firstName: string;
  lastName: string;
  address: string;
  gender: IGender;
  dateOfBirth: string;
  nationality: INationality;
  city?: string;
  country?: string;
  religion?: IReligion;
  chatengineId?: string;
  chatengineUsername?: string;
}

// employer type
export interface IEmployer {
  id: number;
  adults?: IFamilyMembers;
  children?: IFamilyChildren;
  createdAt: string;
  updatedAt: string;
  location: ILocation;
  favouriteHelpers: IExtendedHelper[];
  religion?: IReligion;
  profileImage?: IDocument;
}

export type IFamilyMembers = '0' | '1' | '2' | '3' | '4' | '5+';
export type IFamilyChildren = '0' | '1' | '2' | '3' | '4' | '5+';

// helper type
export interface IHelper {
  id: number;
  isEmployed?: boolean;
  skills?: ISkill[];
  languages: string[];
  passportNumber?: any;
  visaExpirationDate?: any;
  firstAidTraining?: any;
  validDrivingLicense?: any;
  bio?: string;
  shortDescription?: string;
  createdAt: string;
  updatedAt: string;
  documents: IHelperDocuments;
  jobType: IJobType[];
  yearsOfExperience: IYearsOfExperience;
  location: ILocation;
  favouriteJobs: IJobPost[];
  profileImage?: IDocument;
  score?: number;
}

// religion type
export type IReligion = 'muslim' | 'non-muslim';

// years of experience type
export type IYearsOfExperience =
  | 'no experience'
  | '1-2 years'
  | '3-5 years'
  | '5-10 years'
  | '10+ years';

// gender type
export type IGender = 'male' | 'female';

// document type for helper
export interface IHelperDocuments {
  passport?: IDocument | null;
  firstAidTraining?: IDocument | null;
  drivingLicense?: IDocument | null;
  cv?: IDocument | null;
}

// document type
export interface IDocument {
  id: number;
  name: string;
  width: number;
  height: number;
  formats: {
    small: IDocumentFormat;
    thumbnail: IDocumentFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: string;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
}

// document format type
interface IDocumentFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

// location type
export interface ILocation {
  id: number;
  country?: {
    id: number;
    name: string;
    code?: string | number;
    locale: string;
    localizations?: IDataLocalized[];
  };
  region?: {
    id: number;
    name: string;
    code?: string | number;
    locale: string;
    localizations?: IDataLocalized[];
  };
  city: {
    id: number;
    locale: string;
    name: string;
    localizations?: IDataLocalized[];
  };
}

// nationality type
export interface INationality {
  id: number;
  name: string;
  localizations?: IDataLocalized[];
}

// job type type
export interface IJobType {
  id: number;
  name: string;
  localizations?: IDataLocalized[];
}

// skills type
export interface ISkill {
  id: number;
  name: string;
  localizations?: IDataLocalized[];
}
