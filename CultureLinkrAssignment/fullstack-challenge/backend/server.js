const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task'); 

const app = express();
const PORT = process.env.PORT || 5678;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const mongoURI = 'mongodb+srv://adithya:adithya@cluster0.63xghhc.mongodb.net/todo-test?retryWrites=true&w=majority'; // Replace with your URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes

// Create a new task
app.post('/tasks', async (req, res) => {
  const { name } = req.body; // Changed to 'name' as per your model

  const newTask = new Task({ name }); // Create a new Task instance
  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err });
  }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  const { name, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { name, completed }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
