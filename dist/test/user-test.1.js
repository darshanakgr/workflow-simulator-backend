"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = "test";
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const user_1 = require("../models/user");
const server_1 = __importDefault(require("../server"));
const should = chai_1.default.should();
chai_1.default.use(chai_http_1.default);
describe("User Testing", () => {
    const user = {
        email: "test@gmail.com",
        password: "password"
    };
    let token = undefined;
    it("It should clear all records of user", (done) => {
        user_1.User.remove({}, (error) => {
            if (!error)
                done();
        });
    });
    it("It should create a new user", (done) => {
        chai_1.default.request(server_1.default)
            .post("/api/signup")
            .send(user)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
        });
    });
    it("It should login to the system", (done) => {
        chai_1.default.request(server_1.default)
            .post("/api/signin")
            .send(user)
            .end((err, res) => {
            token = res.body.token;
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("token");
            done();
        });
    });
    it("It should get the id of the current user ", (done) => {
        chai_1.default.request(server_1.default)
            .get("/api/current_user")
            .set("Authorization", token)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
        });
    });
    it("It shouldn't get the id of the current user ", (done) => {
        chai_1.default.request(server_1.default)
            .get("/api/current_user")
            .end((err, res) => {
            res.should.have.status(401);
            done();
        });
    });
});
//# sourceMappingURL=user-test.1.js.map