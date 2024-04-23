import React, { useContext } from 'react';
import { HiOutlineChatAlt2 } from "react-icons/hi";
import Context from '../../Context/ContextApi';

const NoChatSelected = () => {
    const context = useContext(Context);
    const { loading, userInfo } = context;

    return (
        <>
            <div className="flex flex-col items-center justify-center text-white md:min-w-[450px] rounded-r-lg shadow-md bg-clip-padding border-l border-gray-100">
                {
                    (loading && userInfo === '') ? <span className='loading loading-spinner'></span> : <div>
                        <h1>Welcome 👋 Vv ❄️ </h1>
                        <h3>Select  a chat to get started</h3>
                        <HiOutlineChatAlt2 className='text-3xl md:text-6xl text-center' />
                    </div>
                }
            </div>
        </>
    )
}

export default NoChatSelected;
