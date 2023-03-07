import User from '../models/userModel.js';

class SearchParameters {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	filtering() {
		const queryObj = { ...this.queryString }; // querySting = req.query

		console.log(queryObj);

		// Converts queryObj to a string so we can use string handling w/ mongoose filtering
		let queryStr = JSON.stringify(queryObj);
		console.log(queryStr);
		// adds the character $ to all the fields below
		queryStr = queryStr.replace(/\b(regex)\b/g, (match) => '$' + match);
		console.log(queryStr);
		// Converts it to JSON for filtering
		this.query.find(JSON.parse(queryStr));
		console.log(this);
		return this;
	}
}

const miniSearch = async (req, res) => {
	console.log('Welcome to the mini search');
	try {
		const filter = new SearchParameters(User.find(), req.query).filtering();
		const user = await filter.query;
		res.json({
			status: 'success',
			result: user.length,
			players: user,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default { miniSearch };
