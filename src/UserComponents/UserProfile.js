import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "./UserContext";

const UserProfile = () => {
  let { username } = useParams();
  let [userData, setUserData] = useState(null);
  let { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  // ***************************************************************

  useEffect(function userProfile() {
    async function viewUserProfile() {
      try {
        let user = await API.viewAuthUserProfile(username);
        // console.log("Data is:", user)
        setUserData({
          username: user.username,
          bio: user.bio,
          email: user.email
        });
      } catch (e) {
        console.log(e, "***")
      };
    };

    viewUserProfile();
  }, [setUserData, username]);

  // ***************************************************************


  // Need guidance on how I can update an owner - component wise.
  let navigateToUpdate = () => {
    console.log("update ran")
    navigate(`/users/update/${authUser}`);
    console.log("nav ran")
  };

  // ***************************************************************


  let handleDelete = () => {
    console.log("delete ran")
    try {
      let res = API.deleteUser(authUser);
      navigate("/auth/register");
    } catch (e) {
      console.log(e);
    }
  };

  if (!userData) return <p>Loading...</p>

  // The routes are the same jus the type of route (get vs path is diff) how do I move around that?
  let updateForm = (
    <div>
      <button onClick={navigateToUpdate}>Update Profile Details</button>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );


  return (
    <div>
      <h1>Profile</h1>

      <h2>Username: {userData.username}</h2>
      <p>Bio: {userData.bio}</p>
      <p>Email: {userData.email}</p>

      {updateForm}

    </div>
  );
};

export default UserProfile;