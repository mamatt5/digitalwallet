import React from 'react';
import {Box} from 'ink';
import ClientButton from './client-button.js';

function ClientGrid({clients = [], columns = 3, focusedIndex}) {
	const rows = Math.ceil(clients.length / columns);

	return (
		<Box flexDirection="column" gap={1}>
			{Array.from({length: rows}).map((_, rowIndex) => (
				<Box
					key={rowIndex}
					flexDirection="row"
					justifyContent="flex-start"
					gap={1}
				>
					{clients
						.slice(rowIndex * columns, (rowIndex + 1) * columns)
						.map((clientId, index) => (
							<ClientButton
								key={clientId}
								clientId={clientId}
								isFocused={focusedIndex === rowIndex * columns + index}
							/>
						))}
				</Box>
			))}
		</Box>
	);
}

export default ClientGrid;
