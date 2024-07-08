import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../Message/Message.css';

const Message = ({initialMessage, initialMessageType}) => {

  const [message, setMessage] = useState(initialMessage);
  const [messageType, setMessageType] = useState(initialMessageType);

  useEffect(() => {
    setMessage(initialMessage);
    setMessageType(initialMessageType);

  }, [initialMessage, initialMessageType]);

  useEffect(() => {
    if (message) {
        const timer = setTimeout(() => {
          clearMessage();
        }, 3000);

        // Cleanup the timeout if the component unmounts or message changes
        return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  const clearMessage = () => {
    setMessage("");
    setMessageType("");
  };

  return (
    <p className={`message ${messageType}`}>
      {message}
    </p>
  )
}

Message.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.oneOf(['error', 'confirmation', 'reminder'])
};

export default Message;