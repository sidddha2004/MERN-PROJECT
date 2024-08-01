import express from 'express';
import Project from './models/Project.js';
import { authMiddleware } from './middleware/auth.js';

const router = express.Router();

// Route to create a new project
router.post('/projects', authMiddleware, async (req, res) => {
  const { projectName, githubLink, thumbnail } = req.body;
  const userId = req.user.id;

  try {
    const newProject = new Project({
      user: userId,
      projectName,
      githubLink,
      thumbnail,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

// Route to get projects of the logged-in user
router.get('/projects', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const projects = await Project.find({ user: userId });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

// Route to update a project
router.put('/projects/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { projectName, githubLink, thumbnail } = req.body;
  const userId = req.user.id;

  try {
    const project = await Project.findOneAndUpdate(
      { _id: id, user: userId },
      { projectName, githubLink, thumbnail },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

//  This route is used to delete a project
router.delete('/projects/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const project = await Project.findOneAndDelete({ _id: id, user: userId });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

export default router;
