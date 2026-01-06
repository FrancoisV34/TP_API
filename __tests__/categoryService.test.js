// const { getAllCategories, getCategoryById, createCategory } = require('../service/categoryService');
// const Category = require('../model/Category');
// const sequelize = require('../config/database');

// // Mock the models
// jest.mock('../model/Category');

// beforeAll(async () => {
//   await sequelize.authenticate();
// });

// afterAll(async () => {
//   await sequelize.close();
// });

// describe('Category Service', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('getAllCategories', () => {
//     it('should return all categories', async () => {
//       const mockCategories = [
//         { id: 1, name: 'Category 1' },
//         { id: 2, name: 'Category 2' },
//       ];
//       Category.findAll.mockResolvedValue(mockCategories);

//       const result = await getAllCategories();

//       expect(Category.findAll).toHaveBeenCalledTimes(1);
//       expect(result).toEqual(mockCategories);
//     });

//     it('should handle errors', async () => {
//       const error = new Error('Database error');
//       Category.findAll.mockRejectedValue(error);

//       await expect(getAllCategories()).rejects.toThrow('Database error');
//     });
//   });

//   describe('getCategoryById', () => {
//     it('should return category with courses', async () => {
//       const mockCategory = {
//         id: 1,
//         name: 'Category 1',
//         courses: [{ id: 1, title: 'Course 1' }],
//       };
//       Category.findByPk.mockResolvedValue(mockCategory);

//       const result = await getCategoryById(1);

//       expect(Category.findByPk).toHaveBeenCalledWith(1, {
//         include: {
//           model: require('../model/Course'),
//           as: 'courses',
//         },
//       });
//       expect(result).toEqual(mockCategory);
//     });

//     it('should throw error if category not found', async () => {
//       Category.findByPk.mockResolvedValue(null);

//       await expect(getCategoryById(1)).rejects.toThrow('Category with 1 not found');
//     });
//   });

//   describe('createCategory', () => {
//     it('should create a new category', async () => {
//       const categoryData = { name: 'New Category', description: 'Description' };
//       const mockCreatedCategory = { id: 1, ...categoryData };
//       Category.create.mockResolvedValue(mockCreatedCategory);

//       const result = await createCategory(categoryData);

//       expect(Category.create).toHaveBeenCalledWith(categoryData);
//       expect(result).toEqual(mockCreatedCategory);
//     });

//     it('should handle errors', async () => {
//       const error = new Error('Validation error');
//       Category.create.mockRejectedValue(error);

//       await expect(createCategory({})).rejects.toThrow('Failed to create category: Validation error');
//     });
//   });
// });
