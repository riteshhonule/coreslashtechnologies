export type NotificationType =
  | 'EMAIL'
  | 'IN_APP'
  | 'SYSTEM'
  | 'SMS'
  | 'PUSH'
  | 'WHATSAPP';

export interface INotificationPayload {
  type: NotificationType;
  template: string;
  recipient: string;
  userId?: number;
  subject?: string;
  data?: Record<string, any>;
  eventId?: string;
}

export interface INotificationJob {
  payload: INotificationPayload;
  attempt: number;
  timestamp: string;
}

export interface NotificationProvider {
  send(payload: INotificationPayload): Promise<boolean>;
  sendBulk?(payloads: INotificationPayload[]): Promise<boolean>;
}
