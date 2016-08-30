var Insert = function(table)
{
    var self = this, keys = [], values = [];
    self.table = table;


    self.values = function(data)
    {
        for(var key in data)
        {
            values.push("'" + data[key] + "'");
            keys.push(key);
        }
    }

    self.getSQL = function()
    {
        var sql = 'INSERT INTO ' + self.table;
        sql += " ( " + keys.join(', ') + " ) ";
        sql += "VALUES"
        sql += " ( " + values.join(', ') + " ) ";

        return sql;
    }
};

module.exports = Insert;