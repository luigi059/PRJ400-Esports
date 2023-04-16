import {
	AttachFileOutlined,
	CancelOutlined,
	SendOutlined,
} from '@mui/icons-material';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import '../chat.css';

const MessageForm = ({
	setAttachment,
	message,
	handleChange,
	handleSubmit,
	appendText,
	handleKeyDown,
}) => {
	const [preview, setPreview] = useState('');

	return (
		<div className="message-form-container">
			{preview && (
				<div className="message-form-preview">
					<img
						alt="message-form-preview"
						className="message-form-preview-image"
						src={preview}
						onLoad={() => URL.revokeObjectURL(preview)}
					/>
					<CancelOutlined
						className="message-form-icon-x"
						onClick={() => {
							setPreview('');
							setAttachment('');
						}}
					/>
				</div>
			)}
			<div className="message-form">
				<div className="message-form-input-container">
					<input
						className="message-form-input"
						type="text"
						value={message}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						placeholder="Send a message..."
					/>
					{appendText && (
						<input
							className="message-form-assist"
							type="text"
							disabled="disabled"
							value={`${message} ${appendText}`}
						/>
					)}
				</div>
				<div className="message-form-icons">
					<Dropzone
						acceptedFiles=".jpg,.jpeg,.png"
						multiple={false}
						noClick={true}
						onDrop={(acceptedFiles) => {
							setAttachment(acceptedFiles[0]);
							setPreview(URL.createObjectURL(acceptedFiles[0]));
						}}
					>
						{({ getRootProps, getInputProps, open }) => (
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<AttachFileOutlined
									className="message-form-icon-clip"
									onClick={open}
								/>
							</div>
						)}
					</Dropzone>

					<hr className="vertical-line" />
					<SendOutlined
						className="message-form-icon-airplane"
						onClick={() => {
							setPreview('');
							handleSubmit();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default MessageForm;
