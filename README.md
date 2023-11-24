# bulkrun
bulkrun commands from terminal

## Install 
```
npm install  bulkrun --save-dev
```

## Run 
```
node node_modules/@alexjv89/bulkrun --file="temp/bulk_run/movement_FY2023-24.txt"
```

## Options
- `--file` - specify file containing commands to run
- `--limit` - execute a maximum of this many commands from the file
- `--retry` - retry failed commands
- `--sleep` - sleep time in seconds between execution of each line

## Others
github repo - https://github.com/alexjv89/bulkrun
npm - https://www.npmjs.com/package/@alexjv89/bulkrun