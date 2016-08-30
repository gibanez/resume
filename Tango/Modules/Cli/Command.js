var Command = function(name, desc) 
{
	var self = this;
	self.args = self.opts = [];
	var callback;
	var ArgsLine;
	self.setArgsLine = function(argsLine)
	{
		ArgsLine = argsLine;
	}
	self.addOption = function(key, help, defaultValue)
	{
		self.opts.push({key:key, help:help, defaultValue:defaultValue});
	}
	self.addArgument = function(key, help, type)
	{
		self.args.push({key:key, help:help, type:type});
	}
	self.setAction = function(fnc)
	{
		callback = fnc
	}
	self.hasOption = function(key)
	{
		self.opts.forEach(function(item){
			console.info(item);
		});
	}
	self.getAction = function()
	{
		return callback;
	}
	self.getOption = function(key)
	{

	}
	self.execute = function()
	{

		self.hasOption('help');

		var action = self.getAction();
		action(self);
	}
}

module.exports = Command;