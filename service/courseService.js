const { Op } = require('sequelize');
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

//met à jour un cours existant (mise à jour partielle)
const updateCourse = async (id, data) => {
  try {
    const course = await Course.findOne({
      where: { id, published: true },
      include: {
        model: Category,
        as: 'category',
      },
    });
    if (!course) {
      throw new Error(`Course with id ${id} not found`);
    }

    // Vérifier que la catégorie existe si categoryId est fourni
    if (data.categoryId !== undefined) {
      const category = await Category.findByPk(data.categoryId);
      if (!category) {
        throw new Error('Category not found');
      }
    }

    // Mise à jour partielle - seuls les champs fournis sont modifiés
    await course.update(data);

    // Recharger le cours avec les associations pour retourner les données complètes
    const updatedCourse = await Course.findByPk(id, {
      include: {
        model: Category,
        as: 'category',
      },
    });

    return updatedCourse;
  } catch (error) {
    throw new Error(`Failed to update course: ${error.message}`);
  }
};

//recherche des cours par mot-clé dans titre ou description
const searchCourses = async (keyword) => {
  return await Course.findAll({
    where: {
      published: true,
      [Op.or]: [
        { title: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } },
      ],
    },
    include: {
      model: Category,
      as: 'category',
    },
  });
};

//filtre les cours par prix
const filterCoursesByPrice = async (minPrice, maxPrice) => {
  const whereClause = { published: true };
  if (minPrice !== undefined && minPrice !== '') {
    whereClause.price = {
      ...whereClause.price,
      [Op.gte]: parseFloat(minPrice),
    };
  }
  if (maxPrice !== undefined && maxPrice !== '') {
    whereClause.price = {
      ...whereClause.price,
      [Op.lte]: parseFloat(maxPrice),
    };
  }
  return await Course.findAll({
    where: whereClause,
    include: {
      model: Category,
      as: 'category',
    },
  });
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
  searchCourses,
  filterCoursesByPrice,
  createCourse,
  updateCourse,
  deleteCourse,
};
