import React, { useState } from 'react';
import { FiSend } from "react-icons/fi";
import useSendMessage from '../../Hooks/useSendMessage';

const SendMessageBox = () => {
    const [sendmessage, setsendmessage] = useState('');
    const { loading, sendMessage } = useSendMessage();

    const handleOnChange = (event) => {
        setsendmessage(event.target.value);
    }

    const OnSubmit = async (event) => {
        event.preventDefault();
        if (!sendmessage) {
            return;
        }
        await sendMessage(sendmessage);
        setsendmessage('');
    }


    return (
        <>
            <div className="px-4">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Enter the message" name='send' value={sendmessage} onChange={(e) => handleOnChange(e)} />
                    {
                        loading ?
                            <div className='loading loading-spinner'></div> :
                            <div className="cursor-pointer" onClick={OnSubmit}>
                                <FiSend />
                            </div>
                    }
                </label>
            </div>
        </>
    )
}

export default SendMessageBox
