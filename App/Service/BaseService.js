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
    self.get = function () {
        return Model.findOne({}, '-_id -__v');
    };
    self.getAll = function () {
        return Model.find({}, '-_id -__v');
    }


};

module.exports = BaseService;