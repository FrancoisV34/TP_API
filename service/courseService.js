const Course = require('../model/Course');
const Category = require('../model/Category');

//retrouve tous les cours publiés avec leur catégorie associée
const getAllCourses = async () => {
  return await Course.findAll({
    where: { published: true },
    include: {
      model: Category,
      as: 'category',
    },
  });
};

//retrouve un cours par son ID avec sa catégorie associée
const getCourseById = async (id) => {
  try {
    const course = await Course.findByPk(id, {
      include: {
        model: Category,
        as: 'category',
      },
    });
    if (!course) {
      throw new Error(`Course with id ${id} not found`);
    }
    return course;
  } catch (error) {
    throw new Error(`Error retrieving course: ${error.message}`);
  }
};

//retrouve tous les cours d'un certain niveau (débutant, intermédiaire, avancé) et publiés
const getCoursesByLevel = async (level) => {
  return await Course.findAll({
    where: { level, published: true },
    include: {
      model: Category,
      as: 'category',
    },
  });
};

//crée un nouveau cours
const createCourse = async (data) => {
  try {
    // Check if category exists
    const category = await Category.findByPk(data.categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    if (
      !data.title ||
      !data.description ||
      !data.duration ||
      !data.price ||
      !data.instructor
    ) {
      throw new Error(
        'Title , description, duration, price and instructor are required fields'
      );
    }
    return await Course.create(data);
  } catch (error) {
    throw new Error(`Failed to create course: ${error.message}`);
  }
};

//met à jour un cours existant
const updateCourse = async (id, data) => {
  try {
    const course = await Course.findOne({ where: { id, published: true } });
    if (!course) {
      throw new Error(`Course with id ${id} not found`);
    }
    await course.update(data);
    return course;
  } catch (error) {
    throw new Error(`Failed to update course: ${error.message}`);
  }
};

const deleteCourse = async (id) => {
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new Error(`Course with id ${id} not found`);
    }
    await course.destroy();
    return { message: 'Course deleted successfully' };
  } catch (error) {
    throw new Error(`Failed to delete course: ${error.message}`);
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  getCoursesByLevel,
  createCourse,
  updateCourse,
  deleteCourse,
};
