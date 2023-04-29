import { Box } from '@mui/material';
import React, { useContext } from 'react';
import {
	MultiChatSocket,
	MultiChatWindow,
	useMultiChatLogic,
} from 'react-chat-engine-advanced';
import { GlobalState } from '../GlobalState';
import '../chat.css';
import { ChatHeader, StandardMessage } from '../components';

function Inbox() {
	const state = useContext(GlobalState);
	const [user] = state.userApi.user;
	const chatProps = useMultiChatLogic(
		'fffa70d1-d539-4e3e-a7aa-ca10cef669a8',
		user.userInfo.user.username,
		user.userInfo.user.username
	);

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
