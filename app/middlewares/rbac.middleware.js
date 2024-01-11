const checkRole = (allowedRoles) => (req, res, next) => {
  const user = req;
  if (!user || !allowedRoles.includes(user.roles)) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};

module.exports = {
  checkRole,
};
