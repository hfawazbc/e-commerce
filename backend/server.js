require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const MongoStore = require('connect-mongo')(session);
const products = require('./routes/products');
const users = require('./routes/users');

/* MongoDB Configuration */
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'MongoDB Connection Error.'));

let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('Connected to MongoDB.');
});

/* Server Configuration */
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
        mongooseConnection: conn, 
        collection: 'sessions' 
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.get('/', (req, res, next) => {
    res.send('Welcome to the backend.');
})

app.get('/files', (req, res, next) => {
    gfs.files.find().toArray((error, files) => {
        if (error) {
            console.log(error);
        }

        res.json({ message: 'Found files.', files })
    })
})

app.use('/products', products);
app.use('/users', users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));