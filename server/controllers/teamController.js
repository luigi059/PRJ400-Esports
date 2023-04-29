import cloudinary from 'cloudinary';
import Team from '../models/teamModel.js';
import User from '../models/userModel.js';

const createTeam = async (req, res) => {
	try {
		if (req.file) {
			const { name } = req.body;
			const uploadResult = await new Promise((resolve, reject) => {
				const uploadStream = cloudinary.v2.uploader.upload_stream(
					{ folder: 'prj-400-team' },
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
			const newTeam = new Team({
				name,
				picturePath: imagePath,
				pictureId: imageId,
			});
			await newTeam.save();
			await User.findByIdAndUpdate(
				{ _id: req.user.id },
				{
					teamId: newTeam._id,
				}
			);
		} else {
			const { name } = req.body;
			const newTeam = new Team({
				name,
			});
			await newTeam.save();
			await User.findByIdAndUpdate(
				{ _id: req.user.id },
				{
					teamId: newTeam._id,
				}
			);
		}

		res.status(200).json('Team successfully created');
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const leaveTeam = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const teamMembers = await User.find({ teamId: user.teamId });
		if (teamMembers.length == 1) {
			await User.findByIdAndUpdate(
				{ _id: req.params.id },
				{
					teamId: null,
				}
			);
			await Team.findByIdAndDelete(user.teamId);
		} else {
			await User.findByIdAndUpdate(
				{ _id: req.params.id },
				{
					teamId: null,
				}
			);
		}

		res.status(200).json('You successfully left the team');
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getTeamMembers = async (req, res) => {
	try {
		const teamMembers = await User.find({ teamId: req.params.id });

		res.status(200).json(teamMembers);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default { createTeam, leaveTeam, getTeamMembers };
