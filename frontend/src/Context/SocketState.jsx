import React, { useContext, useEffect, useState } from 'react';
import SocketContext from './SocketContext';
import { io } from 'socket.io-client';
import Context from '../Context/ContextApi';

const SocketState = (props) => {
    const [Socket, setSocket] = useState(null);
    const [Online, setOnline] = useState([]);
    const { AuthToken, userInfo, loading } = useContext(Context);
    let userId;
    if (!loading && userInfo !== '') {
        userId = userInfo.user._id;
    }
    useEffect(() => {
        if (AuthToken && !loading && userInfo !== '') {
            const socket = io('https://real-time-chat-application-mern-stack.onrender.com', {
                query: {
                    userId: userId,
                }
            });
            setSocket(socket);
            socket.on('getOnlineUser', (user) => {
                setOnline([...user]);
            });


            return () => socket.close();
        } else if (Socket) {
            Socket.close();
            setSocket(null);
        }
    }, [userInfo,AuthToken]);

    return (
        <SocketContext.Provider value={{ Socket, Online }}>
            {props.children}
        </SocketContext.Provider>
    );
}

export default SocketState;
