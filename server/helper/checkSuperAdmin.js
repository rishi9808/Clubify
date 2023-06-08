const checkSuperAdmin = (req, res, next) => {
  if (req.user.superAdmin === true) {
    next();
  } else {
    res.status(400).send({ error: "You are not a super admin" });
  }
};

module.exports = checkSuperAdmin;
