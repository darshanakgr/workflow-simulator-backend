import express from "express";
import passport from "passport";
import { User } from "../models/user";
import UserController from "../controllers/user-controller";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signin", (req, res, next) => {
    passport.authenticate("local", {
        session: false
    }, (err, token) => {
        if (err) {
            return next(err);
        }

        if (!token) {
            return res.status(401).send();
        }

        return res.status(200).send(token);
    })(req, res, next);
});

router.get("/current_user", (req, res) => {
    res.send(req.user);
});

router.post("/signup", (req, res) => {
    UserController.createUser(req.body.email, req.body.password).then((user) => {
        res.status(200).send(user.id);
    }).catch((e) => {
        res.status(400).send(e.message);
    });
});

export default router;
