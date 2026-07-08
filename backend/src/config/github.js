const axios = require("axios");

const headers = {
    Accept: "application/vnd.github+json",
};

if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN.trim()) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN.trim()}`;
}

const githubApi = axios.create({
    baseURL: "https://api.github.com",
    headers,
});

module.exports = githubApi;