import React, { useEffect, useContext, useState } from "react";
import API from "../API";
import UserContext from "../UserComponents/UserContext";
import MatchedProj from "./MatchedProj"

const MatchList = () => {

  // ***************************************************************
  const { authUser } = useContext(UserContext);
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    async function getMatchData() {
      try {
        let response = await API.viewUsernameMatches(authUser);
        console.log("Match res", response)
        setMatchData(response);
        console.log("data looks like this !!!", matchData)
      } catch (e) {
        console.log(e);
      };
    };

    getMatchData();
  }, [setMatchData, authUser]);

  // ***************************************************************

  let handleUnmatch = async (username, project_id) => {
    try {
      let unmatchRes = await API.removeUserMatch(username, project_id);

      console.log(unmatchRes, "UNMATCH RES****");
      if (unmatchRes.Removed) {
        // reset the projects displayed to all except the deleted project.
        setMatchData(matchData.filter(ids => ids.project_id != project_id));
        console.log("new matched data:", matchData)
      };
    } catch (e) {
      console.log(e);
    }
  }
  // ***************************************************************

  let handleDeleteProj = async (project_id) => {
    try {
      let response = API.deleteProject(project_id);
      setMatchData(matchData.filter(ids => ids.project_id != project_id));
      alert("Deleted project!");
    } catch (e) {
      console.log(e);
    };
  };


  // ***************************************************************


  return (

    <div>
      <h1>Matches</h1>
      {matchData && matchData.length > 0 ? matchData.map(({ project_id, project_desc, name, owner_username, timeframe, github_repo }) =>
        <MatchedProj
          key={project_id}
          project_id={project_id}
          project_desc={project_desc}
          name={name}
          owner_username={owner_username}
          timeframe={timeframe}
          github_repo={github_repo}
          handleUnmatch={handleUnmatch}
          handleDeleteProj={handleDeleteProj}
        />
      )
        :
        <p>No matches, yet!</p>}

    </div>
  );
};

export default MatchList;