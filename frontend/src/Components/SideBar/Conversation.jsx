import React, { useContext } from 'react';
import getConversations from '../../zustand/getConversations';
import SocketContext from '../../Context/SocketContext';

const Conversation = ({ name, conversation, profilePic, emoji }) => {
    const context = useContext(SocketContext);
    const { Online } = context;
    const { selectedConversation, setSelectedConversation } = getConversations();
    const selectedChat = selectedConversation?._id === conversation._id;
    const isOnline = Online.includes(conversation._id);
    

    return (
        <>
            <div className={selectedChat ? "flex flex-row p-3 py-3 rounded-sm bg-sky-600 hover:bg-blue-400 gap-4 " : " flex flex-row p-3 py-3 rounded-sm hover:bg-blue-400 gap-4"} onClick={() => setSelectedConversation(conversation)}>
                <div className={`avatar ${isOnline?'online':''}`}>
                    <div className="w-10 rounded-full">
                        <img src={profilePic} />
                    </div>
                </div>
                <h2 className='text-white mt-2'>{name}</h2>
                <h2 className='mt-2' >{emoji}</h2>
            </div>
        </>
    )
}

export default Conversation
