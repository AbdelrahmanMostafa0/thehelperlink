import { number } from 'yup';
import {
  IEmployer,
  IFamilyChildren,
  IFamilyMembers,
  IGender,
  IReligion,
  IYearsOfExperience,
} from './user';
import { ICandidate, IHelper } from './helper';
import { IDataLocalized } from './common';

export interface IJobPost {
  id: number;
  title: string;
  gender: IGender;
  minAge: number;
  maxAge: number;
  religion: IReligion;
  yearsOfExperience: IYearsOfExperience;
  description: string;
  drivingLicense: boolean;
  startingDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  languages?: string[];
  active?: boolean;
  acceptedApplicants?: ICandidate[];
  nationality: IDataLocalized;
  jobType: IDataLocalized[];
  location: {
    region: IDataLocalized;
    city: IDataLocalized;
  };
  applicants?: { count: number };
  employer?: IEmployer;
  isFavourite: boolean;
}
