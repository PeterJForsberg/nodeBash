var commandFns = require('./command.js');

// console.log(process);

// console.log(Object.keys(process));

// Output a prompt
  process.stdout.write('prompt > ');

// // The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  // var cmd = data.toString().trim(); // remove the newline
  var cmd = data.toString().split(" ")[0].trim(); 
  var file = data.toString().slice(cmd.length).trim() || null;
  commandFns[(cmd)](file);
  //  }
});
