import React from 'react'
import SearchBar from './SearchBar'
import Conversations from './Conversations'
import Logout from './Logout'

const Sidebar = () => {
  return (
    <>
        <div className="flex flex-col">
            <SearchBar/>
            <div className="divider"></div> 
            <Conversations/>
            <Logout/>
        </div> 
    </>
  )
}

export default Sidebar
