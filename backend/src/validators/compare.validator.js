const { validateUsername } = require("./profile.validator");

const validateCompareInput = (developerA, developerB) => {
  if (!developerA || !developerB) {
    return { valid: false, error: "Both developerA and developerB usernames are required" };
  }
  const valA = validateUsername(developerA);
  const valB = validateUsername(developerB);
  if (!valA.valid) return { valid: false, error: `Developer A: ${valA.error}` };
  if (!valB.valid) return { valid: false, error: `Developer B: ${valB.error}` };
  
  if (valA.username.toLowerCase() === valB.username.toLowerCase()) {
    return { valid: false, error: "Cannot compare a developer with themselves" };
  }
  
  return {
    valid: true,
    developerA: valA.username,
    developerB: valB.username
  };
};

module.exports = {
  validateCompareInput
};