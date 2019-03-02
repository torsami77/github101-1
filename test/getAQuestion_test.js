import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'request';
import app from '../src/app';

const should = chai.should();
const expect = chai.expect();
const base = 'http://localhost:5000';
const url = '/api/v1/questions/14';
let questionId = '14';

chai.use(chaiHttp);

const api =  chai.request('http://localhost:5000');

describe('Endpoint 2: Get A Question', () => {
  
  it('Should Have Access', (done) => {
    chai.request(base)
      .get(url)
      .end((err, res) => {
        res.should.have.status(200);
      done();
      });
  });

  it('Should Check type of Response Received Upon Access', (done) => {
    chai.request(base)
      .get(url)
      .end((err, res) => {
        res.body.should.be.a('object');
      done();
      });
  });

  it('Should Check Properties of Response Received Upon Access', (done) => {
    chai.request(base)
      .get(url)
      .end((err, res) => {
        res.body.questionData.should.have.property('id').eql(14);
        res.body.questionData.should.have.property('question');
        res.body.questionData.should.have.property('time');
        res.body.questionData.should.have.property('answers');
      done();
      });
  });

  it('Should Check Error Upon Invalid Question ID', (done) => {
    chai.request(base)
      .get('/api/v1/questions/a')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.success.should.equal('false');
        res.body.message.should.equal('Task not completed, no question found with specified id');
      done();
      });
  });  


  
});
