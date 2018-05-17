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

const updatePassword = (id: string, password: string, newPassword: string) => {
    return new Promise((resolve, reject) => {
        User.findById(id).then((user) => {
            if (!user.comparePassword(password)) {
                return reject(new Error("Old password is not matched"));
            }
            user.password = user.hashPassword(newPassword);
            return User.findByIdAndUpdate(user.id, {
                $set: user
            }, {
                new: true
            });
        }).then((user) => {
            return resolve(user);
        }).catch(e => reject(e));
    });
};

export default { createUser, updatePassword };