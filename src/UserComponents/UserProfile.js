import React, {useEffect, useState, useContext} from "react";
import { Link, useParams } from "react-router-dom";
import API from "../API";
import UserContext from "./UserContext";

const UserProfile = () => {
  let {username} = useParams();

  let [userData, setUserData] = useState(null);
  let {authUser} = useContext(UserContext);

  useEffect(function userProfile(){
    async function viewUserProfile() {
      try{
        let user = await API.viewUser(username);
        console.log(user)
        setUserData(user)
        console.log("Data is:", userData)
      }catch(e){
        console.log(e, "***");
      };
    };

    viewUserProfile();
  },[username]);

  let userDataDisplay = (
    <div>
      <p>Data exists</p>
    </div>
  );

  if(!userData) return <p>Loading...</p>


  return(
    <div>
        <h1>Profile</h1>

        <h2>{userData.username}</h2>
        <p>{userData.bio}</p>
        

    </div>
  );
};

export default UserProfile;