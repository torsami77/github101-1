/*
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'request';
import app from '../src/app';
import { promises } from 'fs';

const should = chai.should();
const expect = chai.expect();
let questionId = '14';

chai.use(chaiHttp);

const randusername = Math.random().toString(36).substring(8);

const body = {
    username: `${randusername}`,
    email: `${randusername}@gmail.com`, 
    password: "staticpassword",
    verify: 'staticpassword'
    };
    
const api =  chai.request('http://localhost:5000');

describe('Endpoint 3: Add A Questions', () => {
  it('Signup Random User', (done) => {
  api.post('/api/v1/auth/signUp')
     .set('Accept', 'application/json')
     .send(body)
     .end((err, res) => {
       expect(res.success).to.equal('true');
     })
      
      it('Login Random User', (done) => {
        api.post('/api/v1/auth/logIn')
          .set('Accept', 'application/json')
          .send(body)
          .end((err, res) => {
            expect(res.success).to.equal('true');
            res.should.have.status(200);
            let token = res.header['set-cookie'][1].split("=")[1].split(";")[0];
          })
          let bearer = `Bearer ${token}`;
          it('Should Have Access', (done) => {
              api.post(url)
                 .set(`content-type': 'application/json', 'authorization': ${bearer}`)
                 .send(data)
                 .end((err, res) => {
                   res.should.have.status(201);
                 done();
               })
             });
           
             it('Should Check Type of Response Received', (done) => {
              api.post(url)
                 .set(`content-type': 'application/json', 'authorization': ${bearer}`)
                 .send(data)
                 .end(function(err, res){
                   res.body.should.be.a('object');
                 done();
                 });
             });
           
             it('Should Check Properties of Response Received Upon Access', (done) => {
              api.post(url)
                 .set(`content-type': 'application/json', 'authorization': ${bearer}`)
                 .send(data)
                 .end((err, res) => {
                   res.body.question.should.have.property('id').eql(5);
                   res.body.question.should.have.property('time');
                   res.body.question.should.have.property('question');
                   res.body.question.should.have.property('answers');
                   res.body.question.answers.should.be.a('array');
                 done();
                 });
             });
          
          done();
        })
     done();
  })

})

/*
const logInUser = new Promise((done) => {
    api.post('/api/v1/auth/logIn')
       .set('Accept','application/json')
       .send(body)
       .end((err, res) => {
        expect(res.success).to.equal('true');
        res.should.have.status(200);
            let token = res.header['set-cookie'][1].split("=")[1].split(";")[0];
      });
      done();
})

  export default {signUpUser, logInUser};
*/