import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'request';
import app from '../src/app';
import superagent from 'superagent';
import { promises } from 'fs';

const should = chai.should();
const expect = chai.expect();
const base = 'http://localhost:5000';
let questionId = '14';

chai.use(chaiHttp);


const cagent = superagent.agent();
const randusername = Math.random().toString(36).substring(8);
const staticpassword = "iamtheluchadore";
const theAccount = {
  username: randusername,
  email: `${randusername}@litetest.com`,
  password: staticpassword,
  verify: staticpassword
};

let signUpUser = new Promise((request, done) => {
  const url = '/api/v1/auth/signUp';
  chai.request(base)
    .post(url)
    .set('Accept', 'application/json')
    .send(theAccount)
    .end((err, res) => {
      if (err) {
          throw err;
          }
         done()
      });
});


let logInCreatedUser = new Promise((request, done) => {
  const ur = '/api/v1/auth/logIn';
    chai.request(base)
      .post(ur)
      .set('Accept', 'application/json')
      .send(theAccount)
      .end((err, res) => {
        if (err) {
            console.log(err);
            throw err;
            }
            cagent.saveCookies( res )
            done(agent);
        });
});

export default {signUpUser, logInCreatedUser} ;