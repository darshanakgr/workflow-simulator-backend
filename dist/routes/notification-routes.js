"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = __importDefault(require("../controllers/notification-controller"));
const router = express_1.default.Router();
router.post("/", (req, res) => {
    notification_controller_1.default.sendNotification(req.body, req.user.toString()).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.get("/", (req, res) => {
    notification_controller_1.default.getNotifications(req.user.toString()).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.post("/users", (req, res) => {
    notification_controller_1.default.getUsers(req.body.userIds).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.post("/reply", (req, res) => {
    notification_controller_1.default.replyNotification(req.body.id, req.body.accepted).then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send(e);
    });
});
exports.default = router;
//# sourceMappingURL=notification-routes.js.map