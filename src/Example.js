import React, {useEffect, useState} from "react";
import FirstFiveAPI from "./API";

let res;

const Example = () => {

  let [data, setData] = useState("");

  useEffect(function getAllProjects() {
    console.log("mounted");
  
    async function getAllProjects(){
      try{
        // let res = await FirstFiveAPI.getAllProjects();
        // console.log(res.status);

        let res = await FirstFiveAPI.viewUser(`fromCLI`);
        setData([...res]);
        console.log("State is now". data)

      } catch(e){
        return e;
      }

    };
  
    getAllProjects();
  
  },[data]);

  const handleChange = async (e) => {
    try{
      let res = await FirstFiveAPI.viewUser(`fromCLI`);
      console.log(res);
      setData([res.username]);
    } catch (e){
      console.log(e);
    }
  };

  console.log("Data is", data)

  return(
    <div>
      <p onClick={handleChange}>From Example component</p>
      <p> {data != null ? data : "Loading..."}</p>
    </div>
  )
};

export default Example;