const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'an1rudh',
      database : 'face-recognition-db'
    }
  });
const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    knex.select('*').from('users').then(users => {
        res.json(users);
    })
    .catch(err => res.status(400).json('Unable to fetch users'))
})

app.post('/signin', (req, res) => signin.handleSignIn(req, res, bcrypt, knex))
app.post('/register', (req, res) => register.handleRegister(req, res, bcrypt, knex))
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, knex))
app.put('/image', (req, res) => image.handleImage(req, res, knex))

app.listen("3000", () => {
    console.log("App is running on port 3000!");
});