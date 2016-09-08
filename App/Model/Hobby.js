var mongoose = require('mongoose');
var HobbySchema = AppRequire('Model/HobbySchema');
module.exports = mongoose.model('Hobby', HobbySchema);
