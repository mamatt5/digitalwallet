import React, {useState, useEffect} from 'react';
import {Text, Box, useInput, useApp} from 'ink';
import ItemGrid from './components/item-grid.js';
import ClientGrid from './components/client-grid.js';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Table from './components/table..js';
import {
	initializeWebSocket,
	sendMessageToClient,
	broadcastMessage,
	closeWebSocket,
	fetchActiveClients,
} from './api/websocket.js';

function App() {
	const [selectedItems, setSelectedItems] = useState([]);
	const [focusedItemIndex, setFocusedItemIndex] = useState(0);
	const [activeClients, setActiveClients] = useState([]);
	const [focusedClientIndex, setFocusedClientIndex] = useState(0);
	const [isBroadcastAll, setIsBroadcastAll] = useState(false);
	const [view, setView] = useState('transaction');

	const {exit} = useApp();

	useEffect(() => {
		initializeWebSocket();

		return () => {
			closeWebSocket();
		};
	}, []);

	useEffect(() => {
		const getActiveClients = async () => {
			const clients = await fetchActiveClients();
			setActiveClients(clients);
		};

		getActiveClients();
		const interval = setInterval(getActiveClients, 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const transactionSummary = selectedItems.map(item => [
		item.name,
		`$${item.price.toFixed(2)}`,
		`${item.quantity}`,
	]);

	const transactionData = {
		merchant_id: 'M12345678',
		transaction_id: 'TX12346789',
		items: selectedItems.map(item => ({
			name: item.name,
			price: item.price.toFixed(2),
			quantity: item.quantity,
		})),
		total_amount: selectedItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0,
		),
	};

	const availableItems = [
		{name: 'Item 1', price: 10},
		{name: 'Item 2', price: 15.5},
		{name: 'Item 3', price: 20.34},
		{name: 'Item 4', price: 25.99},
		{name: 'Item 5', price: 30},
		{name: 'Item 6', price: 35.1},
	];

	const handleArrowNavigation = key => {
		const gridItems = view === 'transaction' ? availableItems : activeClients;
		const gridLength = gridItems.length;
		const setFocusedIndex =
			view === 'transaction' ? setFocusedItemIndex : setFocusedClientIndex;
		const previousIndex =
			view === 'transaction' ? focusedItemIndex : focusedClientIndex;

		if (key.upArrow) {
			setFocusedIndex(previousIndex =>
				previousIndex >= 3
					? previousIndex - 3
					: (gridLength + previousIndex - 3) % gridLength,
			);
		}

		if (key.downArrow) {
			setFocusedIndex(previousIndex => (previousIndex + 3) % gridLength);
		}

		if (key.leftArrow) {
			setFocusedIndex(previousIndex =>
				previousIndex > 0 ? previousIndex - 1 : gridLength - 1,
			);
		}

		if (key.rightArrow) {
			setFocusedIndex(previousIndex => (previousIndex + 1) % gridLength);
		}
	};

	useInput((input, key) => {
		if (key.escape) {
			exit();
		}

		handleArrowNavigation(key);

		if (key.return) {
			if (view === 'transaction') {
				const selectedItem = availableItems[focusedItemIndex];
				handleSelect(selectedItem);
			} else if (view === 'client') {
				const focusedClientId = activeClients[focusedClientIndex];
				if (isBroadcastAll) {
					broadcastMessage(transactionData);
				} else {
					sendMessageToClient(focusedClientId, transactionData);
				}
			}
		}

		if (key.delete && view === 'transaction') {
			const selectedItem = availableItems[focusedItemIndex];
			handleDeselect(selectedItem);
		}

		if (input === 'v') {
			setView(previousView =>
				previousView === 'transaction' ? 'client' : 'transaction',
			);
		}

		if (input === 'b' && view === 'client') {
			setIsBroadcastAll(previousState => !previousState);
		}
	});

	const handleSelect = item => {
		const itemIndex = selectedItems.findIndex(i => i.name === item.name);
		if (itemIndex === -1) {
			setSelectedItems([...selectedItems, {...item, quantity: 1}]);
		} else {
			const updatedItems = [...selectedItems];
			updatedItems[itemIndex].quantity += 1;
			setSelectedItems(updatedItems);
		}
	};

	const handleDeselect = item => {
		const itemIndex = selectedItems.findIndex(i => i.name === item.name);
		if (itemIndex !== -1) {
			const updatedItems = [...selectedItems];
			updatedItems[itemIndex].quantity -= 1;
			if (updatedItems[itemIndex].quantity <= 0) {
				updatedItems.splice(itemIndex, 1);
			}

			setSelectedItems(updatedItems);
		}
	};

	const totalPrice = selectedItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	return (
		<Box
			flexDirection="column"
			borderStyle="double"
			borderColor="magenta"
			width={80}
			minWidth={60}
			maxWidth={100}
		>
			<Header />
			<Box flexDirection="row">
				<Box flexDirection="column" width={40} borderStyle="single">
					<Text>
						<Text bold color="yellow">
							Transaction ID:
						</Text>{' '}
						TX12346789
					</Text>
					<Text>
						<Text bold color="yellow">
							Merchant ID:
						</Text>{' '}
						M12345678
					</Text>
					<Box marginTop={1}>
						{view === 'transaction' ? (
							<ItemGrid
								items={availableItems}
								columns={3}
								focusedIndex={focusedItemIndex}
							/>
						) : (
							<ClientGrid
								clients={activeClients}
								columns={3}
								focusedIndex={focusedClientIndex}
							/>
						)}
					</Box>
					{view === 'client' && (
						<Box marginTop={1}>
							<Text>
								<Text bold>Broadcast All:</Text> {isBroadcastAll ? 'Yes' : 'No'}
							</Text>
						</Box>
					)}
				</Box>

				<Box
					flexDirection="column"
					paddingLeft={2}
					borderStyle="single"
					width={40}
				>
					<Text bold underline color="yellow">
						Transaction Summary
					</Text>
					<Box marginTop={1}>
						<Table data={transactionSummary} />
					</Box>
					<Text bold color="yellow" marginTop={1}>
						Total Price: <Text>${totalPrice.toFixed(2)}</Text>
					</Text>
				</Box>
			</Box>
			<Footer />
		</Box>
	);
}

export default App;
