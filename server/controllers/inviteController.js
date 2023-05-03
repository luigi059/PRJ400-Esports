import Invite from '../models/inviteModel.js';
import User from '../models/userModel.js';

const sendInvite = async (req, res) => {
	const { inviteeId, teamId, teamName, teamPicture, inviterName, description } =
		req.body;
	try {
		const newInvite = new Invite({
			inviteeId,
			teamId,
			teamName,
			teamPicture,
			inviterName,
			description,
		});
		await newInvite.save();
		res.json('Successfully sent an invite');
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getInvites = async (req, res) => {
	try {
		const invites = await Invite.find({ inviteeId: req.user.id }).sort({
			createdAt: -1,
		});
		if (!invites) return res.status(400).json({ msg: 'No Reviews Exist' });

		res.json(invites);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const acceptInvite = async (req, res) => {
	const { userId } = req.body;
	try {
		const invite = await Invite.findOne({ _id: req.params.id });
		await User.findByIdAndUpdate(
			{ _id: userId },
			{
				teamId: invite.teamId,
			}
		);
		await Invite.findOneAndDelete({ _id: req.params.id });

		res.json('success');
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const rejectInvite = async (req, res) => {
	try {
		await Invite.findOneAndDelete({ _id: req.params.id });

		res.json('success');
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default { sendInvite, getInvites, acceptInvite, rejectInvite };
