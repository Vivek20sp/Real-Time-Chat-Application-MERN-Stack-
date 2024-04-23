import React, { useContext } from 'react';
import Context from '../../Context/ContextApi';
import getConversations from '../../zustand/getConversations';


const Chats = (props) => {
    const context = useContext(Context);
    const { userInfo } = context;
    const { selectedConversation } = getConversations();
    const fromMe = props.id === userInfo.user._id;
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const bubbleBg = fromMe ? 'bg-blue-500' : '';
    const profilePic = fromMe ? userInfo.user.profilepic : selectedConversation?.profilepic;
    const shake = props.data.shouldVibrating ? 'vibrating' : '';
    const dateObj = new Date(props.data.createdAt);

    const normalDate = dateObj.toLocaleDateString();
    const normalTime = dateObj.toLocaleTimeString();

    return (
        <>
            <div className={`chat ${chatClassName} me-2`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src={profilePic} />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50 ms-1">{normalDate}</time>
                </div>
                <div className={`chat-bubble ${bubbleBg} ${shake}`}>{props.data.message}</div>
                <div className="chat-footer opacity-50">
                    Seen at {normalTime}
                </div>
            </div>
        </>
    )
}

export default Chats
