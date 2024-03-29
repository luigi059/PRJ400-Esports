import cloudinary from 'cloudinary';
import Post from '../models/postModel.js';

export const createPost = async (req, res) => {
	try {
		const { userId, name, username, description } = req.body;
		if (req.file) {
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
			const imagePath = uploadResult.secure_url;
			const imageId = uploadResult.public_id;
			const newPost = new Post({
				userId,
				name,
				username,
				description,
				picturePath: imagePath,
				pictureId: imageId,
			});
			await newPost.save();
		} else {
			const newPost = new Post({
				userId,
				name,
				username,
				description,
			});
			await newPost.save();
		}

		const posts = await Post.find({ userId: req.user.id });
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const deletePost = async (req, res) => {
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

export const getPost = async (req, res) => {
	try {
		const post = await Post.find({ userId: req.params.id }).sort({
			createdAt: -1,
		});
		res.json(post);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default { createPost, deletePost, getPost };
