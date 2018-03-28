export type Notification = {
    _id?: string;
    groupId: string;
    userId?: string;
    to?: string;
    state?: boolean;
};

export type User = {
    _id: string;
    email: string;
};

export type NotificationState = {
    notifications: Notification[];
    users: User[];
};

