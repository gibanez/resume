var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EducationSchema = new Schema({
    title: String,
    desc: String,
    year: Number
});

module.exports = mongoose.model('Education', EducationSchema);
