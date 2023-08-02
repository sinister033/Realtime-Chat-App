import React, { useState } from 'react'
import "./chatInput.css"
import { BiSolidSend } from "react-icons/bi"
import EmojiPicker from "emoji-picker-react"
import { BsEmojiSunglassesFill } from "react-icons/bs"

const ChatInput = ({ messageSendHandler }) => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [message, setMessage] = useState('');

    const emojiHandler = () => {
        setShowEmojis(prev => !prev)
    }
    const emojiClickHandler = (emoji) => {
        let msg = message;
        // console.log(emoji)
        msg += emoji.emoji;
        setMessage(msg)
    }
    const sendChat = (e) => {
        e.preventDefault();
        if (message.length > 0) {
            messageSendHandler(message)
            setMessage("")
        }
    }
    return (
        <div className='chatInputContainer'>
            <div className="btnContainer">
                <div className="emoji">
                    <BsEmojiSunglassesFill onClick={emojiHandler} />
                    {
                        showEmojis && <EmojiPicker onEmojiClick={emojiClickHandler} height={400} width={300} theme='dark' lazyLoadEmojis emojiStyle='google' />
                    }
                </div>
            </div>
            <form className='formInputContainer' onSubmit={e => sendChat(e)}>
                <input type='text' placeholder='Write any message here' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type='submit'><BiSolidSend /> </button>
            </form>
        </div>
    )
}

export default ChatInput