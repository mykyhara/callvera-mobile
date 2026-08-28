export type Notification = {
  id: string;
  userId: string | null;
  accountId: string | null;
  locationName: string | null;
  brandName: string | null;
  notificationType: string | null;
  objectType: string | null;
  objectId: string | null;
  actionRequired: boolean;
  status: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  contactName: string | null;
  contactPhone: string | null;
  isAdmin: boolean;
  totalCount?: number;
};

export type NotificationsPage = {
  rows: Notification[];
  page: number;
  pageSize: number;
  totalCount: number;
};
