var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String, required: true, max: 100
    },
    password: {
        type: String, required: true
    },
    fullname: {
        type: String, required: true
    }
});

module.exports = mongoose.model('user', UserSchema);
