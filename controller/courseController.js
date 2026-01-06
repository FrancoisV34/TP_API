const {
  getAllCourses,
  getCourseById,
  getCoursesByLevel,
  searchCourses,
  filterCoursesByPrice,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../service/courseService');
const { validationResult } = require('express-validator');

const getCourses = async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const course = await getCourseById(req.params.id);
    res.json(course);
  } catch (error) {
    if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getCoursesByLevelHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const courses = await getCoursesByLevel(req.params.level);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchCoursesHandler = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword parameter is required' });
    }
    const courses = await searchCourses(keyword);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filterCoursesByPriceHandler = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const courses = await filterCoursesByPrice(minPrice, maxPrice);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCourseHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const course = await createCourse(req.body);
    res.status(201).location(`/courses/${course.id}`).json(course);
  } catch (error) {
    if (error.message.includes('Category not found')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateCourseHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const course = await updateCourse(req.params.id, req.body);
    res.json(course);
  } catch (error) {
    if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteCourseHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await deleteCourse(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = {
  getCourses,
  getCourse,
  getCoursesByLevelHandler,
  searchCoursesHandler,
  filterCoursesByPriceHandler,
  createCourseHandler,
  updateCourseHandler,
  deleteCourseHandler,
};
