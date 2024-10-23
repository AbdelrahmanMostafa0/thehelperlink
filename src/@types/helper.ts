import { IDataLocalized } from './common';
import { IDocument, IGender, ILocation, IReligion, IYearsOfExperience } from './user';

export interface IHelper {
  id: number;
  firstName: string;
  lastName: string;
  gender: IGender;
  dateOfBirth: string;
  languages?: string[];
  bio?: string;
  createdAt: string;
  updatedAt: string;
  religion?: IReligion;
  yearsOfExperience: IYearsOfExperience;
  nationality: IDataLocalized;
  location: ILocation;
  jobType: IDataLocalized[];
  skills: IDataLocalized[];
  profileImage?: IDocument;
  isFavourite: boolean;
  chatengineId?: string;
  chatengineUsername?: string;
}

export interface ICandidate {
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  helper: IHelper;
}
