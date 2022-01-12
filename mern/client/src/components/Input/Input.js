import React from 'react'

export default function Input({ message, setMessage, sendMessage }) {
    return (
         <form>
            <input 
                className='input'
                type='text'
                placeholder='Ecrivez un message...'
                value={message} 
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null} 
            />
            <button className='sendButton' onClick={(event) => sendMessage(event)} >Envoyer</button>
         </form>
    )
}
