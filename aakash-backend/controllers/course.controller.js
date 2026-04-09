const Course = require('../models/Course');

const courseController = {
  getAll: async (req, res) => {
    try {
      const { category, isFree, limit } = req.query;
      let query = { status: 'active' }; // Only show active courses publically
      
      if (category) query.category = category;
      if (isFree === 'true') query.isFree = true;
      
      const courses = await Course.find(query).limit(limit ? parseInt(limit) : 0);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOne: async (req, res) => {
     try {
       const course = await Course.findOne({ slug: req.params.slug });
       if (!course) return res.status(404).json({ message: 'Course not found' });
       res.json(course);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
  },

  // Admin: Create Course
  createCourse: async (req, res) => {
    try {
      const courseData = req.body;
      // auto generate slug
      courseData.slug = courseData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newCourse = new Course(courseData);
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Admin: Get all courses including draft/soon
  getAllAdmin: async (req, res) => {
    try {
      const courses = await Course.find({});
      res.json(courses);
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
  }
};

module.exports = courseController;