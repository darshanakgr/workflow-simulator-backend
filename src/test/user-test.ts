process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import { mongoose } from "../db/db-connection";
import { User } from "../models/user";
import server from "../server";

const should = chai.should();
chai.use(chaiHttp);

describe("User Testing", () => {
  const user = {
    email: "test@gmail.com",
    password: "password"
  };

  let token: string = undefined;

  it("It should clear all records of user" , (done) => {
    User.remove({}, (error) => {
      if (!error)
        done();
    });
  });

  it("It should create a new user" , (done) => {
    chai.request(server)
      .post("/api/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("It should login to the system" , (done) => {
    chai.request(server)
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

  it("It should get the id of the current user " , (done) => {
    chai.request(server)
      .get("/api/current_user")
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("It shouldn't get the id of the current user " , (done) => {
    chai.request(server)
      .get("/api/current_user")
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});


