import React from 'react';
import {Text, Box} from 'ink';

function ClientButton({clientId, isFocused}) {
	return (
		<Box
			borderStyle={isFocused ? 'double' : 'single'}
			borderColor={isFocused ? 'yellow' : 'white'}
			paddingX={1}
			paddingY={0}
			backgroundColor={isFocused ? 'yellow' : 'white'}
		>
			<Text color={isFocused ? 'black' : 'white'}>{clientId}</Text>
		</Box>
	);
}

export default ClientButton;
