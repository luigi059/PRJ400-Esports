import Post from '../models/postModel.js';

export const createPost = async (req, res) => {
	try {
		const {
			userId,
			name,
			location,
			description,
			picturePath,
			userPicturePath,
		} = req.body;
		const newPost = new Post({
			userId: req.user.id,
			name,
			location,
			description,
			userPicturePath,
			picturePath,
			likes: {},
			comments: [],
		});
		await newPost.save();

		const post = await Post.find();
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default { createPost };
