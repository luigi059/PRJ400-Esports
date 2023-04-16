import Post from '../models/postModel.js';

import AWS from 'aws-sdk';
const s3 = new AWS.S3();

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

export const createPost = async (req, res) => {
	try {
		console.log(req.body);
		console.log(req.file);
		res.status(200).json('success');
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
	/* 	const params = {
		Bucket: 'prj400-s00188563',
		Key: file.originalname,
		Body: file.buffer,
		ContentType: file.mimetype,
		ACL: 'public-read',
	}; */

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
