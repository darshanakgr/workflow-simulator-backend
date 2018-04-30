/**
 * A module that contained all functionalities for authentication
 */

import passport from "passport";
import { mongoose } from "../db/db-connection";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user";
import { Express, Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export const init = (app: Express) => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, (email, password, done) => {
        User.findOne({email}).then((user) => {
            // if the user is not found
            if (!user) {
                return done(undefined, false);
            }
            // if the user is found but the password is wrong
            if (!user.comparePassword(password)) {
                return done(undefined, false);
            }
            // all is well, return successful user
            const token = jwt.sign(user.id, "Secret monkey");
            return done(undefined, {userId: user.id, token});
        }).catch((e) => done(e));
    }));

    app.use(passport.initialize());

};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.toString();
        return jwt.verify(token, "Secret monkey", (err, decoded) => {
            if (err) { return res.status(401).end(); }
            return User.findById(decoded).then((user) => {
                if (!user) { return res.status(401).end(); }
                req.user = user.id;
                next();
            }).catch(e => res.status(401).send(e));
        });
    }
    return res.status(401).end();
};
