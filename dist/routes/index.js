"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_group_routes_1 = __importDefault(require("./task-group-routes"));
const task_routes_1 = __importDefault(require("./task-routes"));
const auth_routes_1 = __importDefault(require("./auth-routes"));
const notification_routes_1 = __importDefault(require("./notification-routes"));
const router = express_1.default.Router();
router.use("/api/taskgroup", task_group_routes_1.default);
router.use("/api/task", task_routes_1.default);
router.use("/api/notification", notification_routes_1.default);
router.use("/api", auth_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map