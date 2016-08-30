var Query = TangoRequire('Modules/orm/Query');
var Insert = TangoRequire('Modules/orm/Insert');
var Update = TangoRequire('Modules/orm/Update');

var ORM = {
    Query : Query,
    Insert : Insert,
    Update : Update
};

module.exports = ORM;
