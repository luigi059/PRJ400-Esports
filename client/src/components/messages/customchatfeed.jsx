import React from 'react';
import { ChatCard } from 'react-chat-engine-advanced';

const CustomChatFeed = (chats) => {
	if (chats) {
		console.log(chats);
		console.log(chats.chats);
		chats.chats.map((chat) => console.log(chat.title));
	}

	return chats ? (
		<div></div>
	) : (
		<>
			{chats.chats.map((chat) => (
				<ChatCard title={chat.title} />
			))}
		</>
	);
};

export default CustomChatFeed;
