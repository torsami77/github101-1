import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import db from '../src/db/db';

const should = chai.should();
const expect = chai.expect();
const url = '/api/v1/questions/1/answers';
const data = {
answers: 'What is the Test questions?',
user: 'Sami'
} ;

chai.use(chaiHttp);

const api =  chai.request('http://localhost:5000');


describe('Endpoint 4: Add An Answer', () => {
  
    it('Should Have Access', (done) => {
        api.post(url)
           .send(data)
           .end((err, res) => {
             res.should.have.status(201);
           done();
         })
       });
     
       it('Should Check Type of Response Received', (done) => {
        api.post(url)
           .send(data)
           .end(function(err, res){
             res.body.should.be.a('object');
             res.body.answers.should.be.a('array');
           done();
           });
       });
     
       it('Should Check Properties of Response Received Upon Access', (done) => {
        api.post(url)
           .send(data)
           .end((err, res) => {
            res.body.answers[0].should.be.a('object');
            res.body.answers[0].should.have.property('id').eql(1);
            res.body.answers[0].should.have.property('user').eql('Sami');
            res.body.answers[0].should.have.property('answer');
            res.body.answers[0].upVotes.should.be.a('array');
            res.body.answers[0].downVotes.should.be.a('array');
            res.body.answers[0].reply.should.be.a('array');
           done();
           });
       });



});


