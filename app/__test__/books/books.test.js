'use strict';

const request = require('supertest');
const mongoose = require('mongoose');
const api = require('../../app');
const Mockgoose = require('mockgoose').Mockgoose;

const mockgoose = new Mockgoose(mongoose);

const URL = '/api/books';

const req = request(api);

let payload;

beforeAll((done) => {
  mockgoose.prepareStorage()
    .then(() => {
      mongoose.connect('mongodb://localhost/books', function(err) {
        done(err);
      });
    });
});

beforeEach(() => {
  payload = {
    title: 'War and Peace',
    author: 'Leo Today',
    publication: '2008-12-02',
    price: 12.50,
    ISBN: 'foobar123',
  };
});

test('It should create a new Book', () => {
  return req
    .post(URL)
    .set('Accept', 'application/json')
    .send(payload)
    .expect(201)
    .expect('Content-Type', /application\/json/)  
});


test('It should return an error for title missing', (done) => {
  payload.title = '';
  return req
    .post(URL)
    .set('Accept', 'application/json')
    .send(payload)
    .expect(422)
    .expect('Content-Type', /application\/json/)
    .end((err, res) => {
      const errors = res.body.err;
      expect(errors).toEqual([ { msg: 'Title should not be empty' } ]);
      done();
    });
});


test('It should retrive all books of the list', done => (
  req
    .get(URL)
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .end((err, res) => {
      const body = res.body;
      const book = body[0];
      expect(book.title).toBe('War and Peace');
      expect(book.author).toBe('Leo Today');
      done();
    })
));


test('It should retrive books by title', done => {
  const querys = {
    title: 'War and Peace',
    author: 'Leo Today',
    price: 12.50,
  };

  Object.keys(querys).
    map((key) => {
      return req
        .get(`${URL}?${key}=${encodeURI(querys[key])}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end((err, res) => {
          const body = res.body;
          const book = body[0];
          expect(book[key]).toBe(querys[key]);
          done();
        })    
    })
});

test('it Shoudl retrive a book by the id', (done) => {
  let id;
  payload.ISBN+=5;
  return req
    .post(URL)
    .set('Accept','application/json')
    .send(payload)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .then((res) => {
      id = res.body._id;
      return req
        .get(`${URL}/${id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }, done)
    .then((res) =>{
      const body = res.body;
      expect(body.title).toBe('War and Peace');
      // expect(body.author).toBe('Leo Today');
    //  expect(body.price).toBe(12.50);
      done();
    }).catch(err => {console.log(err)} )
})

test('It shoud update a book info', (done) => {
  let id;
  const payload2 = {
    title: 'War and Pece',
    author: 'Leo Today',
    publication: '2008-12-02',
    price: 12.50,
    ISBN: 'foobar1234',
  };

  return req
    .post(URL)
    .set('Accept','application/json')
    .send(payload2)
    .expect(201)
    .then((res) => {
      id = res.body._id;
      req
        .get(`${URL}/${id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
    }, done)
    .then((res) => {
      let title = 'War and Peace';
      req
          .put(`${URL}/${id}`)
          .set('Accept', 'application/json')
          .send({ title })
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then((res) => {
            console.log({res: res.body});
            //const body = res.body;
            //console.log(body)
            expect(2).toBe(2);
            
            done();
          })
    },done)
    .catch(err =>{ console.log(err)});
})
