const chai = require('chai');
const expect = chai.expect;

const app = require('../app');

//test to verify if app exists
describe('App', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');})
})

const http = require('chai-http');
chai.use(http);

const User = require('../user')

describe('App basics test', () => {

  before( (done) => {
    //delete all users 
    User.find().deleteMany().then( res => {
      console.log('Users removed');
    }).catch(err => {
      console.log(err.message);
    });
	done();
  });

  it('Should exists', () => {
    expect(app).to.be.a('function');
  })
  //test if app gets HTTP GET request in '/'
  it('GET / should return 200 and message', (done) => {
    chai.request(app).get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.contain('GET in');
        done();
    }).catch(err => {
      console.log(err.message);
    })
  });
})

describe('User registration', () => {
  it('should return 201 and confirmation for valid input', (done) => {
    const new_user = {
      "name"  : "User Person",
      "email": "user@person.com",
      "password": "password"
    }
    chai.request(app).post('/register')
      .send(new_user)
        .then((res) => {
		  //console.log(res.body);
          expect(res).to.have.status(201);
          expect(res.body.message).to.be.equal("User registered");
          
		  expect(res.body.user._id).to.exist;
		  expect(res.body.user.createdAt).to.exist;
		  
        }).catch(err => {
          console.log(err.message);
        })
	done();	
  });

})

describe('User login', () => {
    it('should return 200 and token for valid credentials', (done) => {
      const valid_input = {
        "email": "user@person.com",
        "password": "password"
      }
      chai.request(app).post('/login')
        .send(valid_input)
          .then((res) => {
            //console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body.token).to.exist;
            expect(res.body.message).to.be.equal("Auth OK");
            expect(res.body.errors.length).to.be.equal(0);
            done();
          }).catch(err => {
            console.log(err.message);
          })
    });
  });