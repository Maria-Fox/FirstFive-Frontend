import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import AlertNotification from "../Common/AlertNotifications";
import UserContext from "../UserComponents/UserContext";
import MatchedProj from "./MatchedProject"


const MatchedProjectList = () => {

  // ***************************************************************
  const { authUser, matchedProjectIds, setMatchedProjectIds } = useContext(UserContext);
  const [matchData, setMatchData] = useState(null);
  const [errors, setErrors] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    async function getMatchData() {
      try {
        console.log(matchedProjectIds)
        let response = await API.viewUsernameMatches(authUser || username);
        setMatchData(response);

        // Update user matches state/ array.
        let matchingIDS = response.map(proj => proj.project_id);
        // Update based on matching projects at refresh.
        setMatchedProjectIds([...matchingIDS]);
      } catch (e) {
        setErrors(e);
        return;
      };
    };

    getMatchData();
  }, [setMatchData, authUser, setMatchedProjectIds, username]);

  // ***************************************************************

  let handleUnmatch = async (username, project_id) => {
    try {
      let unmatchRes = await API.removeUserMatch(username, project_id);

      console.log(unmatchRes, "UNMATCH RES****");
      if (unmatchRes.Removed) {
        // reset the projects displayed to all except the deleted project.
        setMatchData(matchData.filter(ids => ids.project_id !== project_id));

        // Update the matchedIds in state for project rendering.
        let newIds = matchedProjectIds.filter(id => id !== project_id);
        setMatchedProjectIds(newIds);
      };
    } catch (e) {
      console.log(e);
    }
  };

  // ***************************************************************


  return (

    <div>
      <h1>Matches</h1>

      {errors ? <AlertNotification messages={errors} /> : null}

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
        />
      )
        :
        <p>No matches, yet!</p>}

    </div>
  );
};

export default MatchedProjectList;