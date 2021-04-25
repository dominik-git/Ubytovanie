import { AttachmentModel } from './attachment.model';


export interface PointModel {
  value: string;
  attachments: AttachmentModel[];
}
