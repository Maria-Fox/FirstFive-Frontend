import React, {useEffect} from "react";
import FirstFiveAPI from "./API";

let res;

const Example = () => {

  useEffect(function requestAllProjexts() {
    console.log("mounted");
  
    async function getAllProjects(){
      try{
        let res = await FirstFiveAPI.getAllProjects();
        console.log(res.status);
      } catch(e){
        return e;
      }

    };
  
    getAllProjects();
  
  });

  const handleChange = async (e) => {
    try{
      let res = await FirstFiveAPI.getAllProjects();
      console.log(res);
    } catch (e){
      console.log(e);
    }
  };


  return(
    <div>
      <p onClick={handleChange}>From Example component</p>
      <p> {res ? res: "undefined"}</p>
    </div>
  )
};

export default Example;