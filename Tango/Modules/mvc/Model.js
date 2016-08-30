var Util = TangoRequire('Helpers/Util');
var Model = function (data) {
    var self = this;
    self.data = data;
    //self.data.relation = {};
    var relations = [];

    self.set = function(name, value)
    {
        self.data[name] = value;
        return self;
    }
    self.get = function(name, _default)
    {

        var dataRel = relations[name];

        if(dataRel)
        {
            var Collection = AppRequire('Collection/' + dataRel.use);
            var key =dataRel.key;
            var collection = new Collection();
            collection.getQuery().where(key, '=', self.get(key));

            if(dataRel.type == 'hasMany')
            {
                return new Promise(function(resolve, reject)
                {
                    collection.findAll().then(function(data)
                    {
                        self.data.relation[name] = data;
                        resolve(data);
                    }, reject);

                });


                //return collection.findAll();
            }
            else if(dataRel.type == 'hasOne')
            {
                return new Promise(function(resolve, reject)
                {
                    collection.findOne().then(function(data)
                    {
                        self.data.relation[name] = data;
                        resolve(data);
                    }, reject);
                });
            }
            else if(dataRel.type == 'manyToMany')
            {
                collection.getQuery()
                    .join(dataRel.table)
                    .on(collection.id, '=', collection.id)
                    .where(dataRel.field, '=', self.data[dataRel.field]);
                //log(collection.getQuery().getSQL());

                return new Promise(function(resolve, reject)
                {
                    collection.findAll().then(function(data)
                    {
                        self.data.relation[name] = data;
                        resolve(data);
                    }, reject);

                });
            }
        }

        return self.data[name]  || _default;
    }
    self.has = function(name)
    {
        return true;
    }
    
    self.addHasMany = function (name, collection, key)
    {
        relations[name] = {type:'hasMany', 'use':collection, key:key};
    }
    self.addHasOne = function (name, collection, key)
    {
        relations[name] = {type:'hasOne', 'use':collection, key:key};
    };
    self.manyToMany = function (name, collection, table, field)
    {
        relations[name] = {type:'manyToMany', 'use':collection, table:table, field:field};
    };


    return self;
}



module.exports = Model;
