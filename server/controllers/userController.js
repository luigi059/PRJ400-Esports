import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import jwt from 'jsonwebtoken';
import Post from '../models/postModel.js';
import Review from '../models/reviewModel.js';
import Team from '../models/teamModel.js';
import User from '../models/userModel.js';

const register = async (req, res) => {
	try {
		const { name, username, email, password, dob, nationality, position } =
			req.body;

		// 1) validation
		if (
			!name ||
			!username ||
			!email ||
			!password ||
			!dob ||
			!nationality ||
			!position
		)
			return res.status(400).json({ msg: 'All Fields Required' });
		// 2) Check if existing user exists
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ msg: 'This email already exists.' });
		// 3) Password validator
		if (password.length < 6)
			return res
				.status(400)
				.json({ msg: 'Password is at least 6 characters long.' });
		// 4) Password Encryption
		const passwordHash = await bcrypt.hash(password, 10);

		const uploadResult = await new Promise((resolve, reject) => {
			const uploadStream = cloudinary.v2.uploader.upload_stream(
				{ folder: 'prj-400-users' },
				(error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				}
			);
			uploadStream.end(req.file.buffer);
		});
		const imagePath = uploadResult.secure_url;
		const imageId = uploadResult.public_id;
		const newUser = new User({
			name,
			username,
			email,
			password: passwordHash,
			dob,
			nationality,
			position,
			picturePath: imagePath,
			pictureId: imageId,
		});
		await newUser.save();
		// Then create jsonwebtoken for authentication
		const accessToken = createAccessToken({ id: newUser._id });
		const refreshToken = createRefreshToken({ id: newUser._id });
		// Creates cookie for authentication
		res.cookie('refreshtoken', refreshToken, {
			httpOnly: true,
			path: '/user/refresh_token',
		});
		res.json({ accessToken });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const login = async (req, res) => {
	console.log('Welcome to LogIn');
	try {
		const { email, password } = req.body;
		// 1) validation
		if (!email || !password)
			return res.status(400).json({ msg: 'All Fields Required' });
		// 2) Check if existing user exists
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: 'User does not exist!' });
		// 3) Password validation
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Wrong password!' });

		// if everything is okay,then create tokens for authentication
		const accessToken = createAccessToken({ id: user._id });
		const refreshToken = createRefreshToken({ id: user._id });
		// Creates cookie for authentication
		res.cookie('refreshtoken', refreshToken, {
			httpOnly: true,
			path: '/user/refresh_token',
		});

		res.json({ accessToken });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Getting User Info
const getUser = async (req, res) => {
	let overallAvg,
		leadershipAvg,
		draftingAvg,
		knowledgeAvg,
		versatilityAvg,
		technicalAvg,
		farmingAvg;
	try {
		console.log('Welcome to userinfo');
		let userID;
		if (req.params.userID !== 'none') {
			userID = req.params.userID;
		} else {
			userID = req.user.id;
		}
		const user = await User.findById(userID).select('-password');
		if (!user) return res.status(400).json({ msg: 'User does not exist!' });
		const reviews = await Review.find({ reviewee: userID });
		if (reviews) {
			leadershipAvg =
				reviews.reduce((a, b) => a + b.leadership, 0) / reviews.length;
			draftingAvg =
				reviews.reduce((a, b) => a + b.drafting, 0) / reviews.length;
			knowledgeAvg =
				reviews.reduce((a, b) => a + b.knowledge, 0) / reviews.length;
			versatilityAvg =
				reviews.reduce((a, b) => a + b.versatility, 0) / reviews.length;
			technicalAvg =
				reviews.reduce((a, b) => a + b.technical, 0) / reviews.length;
			farmingAvg = reviews.reduce((a, b) => a + b.farming, 0) / reviews.length;
			overallAvg =
				(leadershipAvg +
					draftingAvg +
					knowledgeAvg +
					versatilityAvg +
					technicalAvg +
					farmingAvg) /
				6;
		}
		const today = new Date();
		const date = new Date(user.dob);
		var ageDate = new Date(today - date);
		user.dob = parseInt(Math.abs(ageDate.getUTCFullYear() - 1970));

		const posts = await Post.find({ userId: req.user.id });
		console.log(posts);

		if (user.teamId !== null) {
			console.log(user.teamId);
			const team = await Team.find({ _id: user.teamId });
			console.log(team);
			const userInfo = {
				userInfo: {
					user,
					rating: {
						overallAvg,
						leadershipAvg,
						draftingAvg,
						knowledgeAvg,
						versatilityAvg,
						technicalAvg,
						farmingAvg,
					},
					posts,
					team,
				},
			};
			res.json(userInfo);
		} else {
			const userInfo = {
				userInfo: {
					user,
					rating: {
						overallAvg,
						leadershipAvg,
						draftingAvg,
						knowledgeAvg,
						versatilityAvg,
						technicalAvg,
						farmingAvg,
					},
					posts,
					team: null,
				},
			};
			res.json(userInfo);
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Logout
const logout = async (req, res) => {
	try {
		res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
		return res.json({ msg: 'Logged out successfully!' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Authentication via cookies
const refreshToken = (req, res) => {
	console.log('Welcome to refreshToken');
	try {
		const rf_token = req.cookies.refreshtoken;
		if (!rf_token)
			return res.status(400).json({ msg: 'Please Login or Register' });
		// Verifying cookie
		jwt.verify(rf_token, process.env.JWT_REFRESH_SECRET, (err, user) => {
			if (err) return res.status(400).json({ msg: 'Please Login or Register' });
			const accessToken = createAccessToken({ id: user.id });
			res.json({ user, accessToken });
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Creating jwt tokens
const createAccessToken = (user) => {
	return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });
};
const createRefreshToken = (user) => {
	return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export default { register, login, getUser, logout, refreshToken };
