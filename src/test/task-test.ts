process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import { mongoose } from "../db/db-connection";
import { Task } from "../models/task";
import server from "../server";

const should = chai.should();
chai.use(chaiHttp);

describe("Task Testing", () => {
  const user = {
    email: "test@gmail.com",
    password: "password"
  };

  let token: string = undefined;
  let userId: string = undefined;

  it("It should clear all records of Task" , (done) => {
    Task.remove({}, (error) => {
      if (!error)
        done();
    });
  });

  it("It shouldn't create a new task" , (done) => {
    chai.request(server)
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

  it("It should login to the system at first" , (done) => {
    chai.request(server)
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

  it("It should get all the tasks" , (done) => {
    chai.request(server)
      .get("/api/task")
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it("It should create a new task group" , (done) => {
    chai.request(server)
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

  it("It should add a new task to G001" , (done) => {
    chai.request(server)
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

  it("It should find the new task" , (done) => {
    chai.request(server)
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

  it("It should delete the task" , (done) => {
    chai.request(server)
      .del("/api/task/G001/T001")
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

});


