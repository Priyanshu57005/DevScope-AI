const validateUsername = (username) => {
    if (!username || typeof username !== "string" || !username.trim()) {
        return { valid: false, error: "Username is required" };
    }
    const cleaned = username.trim();
    // GitHub rules: Alphanumeric and single hyphens. No starting/ending hyphen. Max 39 characters.
    const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    if (!githubUsernameRegex.test(cleaned)) {
        return { valid: false, error: "Invalid GitHub username format" };
    }
    return { valid: true, username: cleaned };
};

module.exports = {
    validateUsername,
};