#!/usr/bin/env node
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const log = console.log;

fs.readdir(process.cwd(), async (err, filenames) => {
	if (err) {
		throw new Error(err);
	}

	// METHOD 2
	// const lstat = util.promisify(fs.lstat);

	// METHOD 3
	const { lstat } = fs.promises;

	const statPromises = filenames.map((file) => {
		return lstat(file);
	});

	const allPromises = await Promise.all(statPromises);

	allPromises.forEach((stat, index) => {
		if (stat.isDirectory()) {
			log(chalk.bgGreen.black(filenames[index]));
		} else {
			log(filenames[index]);
		}
	});
});

// METHOD 1
// const lstat = (filename) => {
// 	return new Promise((resolve, reject) => {
// 		fs.lstat(filename, (err, stats) => {
// 			if (err) {
// 				reject(err);
// 			}

// 			resolve(stats);
// 		});
// 	});
// };

// var url = new URL("http://www.omdbapi.com/"),
// 	params = {
// 		apikey: "2f7c208",
// 		s: "Avengers",
// 	};
// Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
// fetch(url)
// 	.then((res) => res.json())
// 	.then((data) => {
// 		console.log(data);
// 	});
