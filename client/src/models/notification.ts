export type Notification = {
    id?: string;
    groupId: string;
    userId?: string;
    to?: string;
    state?: boolean;
};

export type NotificationState = {
    notifications: Notification[];
};

