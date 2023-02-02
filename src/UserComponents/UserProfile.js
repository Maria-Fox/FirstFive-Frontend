import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "./UserContext";

const UserProfile = () => {
  let { username } = useParams();
  let [userData, setUserData] = useState(null);
  let { authUser } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(function userProfile() {
    async function viewUserProfile() {
      try {
        let user = await API.viewUser(username);
        console.log(user)
        setUserData(user);
        // console.log("Data is:", userData)
      } catch (e) {
        console.log(e, "***")
      };
    };

    viewUserProfile();
  }, [username]);

  let userDataDisplay = (
    <div>
      <p>Data exists</p>
    </div>
  );

  // Need guidance on how I can update an owner - component wise.
  let handleUpdate = () => {
    console.log("update ran")
    return (
      <form>
        <h1>Update</h1>
      </form>
    );
  };

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
      <button onClick={handleUpdate}>Update Profile Details</button>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );

  let msgUserOption = (
    <button>
      <Link to={`/messages/${authUser}/create`}>Message {userData.username}</Link>
    </button>
  )


  return (
    <div>
      <h1>Profile</h1>

      <h2>{userData.username}</h2>
      <p>{userData.bio}</p>

      {authUser == userData.username ? updateForm : msgUserOption}


    </div>
  );
};

export default UserProfile;