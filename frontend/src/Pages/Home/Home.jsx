import React from 'react'
import Sidebar from '../../Components/SideBar/Sidebar'
import MessageBox from '../../Components/Message Box/MessageBox'

const Home = () => {
  return (
    <>
      <div className="flex flex-row sm:h-[450px] md:h-[550px] rounded-lg shadow-md bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
        <Sidebar/>
        <MessageBox/>
      </div>
    </>
  )
}

export default Home
