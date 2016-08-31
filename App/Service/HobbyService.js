var User = AppRequire('Model/Hobby');
var BaseService = require('./BaseService');
var HobbyService = function ()
{
    var self = BaseService.call(this, User);
};

module.exports = HobbyService;