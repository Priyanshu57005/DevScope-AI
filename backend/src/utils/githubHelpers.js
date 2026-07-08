const formatProfile = (profile) => {
    return {
        id: profile.id,
        name: profile.name,
        username: profile.login,
        avatar: profile.avatar_url,
        bio: profile.bio,
        location: profile.location,
        company: profile.company,
        blog: profile.blog,
        githubUrl: profile.html_url,

        followers: profile.followers,
        following: profile.following,

        publicRepos: profile.public_repos,
        publicGists: profile.public_gists,

        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
    };
};

const formatRepositories = (repositories) => {

    return repositories.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language,

        stars: repo.stargazers_count,
        forks: repo.forks_count,

        watchers: repo.watchers_count,

        size: repo.size,

        defaultBranch: repo.default_branch,

        isPrivate: repo.private,

        repoUrl: repo.html_url,

        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
    }));

};

module.exports = {
    formatProfile,
    formatRepositories,
};