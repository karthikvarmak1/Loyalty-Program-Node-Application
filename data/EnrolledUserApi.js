var connection = require('./DBConnection');
var mongoose = require('mongoose');
var randomize = require('randomatic');

var schema = mongoose.Schema;

var enrolledUserSchema = new schema({
    userId: String,
    name: String,
    password: String,
    loyaltyCardNumber: String
});

var EnrolledUser = mongoose.model('EnrolledUser', enrolledUserSchema);

var _clone = function (item) {
    return JSON.parse(JSON.stringify(item));
};


var enrolledUserApi = {
    saveEnrolledUser: function (user, callback) {
        var newUser = new EnrolledUser(user);
        newUser.loyaltyCardNumber = randomize('0', 16);
        console.log(newUser);
        newUser.save({}, function (err, user) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, _clone(user));
            }
        })
    },
    validateUser: function (loggedUser, callback) {
        EnrolledUser.find(loggedUser, function (err, data) {
            if (err) {
                return console.log(err);
            } else {
                console.log('Count of User details : ' + data);
                return callback(null, _clone(data));
            }
        })
    },
    getProfileDetails: function (id, callback) {
        EnrolledUser.find({ userId: id }, function (err, data) {
            if (err) {
                return console.log(err);
            } else {
                callback(null, _clone(data));
            }
        });
    },
    updateProfile : function(id, user, callback){
        EnrolledUser.update({userId : id},{$set : user},function(err, data){
            if(err){
                return console.log(err);
            }else{
                return callback (null, _clone(data));
            }
        });
    }
}

module.exports = enrolledUserApi;

