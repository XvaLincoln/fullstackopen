const Notification = ({ message }) => { 
    if (!message) return null 
    
    const msg = String(message) 

    const styleClass = message.toLowerCase().includes('added') 
    ? 'success' 
    : 'error'

    return ( 
        <div className={styleClass}>
            {message} 
        </div> 
    ) 
} 
export default Notification