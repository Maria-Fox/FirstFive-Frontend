import axios from "axios";

const BASE_URL = process.env.REACT_URL || "http://localhost:3001";

class FirstFiveAPI {

  // Used to authenticate user
  static token;

  // ******************************************* AUTH/ LOGIN methods

  static async request(endpoint, data = {}, method = "get"){
    console.log("API Call:", endpoint, data, method);

    // hard coding in "blah" token
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsYWgiLCJpYXQiOjE2NzQ3NTM2Mzd9.-DdkmQK-7oq8fu15twA0FOysb6xhLdeqDK2WlBYxd2I";

    // CLI TOKEN
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZyb21DTEkiLCJpYXQiOjE2NzQwMDMwODN9.jBbzE30bK3WmLMVJLprLRerxzaF4YNkX7-5jyHE7Cck"

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
      let newUser = await this.request("auth/register", {...userData}, 'post');

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
      let authUser = await this.request(`auth/login`, {...userData}, 'post');
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


  // ******************************************* USER methods

  // Need to see about limmited views to only those who matched..


  static async viewUser(username){
    let res = await this.request(`users/${username}`); 
    console.log(res.userData);
    return res.userData;
  };

  static async editUser(username, updateData){
    let res = await this.request(`users/${username}`, {...updateData}, 'patch');
    return res.userData;
  };

  static async deleteUser(username){
    let res = await this.request(`users/${username}`, {}, 'delete');
    return res;
  };


  // ******************************************* PROJECT methods

  static async createProject(projectData){
    let res = await this.request(`projects/new`, {...projectData}, 'post');
    return res;
  };

  static async getAllProjects(){
    let res = await this.request(`projects/all`);
    console.log("Res is", res)
    return res;
  };

  static async viewProject(project_id){
    let res = await this.this(`projects/${project_id}`);
    return res;
  };

  static async editProject(project_id, updateData){
    let res= await this.request(`projects/${project_id}`, {...updateData}, 'patch');
    return res;
  };

  static async deleteProject(project_id){
    let res = await this.request(`delete/${project_id}`, {}, 'delete');
    return res;
  };

  // ******************************************* Match methods

  static async addMatch(username, project_id){
    let res = await this.request(`matches/add/${username}/${project_id}`, {}, 'post');
    return res;
  };

  static async viewUsernameMatches(username){
    let res = await this.request(`matches/view/${username}/all`);
    return res;
  };

  static async viewProjectUserMatches(project_id){
    let res = await this.request(`matches/${project_id}/users}`);
    return res;
  };

  static async removeUserMatch(username, project_id){
    let res = await this.request(`matches/${username}/${project_id}`, {}, 'post');
    return res;
  };
  

  // ******************************************* Project Member methods

  static async addProjectMember(project_id, userToAdd){
    let res = await this.request(`projects/add/${project_id}`, {...userToAdd}, 'post');
    return res;
  };

  static async viewAllProjMembers(project_id){
    let res= await this.request(`projectmembers/view/all${project_id}`);
    return res;
  };

  static async deleteProjectMember(project_id, userToDel){
    let res = await this.request(`projectmembers/delete/${project_id}`, {...userToDel}, 'delete');
    return res;
  };

  // ******************************************* Message methods

  static async createMessage(username, msgData){
    let res = await this.request(`messages/${username}/create`, {...msgData}, 'post');
    return res;
  };

  static async getAllUserMessages(username){
    let res = await this.request(`messages/${username}/all`);
    return res;
  };


  // class closing bracket don't delete.
}

export default FirstFiveAPI;