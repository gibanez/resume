global.TangoRequire = function(name)
{
    return require(__dirname + '/' + name);
}

global.AppRequire = function(name)
{
    return require(__dirname + '/../App/' + name);
}