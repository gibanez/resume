var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HobbySchema = new Schema({
    name: String
});
module.exports = HobbySchema;
