import React from 'react';
import getConversations from '../../zustand/getConversations';

const TitleBar = () => {
    const { selectedConversation, setSelectedConversation } = getConversations();
    
    return (
        <>
            <div className="flex min-h-[50px] items-center rounded-tr-lg bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 mb-4">
                <h1 className='mx-5 font-[700] text-black'><span className='font-[500] text-gray-300'>To: &nbsp;</span>{selectedConversation.fullname}</h1>
            </div>
        </>
    )
}

export default TitleBar
