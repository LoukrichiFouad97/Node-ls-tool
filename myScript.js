let counter = 0;

module.exports = {
	increase() {
		counter += 1;
	},
	getCounter() {
		return counter;
	},
};
