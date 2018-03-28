"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
// import connectMongo from "connect-mongo";
const passport_local_1 = require("passport-local");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const MongoStore = connectMongo(session);
const init = (app) => {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: "email",
        passwordField: "password"
    }, (email, password, done) => {
        user_1.User.findOne({ email }).then((user) => {
            // if the user is not found
            if (!user) {
                return done(undefined, false);
            }
            // if the user is found but the password is wrong
            if (!user.comparePassword(password)) {
                return done(undefined, false);
            }
            // all is well, return successful user
            const token = jsonwebtoken_1.default.sign(user.id, "Secret monkey");
            return done(undefined, { userId: user.id, token });
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
    app.use(passport_1.default.initialize());
    // app.use(passport.session());
    app.use((req, res, next) => {
        if (["/api/signin", "/api/signup"].indexOf(req.url) != -1) {
            return next();
        }
        if (req.headers.authorization) {
            const token = req.headers.authorization.toString();
            return jsonwebtoken_1.default.verify(token, "Secret monkey", (err, decoded) => {
                if (err) {
                    return res.status(401).end();
                }
                return user_1.User.findById(decoded).then((user) => {
                    if (!user) {
                        return res.status(401).end();
                    }
                    req.user = user.id;
                    next();
                }).catch(e => res.status(401).send(e));
            });
        }
        return res.status(401).end();
    });
};
exports.default = { init };
//# sourceMappingURL=auth-service.js.map