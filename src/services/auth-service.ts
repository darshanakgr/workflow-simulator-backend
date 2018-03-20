import passport from "passport";
import session from "express-session";
import { mongoose } from "../db/db-connection";
import connectMongo from "connect-mongo";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user";
import { Express, Request } from "express";

const MongoStore = connectMongo(session);

const init = (app: Express) => {
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

    app.use(session({
        secret: "simulator",
        resave: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            autoRemove: "interval",
            autoRemoveInterval: 10
        }),
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        next();
    });
};

export default { init };