const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, USER_ROLES } = require('../model/User');
const { Op } = require('sequelize');

function signToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      // email: user.email, 
      username: user.username, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
}

async function register({ email, username, password, role }) {
  const exists = await User.findOne({ where: { 
    [Op.or]: [
      { email }, 
      { username } 
    ]
  } });

  if (exists) {
    const err = new Error("Email or Username already used");
    err.status = 409;
    throw err;
  }

  // IMPORTANT: en général, on n’autorise PAS le choix du role au register
  // (sinon quelqu’un se met admin). On ignore role ici volontairement.
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    passwordHash,
    role: role || USER_ROLES.USER,
  });

  return { 
    id: user.id, 
    email: user.email, 
    username: user.username, 
    role: user.role 
  };
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const err = new Error("Combinaison email et mot de passe invalide !");
    err.status = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const err = new Error("Combinaison email et mot de passe invalide !");
    err.status = 401;
    throw err;
  }

  const token = signToken(user);
  return { token };
}

module.exports = {
  signToken,
  register,
  login,
};