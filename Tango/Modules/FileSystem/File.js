var fs = require('fs');

var File = function(path)
{
    var self = this;
    self.read = function ()
    {
        return new Promise(function(resolve, reject)
        {
            fs.readFile(path, function (err,data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    };
    self.exists = function ()
    {
        return fs.existsSync(path);
    };
    self.getPath = function()
    {
        return path;
    }


};
module.exports = File;
