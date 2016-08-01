var fs = require('fs');

var request = require('request');

module.exports = {
	date: function() {
		process.stdout.write(Date());
	},

	pwd: function() {
		process.stdout.write(process.cwd());
	},

	ls: function() {
		fs.readdir('.', function(err, files) {
  			if (err) throw err;
  			files.forEach(function(file) {
   		 		process.stdout.write(file.toString() + "\n");
  			});
		});
	},

	echo: function(file) {
		process.stdout.write(file);
	},

	cat: function(file) {
		fs.readFile(file, 'utf8', function(err, data) {
			if (err) throw err;
			process.stdout.write(data);
		})
	},

	head: function(file) {
		fs.readFile(file, 'utf8', function(err, data) {
			if (err) throw err;
			var lines = data.split("\n");
			process.stdout.write(lines.slice(0, 5).join("\n"));
		})
	},

	tail: function(file) {
		fs.readFile(file, 'utf8', function(err, data) {
			if (err) throw err;
			var lines = data.split("\n");
			process.stdout.write(lines.slice(-5).join("\n"));
		})
	},

	sort: function(file) {
		fs.readFile(file, 'utf8', function(err, data) {
			if (err) throw err;
			var lines = data.split("\n");
			var sorted = lines.sort();
			process.stdout.write(sorted.join("\n"));
		})
	},

	wc: function(file) {
	fs.readFile(file, 'utf8', function(err, data) {
		if (err) throw err;
		var lines = data.split("\n");
		process.stdout.write(String(lines.length));
		})
	},

	uniq: function(file) {
		fs.readFile(file, 'utf8', function(err, data) {
			if (err) throw err;
			var lines = data.split("\n");
			var sorted = lines.sort();
			var newArr = [];
			newArr.push(lines[0]);
			for (var i = 0; i < lines.length-1; i++) {
				if (lines[i+1] !== lines [i]) {
					newArr.push(lines[i+1]);
				}
			}
			var output = newArr.join("\n");
			this.done(output);
		}.bind(this));

	},

	curl: function(file) {
		var output = request.get(file);
		this.done(output);
	},

	done: function(output) {
		process.stdout.write(output);
  		process.stdout.write('\nprompt > ');
	},

};
