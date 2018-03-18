import { User } from "../models/user";

const createUser = (email: string, password: string) => {
    const user = new User();
    user.email = email;
    user.password = user.hashPassword(password);
    return user.save();
};

export default { createUser };