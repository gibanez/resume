var Controller = TangoRequire('Modules/mvc/Controller');
var File = TangoRequire('Modules/FileSystem/File');
var UserService = AppRequire('Service/UserService');
var SkillService = AppRequire('Service/SkillService');
var HobbyService = AppRequire('Service/HobbyService');

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

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

    self.model = function()
    {

        var params = self.request.params;
        try
        {
            var Service = AppRequire('Service/' + capitalize(params.model) + 'Service');
            var service = new Service();

            switch (params.action)
            {
                case 'query':
                    service.getAll(true).then(function(data){
                        self.responseJSON(data);
                    });
                break;
                case 'get':
                    service.get(true).then(function(data){
                        self.responseJSON(data);
                    });
                break;
                case 'save':
                service.getAll().then(function(data){
                    self.responseJSON(data);
                });
                break;
            }


        }
        catch (e)
        {
            console.info(e);
        }



        console.info(service);



        //self.response.header('Content-Type', 'text/html');
        //self.response.send("data");

    };
};

module.exports = AdminCtrl;