const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const mongodb = require('./config/mongodb');
const MongoStore = require('connect-mongo')(session);

const products = require('./routes/products');
const users = require('./routes/users');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        mongooseConnection: mongodb.conn, 
        collection: 'sessions' 
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
    res.send('Welcome to the backend.');
})

app.use('/products', products);
app.use('/users', users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));