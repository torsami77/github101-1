import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should;
const expect = chai.expect;

const url = 'api/v1/questions/1/answers';

chai.use(chaiHttp);

const randusername = Math.random().toString(36).substring(8);

const body = {
    username: `${randusername}`,
    email: `${randusername}@gmail.com`, 
    password: "staticpassword",
    verify: 'staticpassword'
    };

const api =  chai.request('http://localhost:5000');


describe('Endpoint 4: Add An Answer', () => {

    it('Signup Random User', (done) => {
    api.post('/api/v1/auth/signUp')
        .set('Accept', 'application/json')
        .send(body)
        .end((err, res) => {
            expect(res.body.success).to.equal('true');
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
                let bearer = `Bearer ${token}`,
                body = {
                    answer : 'Travis is a CI Platform'
                }
                    it('Should Have Access', (done) => {
                        api.post(url)
                        .send(data)
                        .set(`content-type': 'application/json', 'authorization': ${bearer}`)
                        .end((err, res) => {
                            res.should.have.status(201);
                        done();
                        })
                    });
                    
                    it('Should Check Type of Response Received', (done) => {
                        api.post(url)
                        .send(data)
                        .set(`content-type': 'application/json', 'authorization': ${bearer}`)
                        .end((err, res) => {
                            res.body.should.be.a('object');
                            res.body.answers.should.be.a('array');
                        done();
                        });
                    });
                    
                    it('Should Check Properties of Response Received Upon Access', (done) => {
                        api.post(url)
                        .send(data)
                        .set(`content-type': 'application/json', 'authorization': ${bearer}`)
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


        done();
        });
done();
});


})
