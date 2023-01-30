import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import UserContext from "./UserContext";

const UserProfile = () => {
  let {username} = useParams();
  console.log("username is: ", username);

  let [userData, setUserData] = useState(null);
  let {authUser} = useContext(UserContext);
  console.log("IN USER PROFILE USER IS:", authUser);

  useEffect(function userProfile(){
    async function viewUserProfile() {
      try{
        console.log("HERE")
        let user = await API.viewUser(username);
        console.log(user)
        setUserData(user)
      }catch(e){
        console.log(e, "***");
      };
    };

    viewUserProfile();
  },[]);

  let userDataDisplay = 
      <div>        
        <p>Data exists</p>
        {/* <h2>{userData.username}</h2>
        <p>{userData.bio}</p> */}

        {/* Add message option here. */}
      </div>

  return(
    <div>
        <h1>Profile</h1>

        {userData  ? userDataDisplay : "Loading..."}

    </div>
  );
};

export default UserProfile;