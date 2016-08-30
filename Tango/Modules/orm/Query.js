/**
 * Crea un
 * @param table
 * @constructor
 */
var Query = function(table)
{
    var self = this;
    self._where = [];
    self._joins = [];
    self._limit = [];
    self._orders = [];
    self.table = table;

    var parseWhere = function (field, condition, value) {
        return field + condition + "'" + value + "'";
    };

    /**
     *
     * @param field
     * @param condition
     * @param value
     * @returns {Query}
     */
    self.where = function(field, condition, value)
    {
        self._where = [];
        self._where.push(parseWhere(field, condition, value));
        return self;
    }

    /**
     *
     * @param field
     * @param condition
     * @param value
     * @returns {Query}
     */
    self.and = function(field, condition, value)
    {
        self._where.push('AND ' + parseWhere(field, condition, value));
        return self;
    };

    /**
     *
     *
     * @param field
     * @param condition
     * @param value
     * @returns {Query}
     */
    self.or = function(field, condition, value)
    {
        self._where.push('OR ' + parseWhere(field, condition, value));
        return self;
    };

    /**
     *
     * @param type
     * @param table
     */
    self.join = function (table, type)
    {
        type = type || 'INNER';
        self._joins.push({type:type, table:table});
        return self;
    };

    self.leftJoin = function(table)
    {
        return self.join(table, 'LEFT');
    };

    self.rightJoin = function(table)
    {
        return self.join(table, 'RIGHT');
    };

    /**
     *
     * @param field1
     * @param condition
     * @param field2
     */
    self.on = function (field1, condition, field2)
    {
        var last = self._joins.length-1;
        self._joins[last].field1 = field1;
        self._joins[last].condition = condition;
        self._joins[last].field3 = field2;
        return self;
    };

    /**
     *
     * @returns {string}
     */
    self.getSQL = function()
    {
        var sql = 'SELECT * FROM ' + self.table;

        if(self._joins.length)
        {
            self._joins.forEach(function(dataJoin)
            {

                sql += ' ' + dataJoin.type + ' JOIN ' + dataJoin.table + ' ON ' +  self.table + '.' + dataJoin.field1 + " " + dataJoin.condition + " " + dataJoin.table + "." + dataJoin.field3;

            });
        }

        if(self._where.length)
        {
            sql += " WHERE " + self._where.join(" ");
        }

        if(self._orders.length)
        {
            sql += " ORDER BY " + self._orders.join(", ");
        }

        if(self._limit)
        {
            sql += self._limit;
        }

        return sql;
    };

    self.limit = function(offset, init)
    {
        if(offset)
        {
            self._limit = " LIMIT " + offset;
        }

        if(offset && init)
        {
            self._limit = " LIMIT " + init + ", " + offset;
        }

        return self;
    };

    self.orderBy = function(field, order)
    {
        self._orders.push(field || '' + ' ' + order || '');
    };



};

module.exports = Query;