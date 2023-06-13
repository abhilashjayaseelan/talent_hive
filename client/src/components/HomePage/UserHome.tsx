import React from 'react'
import { useEffect } from 'react';
import { userData } from '../../features/axios/api/userDetails';


function UserHome() {
  useEffect(()=> {
    async function userInfo () {
      const data = await userData()
      console.log(data)
    }
    userInfo();
  },[]);

  return (
    <div>
      <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">user homePage</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
    </div>
  )
}

export default UserHome;
