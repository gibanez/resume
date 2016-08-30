var Cli = function(args) 
{
	var self = this;
	//console.info(args);

	var d = args[2].split(":");
	var command = d[0]; 
	var action = d[1]; 

	self.execute = function()
	{
		var cmd = AppRequire('Command/' + command + '/' + action);
		//console.info(cmd);
		cmd.setArgsLine(args);
		cmd.execute();
	}

}

module.exports = Cli;