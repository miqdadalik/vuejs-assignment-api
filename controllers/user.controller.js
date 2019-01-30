var User = require('../models/user.model');

exports.test = function (req, res) {
    res.send('User Controller');
};

exports.signup = function (req, res,next) {
    //use bcrypt which needs python
    
    var password = req.body.password;
    var user = new User(
        {
            fullname: req.body.fullname,
            username: req.body.username,
            password:  password
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }

        res.send(JSON.stringify({
            message: 'User Created successfully. Please Login',
            status: true
        }));
    })
};

exports.signin = function(req, res, next) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username, password: password }, function (err, user) {
        if (err || !user) { 
            res.end(JSON.stringify({
                message: 'Invalid Username or Password',
                status: false
            }));
            return;
        }
        // //if (!user.verifyPassword(password)) { return done(null, false); }
        sess = req.session;
        sess.email = user.username;
        sess.userId = user._id;
        sess.fullname = user.fullname;
        res.setHeader('userLoggedIn', true);
        res.setHeader('user', sess.fullname);
        res.setHeader('userId', sess.userId);
        res.send(JSON.stringify({
            message: 'Success',
            user: sess,
            status: true
        }));
    });
}