import User from '../models/userModel.js';

class SearchParameters {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	filtering() {
		const queryObj = { ...this.queryString }; // querySting = req.query

		// Converts queryObj to a string so we can use string handling w/ mongoose filtering
		let queryStr = JSON.stringify(queryObj);
		// adds the character $ to all the fields below
		queryStr = queryStr.replace(/\b(regex)\b/g, (match) => '$' + match);
		// Converts it to JSON for filtering
		this.query.find(JSON.parse(queryStr));
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
