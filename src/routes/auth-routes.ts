import express from "express";
import passport from "passport";
import { User } from "../models/user";
import UserController from "../controllers/user-controller";

const router = express.Router();

router.post("/signin", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).send();
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).send(user.id);
        });
    })(req, res, next);
});

router.get("/current_user", (req, res) => {
    res.send(req.user ? req.user.id : undefined);
});

router.post("/signup", (req, res) => {
    UserController.createUser(req.body.email, req.body.password).then((user) => {
        res.status(200).send(user.id);
    }).catch((e) => {
        res.status(400).send(e.message);
    });
});

router.get("/signout", (req, res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                return res.send(err);
            }
        });
    }
    req.logout();
    res.send();
});

export default router;
