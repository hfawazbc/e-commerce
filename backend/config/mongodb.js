require('dotenv').config();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'MongoDB Connection Error'));
conn.once('open', () => {
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('Connected to MongoDB')
});

module.exports.conn = conn;