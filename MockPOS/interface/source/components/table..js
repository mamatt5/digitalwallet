import React from 'react';
import {Text, Box} from 'ink';

function Table({data}) {
	const columnWidths = [10, 8, 6];

	const renderDivider = () => (
		<Box flexDirection="row">
			{columnWidths.map((width, index) => (
				<Box key={`divider-${index}`} flexDirection="row">
					<Text>{'─'.repeat(width)}</Text>
					{index < columnWidths.length - 1 && <Text>┼</Text>}
				</Box>
			))}
		</Box>
	);

	const renderHeader = () => (
		<Box flexDirection="row">
			<Box width={columnWidths[0]}>
				<Text bold color="yellow">
					Item
				</Text>
			</Box>
			<Text>│</Text>
			<Box width={columnWidths[1]}>
				<Text bold color="yellow">
					Price
				</Text>
			</Box>
			<Text>│</Text>
			<Box width={columnWidths[2]}>
				<Text bold color="yellow">
					Qty
				</Text>
			</Box>
		</Box>
	);

	const renderRow = (row, rowIndex) => (
		<Box flexDirection="row">
			{row.map((cell, cellIndex) => (
				<Box key={`cell-${rowIndex}-${cellIndex}`} flexDirection="row">
					<Box width={columnWidths[cellIndex]}>
						<Text>{cell}</Text>
					</Box>
					{cellIndex < row.length - 1 && <Text>│</Text>}
				</Box>
			))}
		</Box>
	);

	return (
		<Box flexDirection="column">
			{renderHeader()}
			{renderDivider()}
			{data.map((row, rowIndex) => (
				<Box key={`row-${rowIndex}`}>{renderRow(row, rowIndex)}</Box>
			))}
		</Box>
	);
}

export default Table;
