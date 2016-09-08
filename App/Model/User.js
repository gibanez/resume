var mongoose = require('mongoose');
var UserSchema = AppRequire('Model/UserSchema');
module.exports = mongoose.model('User', UserSchema);
