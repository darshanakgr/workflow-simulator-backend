"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const task_group_1 = require("../models/task-group");
const server_1 = __importDefault(require("../server"));
const should = chai_1.default.should();
chai_1.default.use(chai_http_1.default);
describe("TaskGroup Testing", () => {
    const user = {
        email: "test@gmail.com",
        password: "password"
    };
    let token = undefined;
    let userId = undefined;
    it("It should clear all records of TaskGroup", (done) => {
        task_group_1.TaskGroup.remove({}, (error) => {
            if (!error)
                done();
        });
    });
    it("It shouldn't create a new task group", (done) => {
        chai_1.default.request(server_1.default)
            .post("/api/taskgroup")
            .send({
            groupId: "G001",
            name: "Test Task Group 1",
            description: "Testing purpose",
            createdOn: new Date(),
            progress: 0,
            childTasks: []
        })
            .end((err, res) => {
            res.should.have.status(401);
            done();
        });
    });
    it("It should login to the system at first", (done) => {
        chai_1.default.request(server_1.default)
            .post("/api/signin")
            .send(user)
            .end((err, res) => {
            token = res.body.token;
            userId = res.body.userId;
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("token");
            done();
        });
    });
    it("It should get all the task groups", (done) => {
        chai_1.default.request(server_1.default)
            .get("/api/taskgroup")
            .set("Authorization", token)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(0);
            done();
        });
    });
    it("It should create a new task group", (done) => {
        chai_1.default.request(server_1.default)
            .post("/api/taskgroup")
            .set("Authorization", token)
            .send({
            groupId: "G001",
            name: "Test Task Group 1",
            description: "Testing purpose",
            createdOn: new Date(),
            progress: 0,
            childTasks: []
        })
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("groupId").eql("G001");
            res.body.should.have.property("name").eql("Test Task Group 1");
            res.body.should.have.property("progress").eql(0);
            res.body.should.have.property("createdBy").eql(userId);
            done();
        });
    });
    it("It should find the new task group", (done) => {
        chai_1.default.request(server_1.default)
            .get("/api/taskgroup/find/G001")
            .set("Authorization", token)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("groupId").eql("G001");
            res.body.should.have.property("name").eql("Test Task Group 1");
            res.body.should.have.property("progress").eql(0);
            res.body.should.have.property("createdBy").eql(userId);
            done();
        });
    });
    it("It should find the shared task group", (done) => {
        chai_1.default.request(server_1.default)
            .get("/api/taskgroup/share")
            .set("Authorization", token)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(1);
            done();
        });
    });
    it("It should update the task group", (done) => {
        chai_1.default.request(server_1.default)
            .put("/api/taskgroup")
            .set("Authorization", token)
            .send({
            groupId: "G001",
            name: "Test Task Group 2",
            description: "Testing purpose",
            createdOn: new Date(),
            progress: 10,
            childTasks: []
        })
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("n").eql(1);
            done();
        });
    });
    it("It should delete the task group", (done) => {
        chai_1.default.request(server_1.default)
            .del("/api/taskgroup/G001")
            .set("Authorization", token)
            .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
//# sourceMappingURL=task-group-test.1.js.map