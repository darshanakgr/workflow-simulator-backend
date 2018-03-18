import passport from "passport";
import session from "cookie-session";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user";
import { Express, Request } from "express";

const init = (app: Express) => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, (email, password, done) => {
        console.log(email, password);
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
            return done(undefined, user);
        }).catch((e) => done(e));
    }));

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            done(undefined, user);
        });
    });

    passport.serializeUser((user: any, done) => {
        done(undefined, user.id);
    });

    // app.use(session({
    //     secret: "simulator",
    //     resave: true,
    //     saveUninitialized: true
    // }));

    app.use(session({
        name: "session",
        keys: ["secret"],
        maxAge: 3600 * 24 * 1000
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};

export default { init };