import React from 'react'

const Message = () => {

    const [error, setError] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("")
    // const [reminderMessage, setReminderMessage] = useState("")

  return (
    <>
    {confirmMessage && (<p className="success-message">{confirmMessage}</p>)}
    {error && (<p className="error-message">{error}</p>)}
    {/* {reminderMessage && (<p className="reminder-message">{reminderMessage}</p>)} */}
    </>
    
  )
}

export default Message