var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillSchema = new Schema({
    technology: String,
    value: Number
});

module.exports = mongoose.model('Skill', SkillSchema);
