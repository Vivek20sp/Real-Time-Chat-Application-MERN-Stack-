import React, { useEffect, useContext, useRef } from "react";
import Chats from "./Chats";
import getMessages from "../../Hooks/getMessages";
import LoadingSkeleton from "../Loading Skeleton/LoadingSkeleton";
import useSocket from "../../Hooks/useSocket.js";

const ChatBox = () => {
    const { loading, messages } = getMessages();
    const lastMessageScroll = useRef(null);
    // Scroll to the bottom of chat box when new message is added.
    useSocket();
    useEffect(() => {
        setTimeout(() => {
            lastMessageScroll.current?.scrollIntoView({behavior: "smooth"});
        }, 100);
    },[messages]);
    
    // Check if messages is defined and is an array before flattening
    const flattenedMessages = Array.isArray(messages) ? messages.flat() : [];

    return (
        <div className="flex md:min-h-[400px] md:max-h-[400px] flex-col overflow-auto">
            {loading ? (
                <LoadingSkeleton />
            ) : flattenedMessages.length === 0 ? (
                <p>Send A Message To Start Communication</p>
            ) : (
                flattenedMessages.map((ele) => {
                    // Check if ele exists before accessing properties
                    if (ele) {
                        return (
                            <div ref={lastMessageScroll} style={{margin:'0px'}}>
                                <Chats key={ele._id} data={ele} id={ele.senderId} />
                            </div>
                        );
                    } else {
                        return null; // or handle the case where ele is null/undefined
                    }
                })
            )}
        </div>
    );
};
export default ChatBox;
