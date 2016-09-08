var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    lastName: String,
    about: String,
    birthdate: Date,
    phone: String,
    email: String,
    skype: String
}, { id: false });

module.exports = UserSchema;
