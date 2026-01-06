function validateRegister(req, res, next) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ 
      error: "email is required" 
    });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ 
      error: "password must be at least 8 chars" 
    });
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ 
      error: "email is required" 
    });
  }

  if (!password) {
    return res.status(400).json({ 
      error: "password is required" 
    });
  }

  next();
}

module.exports = {
  validateRegister,
  validateLogin,
}