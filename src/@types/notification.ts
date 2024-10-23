import { IMeeting } from './calendarEvent';
import { IHelper } from './helper';
import { IJobPost } from './jobPost';

export interface INotification {
  id: number;
  unseen: boolean;
  message?: string;
  createdAt: string;
  updatedAt: string;
  type:
    | 'staff'
    | 'application-status'
    | 'new-applicant'
    | 'event-request-created'
    | 'event-request-edited'
    | 'event-request-answer'
    | 'event-request-deleted';
  extraData?: {
    meeting?: IMeeting;
    helper?: IHelper;
    job?: IJobPost;
  };
}
