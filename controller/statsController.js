const { getCoursesStats, getUsersStats } = require('../service/statsService');

const getCoursesStatsHandler = async (req, res) => {
  try {
    const stats = await getCoursesStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersStatsHandler = async (req, res) => {
  try {
    const stats = await getUsersStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCoursesStatsHandler,
  getUsersStatsHandler,
};
