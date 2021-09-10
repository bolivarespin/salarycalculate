const fs = require("fs");
const readline = require("readline");
const Util = require('./util');
const fileName = "salary.txt"; 

let reader = readline.createInterface({
    input: fs.createReadStream(fileName)
});

reader.on("line", inputLine => {
	const objUtil = new Util();
	objUtil.results = [];
	objUtil.processLine(inputLine);
	console.table(objUtil.results);
});