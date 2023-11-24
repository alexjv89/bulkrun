/* ============================================CONFIGURATIONS============================================ */
var commandLineArgs = require('command-line-args');
const argVariables = [
	{ name: 'limit', type: Number }, // Max no of command to run 
	{ name: 'sleep', type: Number }, // sleep between command executions in seconds
	{ name: 'file', type: String }, // file containing commands to execute
	{ name: 'retry', type: Boolean }, // to retry failed jobs
	
];
const cli_args = commandLineArgs(argVariables);

if(!cli_args.file)
	return console.log('please specify file containing commands to execute');
/* ============================================CONFIGURATIONS============================================ */


var fs = require('fs');
var shell = require('shelljs');
// ----------------------------- Config -----------------------------
var limit = 50; 
var sleep = 1; 
// --------------------------- Config END ---------------------------

var count = 0;


console.log('retry = '+cli_args.retry);


var config = fs.readFileSync(cli_args.file, 'utf-8');
var lines = config.split(/\r?\n/);
var updated_lines = [];

lines.forEach(line =>  {
	if(count>=limit){
		updated_lines.push(line);
		return;
	}

	if(line.indexOf('node run_local')>-1){
		var command = line.split('#')[0].trim();
		var status = line.split('#')[1].trim();
		if(status=='run' || (cli_args.retry && status=='failed')){
			// console.log('');
			console.log('\n\n\n===============================');
			console.log(`>>>>> Line from file: ${command} - ${status}`);
			shell.exec(`sleep ${sleep}`);
			var a = shell.exec(command);
			if(a.stderr)
				status='failed';
			else 
				status='done';
			updated_lines.push(`${command} # ${status}`);
			count++;
		}else{
			updated_lines.push(line);
		}
	}else{
		updated_lines.push(line);
	}
});

fs.writeFileSync(cli_args.file,updated_lines.join('\r\n'));
