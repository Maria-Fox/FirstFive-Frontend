import axios from "axios";

const BASE_URL = process.env.REACT_URL || "http://localhost:3001";

class FirstFiveAPI {

  // Used to authenticate user
  static token;

  // ******************************************* AUTH/ LOGIN methods

  static async request(endpoint, data = {}, method = "get"){
    console.log("API Call:", endpoint, data, method);

    // hard coding in "blah" token
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsYWgiLCJpYXQiOjE2NzQ3NTM2Mzd9.-DdkmQK-7oq8fu15twA0FOysb6xhLdeqDK2WlBYxd2I";

    // MUST BE FirstFiveAPI.token once users can register/login.
    const url = `${BASE_URL}/${endpoint}`;
    console.log(`Url requested: ${url}`)
    const headers = { Authorization: `Bearer ${token}` };
    const params = (method === "get")
        ? data
        : {};

    // Try sending off request with data passed in
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      // let message = err.response.data.error.message;
      // throw Array.isArray(message) ? message : [message];
      console.log(`ERROR: ${err}`)
      throw Error(err)
    }
  };

  static async registerUser(userData) {
    try{
      console.log("register user method called")
      let newUser = await this.request("/auth/register", {...userData}, 'post');

      // assign valid JWT to local storage for global use
      localStorage.setItem('token', newUser.signedJWT);
      localStorage.setItem('username', userData.username);
      // assign token to static method. Return to front-end to use in further auth requests.
      this.token = newUser.signedJWT
      return newUser.signedJWT
    }catch(e){
      throw e;
    };
  };

  static async authenticateUser(userData){
    try{
      let authUser = await this.request(`/auth/login`, {...userData}, 'post');
      // assign valid JWT to local storage for global use
      localStorage.setItem('token', authUser.signedJWT);
      localStorage.setItem('username', userData.username);
      // assign token to static method. Return to front-end to use in further auth requests.
      this.token = authUser.signedJWT
      return authUser.signedJWT
    } catch(e){
      throw e;
    }
  }

    // ******************************************* PROJECT methods

  // Methods used in app to call API.
  static async getAllProjects(){
    let res = await this.request(`projects/all`);
    console.log("Res is", res)
    return res;
  };




  // class closing bracket don't delete.
}

export default FirstFiveAPI;