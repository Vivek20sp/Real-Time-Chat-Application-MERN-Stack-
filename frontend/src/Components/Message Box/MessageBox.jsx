import React, { useEffect } from 'react'
import TitleBar from './TitleBar'
import ChatBox from './ChatBox'
import SendMessageBox from './SendMessageBox';
import NoChatSelected from './NoChatSelected';
import getConversations from '../../zustand/getConversations';

const MessageBox = () => {
    const { selectedConversation, setSelectedConversation } = getConversations();
    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [])

    return (
        <>
            {
                !selectedConversation ? <NoChatSelected /> : (
                    <div className="flex flex-col md:min-w-[450px] rounded-r-lg shadow-md bg-clip-padding border-l border-gray-100">
                        <TitleBar />
                        <ChatBox />
                        <SendMessageBox />
                    </div>
                )
            }

        </>
    )
}

export default MessageBox
