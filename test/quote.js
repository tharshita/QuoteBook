//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Quote = require('../app/models/quote');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server').server;
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Quotes', () => {
    beforeEach((done) => { //Before each test we empty the database
        Quote.deleteMany({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET quote', () => {
      it('it should GET all the quotes', (done) => {
        chai.request(server)
            .get('/quote')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  /*
  * Test the /POST route
  */
 describe('/POST quote', () => {
    it('it should not POST a quote without any fields', (done) => {
        let quote = {
        }
      chai.request(server)
          .post('/quote')
          .send(quote)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('content');
                res.body.errors.should.have.property('author');
                res.body.errors.content.should.have.property('kind').eql('required');
                res.body.errors.author.should.have.property('kind').eql('required');
            done();
          });
    });

    it('it should not POST a quote without author field', (done) => {
        let quote = {
            content: "happiness can be found in the darkest of times..."
        }
      chai.request(server)
          .post('/quote')
          .send(quote)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('author');
                res.body.errors.author.should.have.property('kind').eql('required');
            done();
          });
    });

    it('it should not POST a quote without content field', (done) => {
        let quote = {
            author: "J.R.R. Tolkien"
        }
      chai.request(server)
          .post('/quote')
          .send(quote)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('content');
                res.body.errors.content.should.have.property('kind').eql('required');
            done();
          });
    });


    it('it should POST a quote ', (done) => {
        let quote = {
            author: "J.R.R. Tolkien",
            content: "Moonlight drowns out all but the brightest stars."
        }
      chai.request(server)
          .post('/quote')
          .send(quote)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Quote successfully added!');
                res.body.quote.should.have.property('author');
                res.body.quote.should.have.property('content');
            done();
          });
    });
});
/*
  * Test the /GET/:id route
  */
 describe('/GET/:id quote', () => {
    it('it should GET a quote by the given id', (done) => {
        let quote = new Quote({ author: "J.K. Rowling", content: "expecto patronum."});
        quote.save((err, quote) => {
            chai.request(server)
          .get('/quote/' + quote.id)
          .send(quote)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('content');
                res.body.should.have.property('author');
                res.body.should.have.property('_id').eql(quote.id);
            done();
          });
        });
    });
});
/*
  * Test the /PUT/:id route
  */
 describe('/PUT/:id quote', () => {
    it('it should UPDATE a quote content given the id', (done) => {
        let quote = new Quote({author: "C.S. Lewis", content: "testing narnia"})
        quote.save((err, quote) => {
              chai.request(server)
              .put('/quote/' + quote.id)
              .send({content: "updated narnia"})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Quote updated!');
                    res.body.quote.should.have.property('content').eql("updated narnia");
                done();
              });
        });
    });
});

/*
  * Test the /DELETE/:id route
  */
 describe('/DELETE/:id quote', () => {
    it('it should DELETE a quote given the id', (done) => {
        let quote = new Quote({content: "The Chronicles of Narnia", author: "C.S. Lewis"})
        quote.save((err, quote) => {
              chai.request(server)
              .delete('/quote/' + quote.id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Quote successfully deleted!');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
                done();
              });
        });
    });
});

});
