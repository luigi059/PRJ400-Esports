import { Box } from '@mui/material';
import React from 'react';
import {
	MultiChatSocket,
	MultiChatWindow,
	useMultiChatLogic,
} from 'react-chat-engine-advanced';
import '../chat.css';
import { ChatHeader, StandardMessage } from '../components';

function Inbox() {
	const PROJECT_ID = process.env.REACT_APP_CHAT_PROJECT_ID;
	const chatProps = useMultiChatLogic(PROJECT_ID, 'testuser', '1234');

	return (
		<Box sx={{ flexBasis: '100%' }}>
			<MultiChatSocket {...chatProps} />
			<MultiChatWindow
				{...chatProps}
				style={{ height: '100vh' }}
				renderChatHeader={(chat) => <ChatHeader chat={chat} />}
				renderMessageForm={(props) => {
					return <StandardMessage props={props} activeChat={chatProps.chat} />;
				}}
			/>
		</Box>
	);
}

export default Inbox;
