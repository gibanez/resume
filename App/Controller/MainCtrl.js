var Controller = TangoRequire('Modules/mvc/Controller');
var File = TangoRequire('Modules/FileSystem/File');
var UserService = AppRequire('Service/UserService');
var SkillService = AppRequire('Service/SkillService');

var MainCtrl = function (req, res)
{
    var self = Controller.call(this, req, res);
    var userService = new UserService();
    var skillService = new SkillService();

    self.index = function()
    {
        var file = new File('./App/View/index.html');
        file.read().then(function(data)
        {
            self.response.header('Content-Type', 'text/html');
            self.response.send(data);
        });
    };
    self.generateData = function()
    {
        var createUser = function()
        {
            userService.create({
                name: "Germán E.",
                lastName: "Ibañez",
                about: "Soy programador web",
                birthdate: new Date(),
                phone: "11-5050-6859",
                email: "gei9980@gmail.com",
                skype: "gibanez99"
            }).then(function()
            {
                console.info("USUARIO CREADO");
            });
        };

        var createSkills = function()
        {
            var skills = [
                {technology: "PHP",value: 1},
                {technology: "Python",value: .9},
                {technology: "NodeJS",value: .8},
                {technology: "HTML",value: 1},
                {technology: "CSS",value: .8},
                {technology: "JAVASCRIPT",value: 1},
                {technology: "BackBone",value: .7},
                {technology: "Angular",value: .9},
                {technology: "Polymer",value: .6},
                {technology: "Angular 2",value: .6}
            ];
            skills.forEach(function(skill)
            {
                skillService.create(skill)
            });
        };

        userService.clear().then(createUser);
        skillService.clear().then(createSkills);

        self.response.header('Content-Type', 'text/html');
        self.response.send("DATA");

    };
    self.getData = function ()
    {
        var data = {};
        var displayData = function ()
        {
            if(data.user && data.skills)
            {
                self.responseJSON(data);
            }
        };
        var addSkillsToData = function (skills)
        {
            data.skills = skills;
            displayData();
        };
        var addUserToData = function (user)
        {
            data.user = user;
            delete data.user._id;
            displayData();
        };

        userService.get().then(addUserToData);
        skillService.getAll().then(addSkillsToData);



    }
};

module.exports = MainCtrl;