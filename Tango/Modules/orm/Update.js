var Update = function(table)
{
    var self = this,
        _values = [];

    self._where = [];
    self.table = table;

    var parseWhere = function (field, condition, value) {
        return field + condition + value;
    }

    self.where = function(field, condition, value)
    {
        self._where = [];
        self._where.push(parseWhere(field, condition, value));
        return self;
    }

    self.and = function(field, condition, value)
    {
        self._where.push('AND ' + parseWhere(field, condition, value));
        return self;
    }

    self.or = function(field, condition, value)
    {
        self._where.push('OR ' + parseWhere(field, condition, value));
        return self;
    }


    self.values = function(data)
    {
        for(var key in data)
        {
            _values.push(key + " = '" + data[key] + "'");
        }
    }

    self.getSQL = function()
    {
        var sql = 'UPDATE ' + self.table;
        sql += " SET " + _values.join(', ');

        if(self._where.length)
        {
            sql += " WHERE " + self._where.join(" ");
        }

        return sql;
    }
};

module.exports = Update;