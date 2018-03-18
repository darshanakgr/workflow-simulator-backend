export const FULL_ACCESS: number = 0;
export const VIEW_ONLY: number = 1;

export type WSError = {
    timestamp: number;
    name: string;
    message: string;
    groupId: string;
    extra?: object;
};

export type WSMessage = {
    timestamp: number;
    name?: string;
    message?: string;
    state: object;
};