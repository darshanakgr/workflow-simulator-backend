import passport from "passport";
// import session from "express-session";
import { mongoose } from "../db/db-connection";
// import connectMongo from "connect-mongo";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user";
import { Express, Request } from "express";
import jwt from "jsonwebtoken";

// const MongoStore = connectMongo(session);

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
            const token = jwt.sign(user.id, "Secret monkey");
            return done(undefined, {userId: user.id, token});
        }).catch((e) => done(e));
    }));

    // passport.deserializeUser((id, done) => {
    //     User.findById(id).then((user) => {
    //         done(undefined, user);
    //     });
    // });

    // passport.serializeUser((user: any, done) => {
    //     done(undefined, user.id);
    // });

    // app.use(session({
    //     secret: "simulator",
    //     resave: true,
    //     store: new MongoStore({
    //         mongooseConnection: mongoose.connection,
    //         autoRemove: "interval",
    //         autoRemoveInterval: 10
    //     }),
    //     saveUninitialized: false
    // }));

    app.use(passport.initialize());
    // app.use(passport.session());

    app.use((req, res, next) => {
        if (["/api/signin", "/api/signup"].indexOf(req.url) != -1) {
            return next();
        }
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
    });
};

export default { init };