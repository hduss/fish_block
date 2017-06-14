
class JSONtrans {
	
	transform(results) {

			let string = JSON.stringify(results);
			const json = JSON.parse(string);

			const result = json[0];

			return result;
	}
}

module.exports = JSONtrans;