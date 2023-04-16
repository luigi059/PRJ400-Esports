import { ChatBubbleOutlined } from '@mui/icons-material';
import React from 'react';
import '../chat.css';

const ChatHeader = ({ chat }) => {
	return (
		<div className="chat-header">
			<div className="flexbetween">
				<ChatBubbleOutlined className="icon-chat" />
				<h3 className="header-text">{chat.title}</h3>
			</div>
			<div className="flexbetween">
				{chat.description !== '⬅️ ⬅️ ⬅️' ? (
					<p className="header-text">{chat.description}</p>
				) : (
					<p className="header-text">no chat selected</p>
				)}
			</div>
		</div>
	);
};

export default ChatHeader;
