var Controller = TangoRequire('Modules/mvc/Controller');
var File = TangoRequire('Modules/FileSystem/File');
var UserService = AppRequire('Service/UserService');
var SkillService = AppRequire('Service/SkillService');
var HobbyService = AppRequire('Service/HobbyService');

var AdminCtrl = function (req, res)
{
    var self = Controller.call(this, req, res);
    var userService = new UserService();
    var skillService = new SkillService();
    var hobbyService = new HobbyService();

    self.index = function()
    {
        var file = new File('./App/View/admin/index.html');
        file.read().then(function(data)
        {
            self.response.header('Content-Type', 'text/html');
            self.response.send(data);
        });
    };
};

module.exports = AdminCtrl;