var Controller = function (req, res) {
    var self = this;
    self.request = req;
    self.response = res;
    self.responseError = function (msg)
    {
        self.response.send({error:msg});
    };
    self.responseJSON = function(data)
    {
        self.response.setHeader('Content-Type', 'application/json');
        self.response.json(data);
    };
    return self;
}

module.exports = Controller;
