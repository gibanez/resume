var Skill = AppRequire('Model/Skill');
var BaseService = require('./BaseService');
var SkillService = function (req, res)
{
    var self = BaseService.call(this, Skill);
};

module.exports = SkillService;