import axios from 'axios';
import WebSocket from 'ws';

let socket = null;
let reconnectInterval = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const initialReconnectDelay = 1000;
const maxReconnectDelay = 30000;

const connectWebSocket = url => {
	socket = new WebSocket(url);

	socket.addEventListener('open', () => {
		console.log('WebSocket connection established');
		clearInterval(reconnectInterval);
		reconnectAttempts = 0;
	});

	socket.onmessage = event => {
		const data = JSON.parse(event.data);
		console.log('Received message:', data);
	};

	socket.addEventListener('close', () => {
		console.log('WebSocket connection closed');
		startReconnect(url);
	});

	socket.onerror = error => {
		// Console.error('WebSocket error:', error);
	};
};

const startReconnect = url => {
	if (reconnectAttempts < maxReconnectAttempts) {
		const reconnectDelay = Math.min(
			initialReconnectDelay * 2 ** reconnectAttempts,
			maxReconnectDelay,
		);

		reconnectInterval = setTimeout(() => {
			console.log(
				`Attempting to reconnect (attempt ${reconnectAttempts + 1})...`,
			);
			connectWebSocket(url);
			reconnectAttempts++;
		}, reconnectDelay);
	} else {
		console.log('Maximum reconnection attempts reached. Stopping.');
	}
};

export const initializeWebSocket = url => {
	connectWebSocket('ws://192.168.1.110:8000/ws/interface');
};

export const sendMessageToClient = (clientId, message) => {
	if (socket) {
		socket.send(
			JSON.stringify({
				type: 'send_to_connection',
				client_id: clientId,
				data: message,
			}),
		);
	}
};

export const broadcastMessage = message => {
	if (socket) {
		socket.send(
			JSON.stringify({
				type: 'broadcast',
				data: message,
			}),
		);
	}
};

export const closeWebSocket = () => {
	if (socket) {
		socket.close();
	}
};

export const fetchActiveClients = async () => {
	try {
		const response = await axios.get(
			'http://192.168.1.110:8000/active-clients',
		);
		return response.data.clients;
	} catch {
		// Console.error('Error fetching active clients:', error);
		return [];
	}
};
