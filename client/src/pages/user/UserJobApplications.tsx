import UserSideFooter from "../../components/Footer/UserSideFooter"
import UserHeader from "../../components/Header/UserHeader"
import DisplayApplications from "../../components/User/Applications/DisplayApplications"


function UserJobApplications() {
  return (
    <div>
      <UserHeader/>
      <DisplayApplications/>
      <UserSideFooter/>
    </div>
  )
}

export default UserJobApplications
