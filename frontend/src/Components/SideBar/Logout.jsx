import React from 'react';
import { TbLogout2 } from "react-icons/tb";
import useLogout from '../../Hooks/useLogout';


const Logout = () => {
    const {logout} = useLogout();

    return (
        <>
            <div className="divider"></div>
            <div className="flex flex-row items-center justify-start mx-3 cursor-pointer">
                <TbLogout2 onClick={logout}/>
            </div>
        </>
    )
}

export default Logout
