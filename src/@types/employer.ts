import { IDataLocalized } from './common';
import { IDocument, IFamilyChildren, IFamilyMembers, IGender, IReligion } from './user';

export interface IEmployer {
  id: number;
  firstName: string;
  lastName: string;
  gender: IGender;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  religion: IReligion;
  adults: IFamilyMembers;
  children: IFamilyChildren;
  location: {
    id: number;
    region: IDataLocalized;
    city: IDataLocalized;
  };
  nationality: IDataLocalized;
  profileImage: IDocument;
  chatengineId?: string;
  chatengineUsername?: string;
}
