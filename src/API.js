import axios from "axios";

const BASE_URL = process.env.REACT_URL || "http://localhost:3001";

class API {

  // Used to authenticate user
  static token;

  // ******************************************* AUTH/ LOGIN methods


  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method, this.token, "**********");

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${API.token}` };
    const params = (method === "get")
      ? data
      : {};

    if (!this.token) {
      console.log("There's no token")
      this.token = window.sessionStorage.getItem("token") || "";
    };

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.message);
      // let message = err.response.data.error.message;
      // throw Array.isArray(message) ? message : [message];

    };
  };

  static async registerUser(userData) {
    let newUser = await this.request("auth/register", { ...userData }, 'post');
    console.log("new user is", newUser)
    return newUser.signedJWT;
  };

  static async authenticateUser(userData) {
    let authUser = await this.request(`auth/login`, { ...userData }, 'post');
    return authUser.signedJWT;
  };


  // ******************************************* USER methods

  // Need to see about limmited views to only those who matched..


  static async viewUser(username) {
    let res = await this.request(`users/${username}`);
    console.log(res.userData);
    return res.userData;
  };

  static async editUser(username, updateData) {
    let res = await this.request(`users/${username}`, { ...updateData }, 'patch');
    return res.userData;
  };

  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, 'delete');
    return res;
  };


  // ******************************************* PROJECT methods

  static async createProject(projectData) {
    let res = await this.request(`projects/new`, { ...projectData }, 'post');
    return res;
  };

  static async getAllProjects() {
    let res = await this.request(`projects/all`);
    console.log("Res is", res)
    return res;
  };

  static async getNonMatchedProjects() {
    let res = await this.request(`projects/view`);
    console.log("Res is", res)
    return res;
  };

  static async viewProject(project_id) {
    let res = await this.request(`projects/${project_id}`);
    return res;
  };

  static async editProject(project_id, updateData) {
    let res = await this.request(`projects/${project_id}`, { ...updateData }, 'patch');
    return res;
  };

  static async deleteProject(project_id) {
    let res = await this.request(`delete/${project_id}`, {}, 'delete');
    return res;
  };

  // ******************************************* Match methods

  static async addMatch(username, project_id) {
    let res = await this.request(`matches/add/${username}/${project_id}`, {}, 'post');
    return res;
  };

  static async viewUsernameMatches(username) {
    let res = await this.request(`matches/view/${username}/all`);
    return res;
  };

  static async viewProjectUserMatches(project_id) {
    let res = await this.request(`matches/view/${project_id}/users`);
    return res;
  };

  static async removeUserMatch(username, project_id) {
    let res = await this.request(`matches/remove/${username}/${project_id}`, {}, 'post');
    return res;
  };


  // ******************************************* Project Member methods

  static async addProjectMember(project_id, userToAdd) {
    let res = await this.request(`projects/add/${project_id}`, { ...userToAdd }, 'post');
    return res;
  };

  static async viewAllProjMembers(project_id) {
    let res = await this.request(`projectmembers/view/all/${project_id}`);
    return res;
  };

  static async deleteProjectMember(project_id, username) {
    console.log(project_id, username, "API")
    let res = await this.request(`projectmembers/delete/${project_id}`, { username }, 'delete');
    return res;
  };

  // ******************************************* Message methods

  static async createMessage(username, msgData) {
    let res = await this.request(`messages/${username}/create`, { ...msgData }, 'post');
    return res;
  };

  static async getAllUserMessages(username) {
    let res = await this.request(`messages/${username}/all`);
    return res;
  };

  static async viewSingleMsgData(message_id, username) {
    let res = await this.request(`messages/${username}/read/${message_id}`);
    return res;
  };


  // class closing bracket don't delete.
}

export default API;