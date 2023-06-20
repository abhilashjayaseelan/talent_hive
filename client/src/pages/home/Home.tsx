import React from 'react'
import HomePage from '../../components/HomePage/HomePage'
import CommonHeader from '../../components/Header/CommonHeader'
import UserSideFooter from '../../components/Footer/UserSideFooter'

function Home() {
  return (
    <div>
      <CommonHeader/>
      <HomePage/>
      <UserSideFooter/>
    </div>
  )
}

export default Home;
