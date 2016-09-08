var Controller = TangoRequire('Modules/mvc/Controller');
var File = TangoRequire('Modules/FileSystem/File');
var UserService = AppRequire('Service/UserService');
var SkillService = AppRequire('Service/SkillService');
var HobbyService = AppRequire('Service/HobbyService');

var MainCtrl = function (req, res)
{
    var self = Controller.call(this, req, res);
    var userService = new UserService();
    var skillService = new SkillService();
    var hobbyService = new HobbyService();

    self.index = function()
    {
        var file = new File('./App/View/index.html');
        file.read().then(function(data)
        {
            self.response.header('Content-Type', 'text/html');
            self.response.send(data);
        });
    };
    self.test = function()
    {
        var file = new File('./App/View/test.html');
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
                name: "Germán",
                lastName: "Ibañez",
                about: "Soy programador web",
                birthdate: new Date(1980,8,9),
                phone: "(+54)11-5050-6859",
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
                skillService.create(skill);
            });
        };

        var createHobbies = function ()
        {
            var hobbies = [
                {name: "Futbol"},
                {name: "Electronica"},
                {name: "Lectura"},
                {name: "Filosofia"}
            ];
            hobbies.forEach(function(hobby)
            {
                hobbyService.create(hobby);
            });

        };

        userService.clear().then(createUser);
        skillService.clear().then(createSkills);
        hobbyService.clear().then(createHobbies);

        self.response.header('Content-Type', 'text/html');
        self.response.send("DATA");

    };
    self.getData = function ()
    {
        var data = {};
        var displayData = function ()
        {
            if(data.user && data.skills && data.hobbies)
            {
                self.responseJSON(data);
            }
        };
        var addSkillsToData = function (skills)
        {
            data.skills = skills;
            displayData();
        };
        var addHobbiesToData = function (hobbies)
        {
            data.hobbies = hobbies;
            displayData();
        };
        var addUserToData = function (user)
        {
            data.user = user;
            delete data.user._id;
            displayData();
        };
        var addExperiencesToData = function ()
        {
            //var d = new Date(2016, 9, 1);
            var educations = [
                {   company: "Webmind",
                    from: new Date(2006, 0, 1),
                    to: new Date(2007, 4, 1),
                    desc: "Programador (PHP, MySQL, JavaScript), creacion y mantenimiento de sitios web, institucionales, corporativos y personales. Tambien participe en el desarrollo de un framework MVC propio para la creacion de sitios web, integracion con AJAX",
                    job:"Programador",
                    link:""
                },
                {   company: "Bracketmedia",
                    from: new Date(2007, 4, 1),
                    to: new Date(2008, 11, 1),
                    desc: "Creacion de sitios web y portales, en PHP y tambien desarrollos en Action Script (FLASH), vinculacion de swf y server a traves del componente AMF",
                    job:"Programador (PHP, MySQL, JavaScript, Action Script-FLASH, CSS)",
                    link:""
                }
            ];


        };


        userService.get().then(addUserToData);
        skillService.getAll().then(addSkillsToData);
        hobbyService.getAll().then(addHobbiesToData);



    }
};

module.exports = MainCtrl;