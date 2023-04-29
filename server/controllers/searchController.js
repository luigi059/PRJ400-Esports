import Team from '../models/teamModel.js';
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

const search = async (req, res) => {
	try {
		const filter = new SearchParameters(User.find(), req.query).filtering();
		let user = await filter.query;
		const today = new Date();
		user.forEach((el) => {
			const date = new Date(el.dob);
			var ageDate = new Date(today - date);
			el.dob = parseInt(Math.abs(ageDate.getUTCFullYear() - 1970));
		});
		for (let i = user.length - 1; i >= 0; i--) {
			if (user[i]._id == req.user.id) {
				user.splice(i, 1);
			}
		}
		res.json({
			status: 'success',
			result: user.length,
			players: user,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default { search };
