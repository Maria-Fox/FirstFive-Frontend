import React, { useEffect, useContext, useState } from "react";
import API from "../API";
import UserContext from "../UserComponents/UserContext";
import MatchedProj from "./MatchedProj"

const MatchList = () => {

  // ***************************************************************
  const { authUser } = useContext(UserContext);
  const [matchData, setMatchData] = useState(null)

  useEffect(() => {
    async function getMatchData() {
      try {
        let response = await API.viewUsernameMatches(authUser);
        console.log("Match res", response)
        setMatchData(response);
        console.log(matchData);
      } catch (e) {
        console.log(e);
      };
    };

    getMatchData();
  }, [setMatchData, authUser]);

  // ***************************************************************

  return (

    <div>
      <h1>Matches</h1>
      {matchData ? matchData.map(({ project_id, project_desc, name, owner_username, timeframe, github_repo }) =>
        <MatchedProj
          key={project_id}
          project_id={project_id}
          project_desc={project_desc}
          name={name}
          owner_username={owner_username}
          timeframe={timeframe}
          github_repo={github_repo}
        />
      )
        :
        <p>Loading...</p>}

    </div>
  );
};

export default MatchList;