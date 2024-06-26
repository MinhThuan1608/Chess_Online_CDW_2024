import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

const ChatSide = (props) => {
    const [messageValue, setMessageValue] = useState('')

    const messRef = useRef()
    const ownerRoom = JSON.parse(sessionStorage.getItem('user'))

    const handleSendMessage = () => {
        if (messageValue.trim() !== '')
            props.socket.publish({
                destination: '/app/game/room/' + props.roomId,
                body: JSON.stringify({
                    messageType: 'MESSAGE',
                    content: messageValue
                })
            });
        else toast.warn('Tin nhắn cần có nội dung!')
        setMessageValue('')
        messRef.current.focus()
    }

    const handleSendMessageEnter = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }



    return (
        <div className="chat-room-part">
            <p className="title-chat">chat</p>
            <div className="messageList force-overflow scrollbar"   >
                {props.listMessage.map((message, index) => (
                    <div className={`message ${message.sender.id === ownerRoom.id ? 'messageOwner' : ''}`} key={index}>
                        <div className={`messageBlock ${message.sender.id === ownerRoom.id ? 'messageBlockOwner' : ''}`}>
                            <span className="sendTime">{message.createAt}</span>
                            <span className={`sendName ${message.sender.id === ownerRoom.id ? 'player-br-forth' : 'player-br-thr'}`}>
                                {message.sender.username}
                            </span>
                        </div>
                        <div>
                            <span className={`messageContent ${message.sender.id === ownerRoom.id ? 'player-br-forth' : 'player-br-thr'}`}>{message.content}</span>
                        </div>
                    </div>
                ))}

            </div>
            <div className="sendMessDiv">
                <input type="text" className='inputMess'
                    value={messageValue}
                    onChange={e => setMessageValue(e.target.value)}
                    ref={messRef}
                    onKeyUp={e => handleSendMessageEnter(e)} />

                <button className='sendBtn' onClick={handleSendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} className="icon-send-mess" />
                </button>
            </div>

        </div>
    );
}
export default ChatSide;