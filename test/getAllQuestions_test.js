import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import request from 'request';

const should = chai.should();
const expect = chai.expect();
const url = '/api/v1/questions';

chai.use(chaiHttp);
const api =  chai.request('http://localhost:5000');


describe('Endpoint 1: Get All Questions', () => {
  
  it('Should Have Access', (done) => {
   api.get(url)
      .end((err, res) => {
        res.should.have.status(200);
      done();
    })
  });

  it('Should Check Type of Response Received', (done) => {
   api.get(url)
      .end(function(err, res){
        res.body.should.be.a('object');
      done();
      });
  });


});

