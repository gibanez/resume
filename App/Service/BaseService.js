var BaseService = function (Model) {

    var self = this;
    self.clear = function()
    {
        return Model.remove({});
    };
    self.create = function(data)
    {
        var user = new Model(data);
        return user.save();
    };
    self.get = function (full) {

        var fields = '';
        if(!full)
        {
            fields = '-_id -__v';
        }

        return Model.findOne({}, fields);
    };
    self.getAll = function (full) {

        var fields = '';
        if(!full)
        {
            fields = '-_id -__v';
        }

        return Model.find({}, fields);
    }


};

module.exports = BaseService;