var User = AppRequire('Model/User');
var BaseService = require('./BaseService');
var UserService = function ()
{
    var self = BaseService.call(this, User);
};

module.exports = UserService;