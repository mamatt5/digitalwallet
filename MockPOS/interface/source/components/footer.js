import React from 'react';
import {Text, Box} from 'ink';

function Footer() {
	return (
		<Box borderStyle="single" padding={1} flexDirection="column">
			<Text color="magenta">
				<Text bold>Navigation: </Text>
				<Text color="yellow">Arrows</Text> and <Text color="yellow">Tab</Text>{' '}
				to navigate | <Text color="yellow">v</Text> to switch view
			</Text>
			<Text color="magenta">
				<Text bold>Transaction view: </Text>
				<Text color="yellow">Enter</Text> to add,{' '}
				<Text color="yellow">Delete</Text> to remove
			</Text>
			<Text color="magenta">
				<Text bold>Client view: </Text> <Text color="yellow">Enter</Text> to
				send transaction, <Text color="yellow">b</Text> to change broadcast
				status
			</Text>
		</Box>
	);
}

export default Footer;
