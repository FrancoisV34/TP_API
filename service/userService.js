import User, { USER_ROLES } from "../model/User.js";

export async function listUsers() {
  return User.findAll({ attributes: ["id", "email", "role", "createdAt"] });
}

export async function setUserRole(userId, role) {
  const allowed = new Set(Object.values(USER_ROLES));
  if (!allowed.has(role)) {
    const err = new Error("Invalid role");
    err.status = 400;
    throw err;
  }

  const user = await User.findByPk(userId);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  user.role = role;
  await user.save();

  return { id: user.id, email: user.email, role: user.role };
}
