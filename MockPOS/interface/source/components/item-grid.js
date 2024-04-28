import React from 'react';
import {Box} from 'ink';
import ItemButton from './item-button.js';

function ItemGrid({items = [], columns = 3, focusedIndex}) {
	const rows = Math.ceil(items.length / columns);

	return (
		<Box flexDirection="column" gap={1}>
			{Array.from({length: rows}).map((_, rowIndex) => (
				<Box
					key={rowIndex}
					flexDirection="row"
					justifyContent="flex-start"
					gap={1}
				>
					{items
						.slice(rowIndex * columns, (rowIndex + 1) * columns)
						.map((item, index) => (
							<ItemButton
								key={item.name}
								item={item}
								isFocused={focusedIndex === rowIndex * columns + index}
							/>
						))}
				</Box>
			))}
		</Box>
	);
}

export default ItemGrid;
