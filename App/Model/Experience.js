var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExperienceSchema = new Schema({
    company: String,
    from: Date,
    do: Date,
    desc: String,
    job:String,
    link:String
});

module.exports = mongoose.model('Experience', ExperienceSchema);
