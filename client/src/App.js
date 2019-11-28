import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
import lib from './lib/messages';
import useSocket from './hooks/useSocket';
import { SET_MESSAGES, SET_USERNAME } from './reducer/dataReducer';

function App() {

	const { state, dispatch } = useSocket('ws://localhost:3001');

	console.log(state.messages);

	// const [messages, setMessages] = useState(lib.messages);
	// const [currentUser, setCurrentUser] = useState({ name: 'Anonymous' });

	// Sending message from the chat to the server
	const sendMessage = (message) => {

		// Create a new message object
		const newMessage = {
			id: Math.random().toString(36).substr(2, 6),
			type: 'postMessage',
			content: message,
			username: state.currentUser.name
		}


		state.socket.send(JSON.stringify(newMessage))

		// dispatch({ type: SET_MESSAGES, message: newMessage });
		// setMessages([...messages, newMessage]);

		// console.log(state.messages);
	};

	const updateUser = (username) => {

		// Create a notification object		
		const newNotification = {
			id: Math.random().toString(36).substr(2, 6),
			type: 'incomingNotification',
			content: `${state.currentUser.name} has changed their name to ${username}`,
		}

		dispatch({ type: SET_MESSAGES, message: newNotification });
		dispatch({ type: SET_USERNAME, username });

		// updating the username in the state
		// setCurrentUser({ name: username });

		// setMessages([...messages, newNotification]);


	};

	return (
		<div>
			<NavBar />
			<MessageList messages={state.messages} />
			<ChatBar username={state.currentUser.name} sendMessage={sendMessage} updateUser={updateUser} />
		</div>
	);
}

export default App;
