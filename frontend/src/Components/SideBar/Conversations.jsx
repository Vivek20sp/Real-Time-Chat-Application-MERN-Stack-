import React from 'react'
import Conversation from './Conversation'
import useGetUsers from '../../Hooks/useGetUsers';
import useEmoji from '../../Hooks/useEmoji';

const Conversations = () => {
    const {loading,Conversatation} = useGetUsers();
    return (
        <>
            <div className="md:min-h-[64%] md:max-h-[64.5%] flex flex-col overflow-auto">
                {
                    loading?<span className='loading loading-spinner'></span>:Conversatation.map((ele)=>{
                        return(
                            <Conversation key={ele._id} conversation={ele} name={ele.fullname} profilePic={ele.profilepic} emoji={useEmoji()}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Conversations
