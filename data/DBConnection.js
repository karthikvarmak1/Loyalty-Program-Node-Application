var mongoose = require('mongoose');
var keys = require('../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.MONGODB_URI, {useNewUrlParser: true});

var conn = mongoose.connection;

conn.on('error', function (err) {
    console.log('Connection error', err);
});
conn.once('open', function () {
    console.log('Connected to DB.');
});

module.exports = conn;