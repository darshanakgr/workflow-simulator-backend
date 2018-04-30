/**
 * A module, contains all the functions of handling users
 * Uses the schema of User
 */
import { User } from "../models/user";

/**
 * Create new record for user
 * @param email email of the user
 * @param password password of the user
 */
const createUser = (email: string, password: string) => {
    const user = new User();
    user.email = email;
    user.password = user.hashPassword(password);
    return user.save();
};

export default { createUser };