var mysql  = require('mysql');
function sleep( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}
var isConnect = false;
var MySQL = {
    connect:function()
    {
        var con;
        return new Promise(function(resolve, reject)
        {
            con = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'fotos_admin',
                supportBigNumbers: true
            });
            con.connect(function(error)
            {
                if(error){
                    reject(error);
                }else{
                    resolve(con)
                }
            });
        });
    }
}

module.exports = MySQL;
