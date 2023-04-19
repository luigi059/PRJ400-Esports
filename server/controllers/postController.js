import cloudinary from 'cloudinary';
import Post from '../models/postModel.js';

export const createPost = async (req, res) => {
	try {
		console.log(req.body);
		console.log(req.file);
		const { userId, name, username, description } = req.body;
		const uploadResult = await new Promise((resolve, reject) => {
			const uploadStream = cloudinary.v2.uploader.upload_stream(
				{ folder: 'prj-400-posts' },
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
		console.log(uploadResult);
		const imagePath = uploadResult.secure_url;
		const imageId = uploadResult.public_id;
		const newPost = new Post({
			userId,
			name,
			username,
			description,
			picturePath: imagePath,
			pictureId: imageId,
			likes: {},
			comments: [],
		});
		await newPost.save();

		const posts = await Post.find({ userId: req.user.id });
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const deletePost = async (req, res) => {
	console.log('Deleting post...');
	try {
		const post = await Post.findById(req.params.id);

		cloudinary.v2.uploader.destroy(post.pictureId, async (err, result) => {
			if (err) throw err;
		});

		await Post.findByIdAndDelete(req.params.id);
		res.json({ msg: 'Post Successfuly Deleted!' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default { createPost, deletePost };
