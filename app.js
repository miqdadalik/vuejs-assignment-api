var cors = require('cors')
const express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
var router = express.Router();


var productRoutes = require('./routes/product.routes');
var userRoutes = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({ type: 'application/json' }))
app.use(session({secret: 'vuejs'}));

var mongoose = require('mongoose');
//var dev_db_url = 'mongodb://<username>:<password>@<server>:<port>/<dbname>';
var dev_db_url = 'mongodb://miqdad:miqdad123@ds042898.mlab.com:42898/vuejs';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/*',function(req, res, next){
    sess = req.session;
    if(sess.userLoggedIn && sess.userId && sess.fullname) {
        res.setHeader('userLoggedIn', true);
        res.setHeader('user', sess.fullname);
        res.setHeader('userId', sess.userId);
    }
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/user', userRoutes);
app.use('/products', productRoutes);

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});