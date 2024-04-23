import React, { useState } from 'react';
import getConversations from '../../zustand/getConversations';
import toast from 'react-hot-toast';
import useGetUsers from '../../Hooks/useGetUsers';

const SearchBar = () => {
    const [SearchPersion, setSearchPersion] = useState('');
    const { setSelectedConversation } = getConversations();
    const { loading, Conversatation } = useGetUsers();
    const handleOnChange = (e) => {
        setSearchPersion(e.target.value);
    }
    const OnSearch = (event) => {
        event.preventDefault();
        console.log(SearchPersion);
        if (SearchPersion === '') {
            return toast.error('Please Enter Name');
        }
        if (SearchPersion.length < 5) {
            return toast.error('Enter The Name Greater Than 5')
        }
        const conversation = Conversatation.find((member) => member.fullname.toLowerCase().includes(SearchPersion.toLowerCase()));
        if (!conversation) {
            return toast.error('No Persion Found!')
        }
        else {
            setSelectedConversation(conversation);
            setSearchPersion('');
        }
    }
    return (
        <>
            <div className="flex flex-row items-center justify-center mt-5 mx-5">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" name='Search' value={SearchPersion} onChange={handleOnChange} />
                    {loading ? <span className='loading loading-spinner'></span> : <div onClick={OnSearch} style={{margin:'0px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 cursor-pointer"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </div>}
                </label>
            </div>
        </>
    )
}

export default SearchBar
