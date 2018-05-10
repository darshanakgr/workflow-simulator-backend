"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const task_1 = require("../models/task");
const server_1 = __importDefault(require("../server"));
const should = chai_1.default.should();
chai_1.default.use(chai_http_1.default);
describe("Task Testing", () => {
    const user = {
        email: "test@gmail.com",
        password: "password"
    };
    let token = undefined;
    let userId = undefined;
    it("It should clear all records of Task", (done) => {
        task_1.Task.remove({}, (error) => {
            if (!error)
                done();
        });
    });
    it("It shouldn't create a new task", (done) => {
        chai_1.default.request(server_1.default)
            .post("/api/task")
            .send({
            taskId: "T001",
            name: "Task 1",
            description: "Testing purpose",
            progress: 0,
            groupId: "G001",
            predecessors: []
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
    it("It should get all the tasks", (done) => {
        chai_1.default.request(server_1.default)
            .get("/api/task")
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
    it("It should add a new task to G001", (done) => {
        chai_1.default.request(server_1.default)
            .post("/api/task")
            .set("Authorization", token)
            .send({
            taskId: "T001",
            name: "Task 1",
            description: "Testing purpose",
            progress: 0,
            groupId: "G001",
            predecessors: []
        })
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("taskId").eql("T001");
            res.body.should.have.property("name").eql("Task 1");
            res.body.should.have.property("progress").eql(0);
            done();
        });
    });
    it("It should find the new task", (done) => {
        chai_1.default.request(server_1.default)
            .get("/api/task/find/T001")
            .set("Authorization", token)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("taskId").eql("T001");
            res.body.should.have.property("name").eql("Task 1");
            res.body.should.have.property("progress").eql(0);
            done();
        });
    });
    it("It should delete the task", (done) => {
        chai_1.default.request(server_1.default)
            .del("/api/task/G001/T001")
            .set("Authorization", token)
            .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
//# sourceMappingURL=task-test.js.map