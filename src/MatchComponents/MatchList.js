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
  }, [setMatchData]);


  return (

    <div>
      <h1>Matches</h1>
      {matchData ? matchData.map(({ project_id, project_desc, name, owner_username, timeframe }) =>
        <MatchedProj
          key={project_id}
          project_id={project_id}
          name={name}
          owner_username={owner_username}
          timeframe={timeframe}
        />
      )
        :
        <p>Loading...</p>}

    </div>
  );
};

export default MatchList;