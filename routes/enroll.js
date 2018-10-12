var express = require('express');
var router = express.Router();

var enrolledUserApi = require('../data/EnrolleduserApi');

/* GET home page. */
router.post('/saveuser', function (req, res, next) {
    let user = req.body;
    enrolledUserApi.saveEnrolledUser(user, function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Enrolling user has failed", err: err });
        } else {
            res.json({ enrollStatus: 'success' });
        }
    });
});

router.post('/loginvalidation', function (req, res, next) {
    let user = req.body;
    enrolledUserApi.validateUser(user, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "validation error", err: err });
        } else {
            res.json(data);
        }
    });
});

router.get('/fetchprofiledetails/:userId', function (req, res) {
    enrolledUserApi.getProfileDetails(req.params.userId, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});

router.put('/updateprofile/:userId', function (req, res) {
    var userProfile = req.body;
    delete userProfile._id;
    delete userProfile.__v;
    enrolledUserApi.updateProfile(req.params.userId, userProfile, function (err, data) {
        if (err) {
            res.status(500).json({ error: "updating profile call failed", err: err });
        } else {
            res.json(data);
        }
    });
});

module.exports = router;