// const { getAllCourses, getCourseById, createCourse } = require('../service/courseService');
// const Course = require('../model/Course');
// const Category = require('../model/Category');

// // Mock the models
// jest.mock('../model/Course');
// jest.mock('../model/Category');

// describe('Course Service', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('getAllCourses', () => {
//     it('should return all published courses with categories', async () => {
//       const mockCourses = [
//         { id: 1, title: 'Course 1', published: true },
//         { id: 2, title: 'Course 2', published: true },
//       ];
//       Course.findAll.mockResolvedValue(mockCourses);

//       const result = await getAllCourses();

//       expect(Course.findAll).toHaveBeenCalledWith({
//         where: { published: true },
//         include: {
//           model: Category,
//           as: 'category',
//         },
//       });
//       expect(result).toEqual(mockCourses);
//     });
//   });

//   describe('getCourseById', () => {
//     it('should return course by id', async () => {
//       const mockCourse = { id: 1, title: 'Course 1' };
//       Course.findByPk.mockResolvedValue(mockCourse);

//       const result = await getCourseById(1);

//       expect(Course.findByPk).toHaveBeenCalledWith(1, {
//         include: {
//           model: Category,
//           as: 'category',
//         },
//       });
//       expect(result).toEqual(mockCourse);
//     });

//     it('should throw error if course not found', async () => {
//       Course.findByPk.mockResolvedValue(null);

//       await expect(getCourseById(1)).rejects.toThrow('Course with id 1 not found');
//     });
//   });

//   describe('createCourse', () => {
//     it('should create a new course', async () => {
//       const courseData = {
//         title: 'New Course',
//         description: 'Description',
//         duration: 60,
//         level: 'débutant',
//         price: 100,
//         instructor: 'Instructor',
//         categoryId: 1,
//       };
//       const mockCategory = { id: 1, name: 'Category 1' };
//       const mockCreatedCourse = { id: 1, ...courseData };

//       Category.findByPk.mockResolvedValue(mockCategory);
//       Course.create.mockResolvedValue(mockCreatedCourse);

//       const result = await createCourse(courseData);

//       expect(Category.findByPk).toHaveBeenCalledWith(1);
//       expect(Course.create).toHaveBeenCalledWith(courseData);
//       expect(result).toEqual(mockCreatedCourse);
//     });

//     it('should throw error if category not found', async () => {
//       const courseData = { ... };
//       Category.findByPk.mockResolvedValue(null);

//       await expect(createCourse(courseData)).rejects.toThrow('Category not found');
//     });
//   });
// });
