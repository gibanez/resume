var ORM = TangoRequire('Modules/orm/ORM');
var Query = ORM.Query;
var Insert = ORM.Insert;
var Update = ORM.Update;

var Collection = function (table) {
    var self = this;
    self.db = myDB();
    self.table = table;

    var query = function(sql, bind, plural)
    {

        if(plural == undefined)
        {
            plural = true
        }
        //plural = plural || true;
        log(sql);


        return new Promise(function(resolve, reject)
        {
            self.db.query(sql, bind, function(err, data)
            {



                if(err)
               {
                   return reject(err);
               }

                if(data.length == 0)
                {
                    return reject({msg:"not data"});
                }

                //log(data);

                if(data.OkPacket)
                {
                    return resolve(data);
                }


                if(plural)
                {
                    var models = [];
                    data.forEach(function(d)
                    {
                        models.push(new self.model(d));
                    });
                    resolve(models);
                }
                else
                {
                    resolve(new self.model(data[0]));
                }
            });
        });
    }

    var execute = function(sql, bind)
    {
        return new Promise(function(resolve, reject)
        {
            self.db.query(sql, bind, function(err, data)
            {
                if(err)
                {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    };

    self.findAll = function(limit)
    {
        //var sql = 'SELECT * FROM ' + self.table;
        var sql = q.getSQL();
        return query(sql, []);
    };
    self.find = function(id)
    {
        var sql = q.where(self.id, '=', id).getSQL();
        return query(sql, [], false);

    };

    self.findOne = function()
    {
        var sql = q.getSQL();
        return query(sql, [], false);
    };

    self.create = function(data)
    {
        return new self.model(data  || {});
    };

    self.getQuery = function()
    {
        return q;
    };

    self.getTable = function()
    {
        return self.table;
    };

    self.persist = function(model)
    {
        var exec;
        if(model.data[self.id])
        {
            exec = new Update(self.table);
            exec.values(model.data);
            exec.where(self.id, '=', model.data[self.id]);
        }
        else
        {
            exec = new Insert(self.table);
            exec.values(model.data);
        }
        var sql = exec.getSQL();
        return execute(sql);
    }
    var q = new Query(self.table);
    return self;
}



module.exports = Collection;
