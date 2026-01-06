const userService =  require('../service/userService');

async function list(req, res, next) {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (e) {
    next(e);
  }
}

async function updateRole(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { role } = req.body;
    const updated = await userService.setUserRole(id, role);
    res.json(updated);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  list,
  updateRole,
}