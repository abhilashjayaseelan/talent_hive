import React from 'react'
import UserHeader from '../../components/Header/UserHeader';
import EditUserProfile from '../../components/User/UserProfile/EditUserProfile';
import UserSideFooter from '../../components/Footer/UserSideFooter';

function EditUserProfilePage() {
  return (
    <div>
      <UserHeader/>
      <EditUserProfile/>
      <UserSideFooter/>
    </div>
  )
}

export default EditUserProfilePage;
