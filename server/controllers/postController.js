import cloudinary from 'cloudinary';
import Post from '../models/postModel.js';

export const createPost = async (req, res) => {
	try {
		const file = req.file;
		cloudinary.v2.uploader
			.upload_stream(
				{
					folder: 'prj-400-posts',
				},
				(error, result) => {
					if (error) {
						console.log(error);
						res.status(500).json('Error uploading to Cloudinary');
					} else {
						res.json(result);
					}
				}
			)
			.end(file.buffer);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
	/* try {
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
	} */
};

export default { createPost };
