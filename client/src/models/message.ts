export type Message = {
    error: boolean;
    message: string;
    show?: boolean;
};

export type AlertState = {
    message?: Message;
};