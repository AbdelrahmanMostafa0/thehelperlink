import { IEmployer } from './employer';
import { IHelper } from './helper';

export interface IEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    attendee: IAttendee;
  };
}

export interface IAttendee {
  id: number;
  firstName: string;
  lastName: string;
  profileImage?: string;
  accepted?: boolean;
  wherebyLink?: string;
}

export interface IMeeting {
  start: string;
  id: number;
  end: string;
  createdAt: string;
  updatedAt: string;
  extraData: null;
  accepted: boolean;
  employer: IEmployer;
  helper: IHelper;
  whereby: {
    endDate: string;
    roomUrl: string;
    roomName: string;
    meetingId: string;
    startDate: string;
    hostRoomUrl: string;
  } | null;
}
