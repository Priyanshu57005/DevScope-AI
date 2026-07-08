const githubApi = require("../config/github");

const getUserProfile = async (username) =>{
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
};
const getUserRepositories = async (username) => {
    const response = await githubApi.get(`/users/${username}/repos`);

    return response.data;
};

const getUserEvents = async (username) => {
    const response = await githubApi.get(`/users/${username}/events/public`);

    return response.data;
};

module.exports = {
    getUserProfile,
    getUserRepositories,
    getUserEvents,
};