const express = require("express");
const router = express.Router();
//using fs module to read and write data to a file
// const fs = require('fs');

// try {
//     const data = fs.readFileSync('task.json'); // Adjust the path if needed
//     tasks = JSON.parse(data);
// } catch (error) {
//     console.error('Error loading tasks.json:', error);
//     tasks = []; // Initialize as an empty array if there's an error
// }

tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
  },
  {
    id: 2,
    title: "Create a new project",
    description: "Create a new project using the Express application generator",
    completed: true,
  },
  {
    id: 3,
    title: "Install nodemon",
    description: "Install nodemon as a development dependency",
    completed: true,
  },
  {
    id: 4,
    title: "Install Express",
    description: "Install Express",
    completed: false,
  },
  {
    id: 5,
    title: "Install Mongoose",
    description: "Install Mongoose",
    completed: false,
  },
  {
    id: 6,
    title: "Install Morgan",
    description: "Install Morgan",
    completed: false,
  },
  {
    id: 7,
    title: "Install body-parser",
    description: "Install body-parser",
    completed: false,
  },
  {
    id: 8,
    title: "Install cors",
    description: "Install cors",
    completed: false,
  },
  {
    id: 9,
    title: "Install passport",
    description: "Install passport",
    completed: false,
  },
  {
    id: 10,
    title: "Install passport-local",
    description: "Install passport-local",
    completed: false,
  },
  {
    id: 11,
    title: "Install passport-local-mongoose",
    description: "Install passport-local-mongoose",
    completed: false,
  },
  {
    id: 12,
    title: "Install express-session",
    description: "Install express-session",
    completed: false,
  },
  {
    id: 13,
    title: "Install connect-mongo",
    description: "Install connect-mongo",
    completed: false,
  },
  {
    id: 14,
    title: "Install dotenv",
    description: "Install dotenv",
    completed: false,
  },
  {
    id: 15,
    title: "Install jsonwebtoken",
    description: "Install jsonwebtoken",
    completed: false,
  },
];

//type and priority validation middleware
const validateTask = (req, res, next) => {
  const { title, description, completed } = req.body;
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof completed !== "boolean"
  ) {
    return res
      .status(400)
      .json({
        error:
          "Title , Description must be strings and Completed must be boolean.",
      });
  }
  next();
};

//get all tasks
router.get("/", (req, res) => {
  // if (!tasks) {
  //     res.status(404).send("Tasks not found");
  // }
  // res.send(tasks);
  let filteredTasks = tasks;
  //fitlering all completed tasks 
  if (req.params.completed) {
    const completed = req.query.completed === 'true';
    filteredTasks = tasks.filter(
      (task) => task.completed == completed
    );
  }
  //sorting tasks by date
  filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  res.send(filteredTasks);
});

//get specific task by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id == parseInt(id));
  if (!task) {
    res.status(404).send("Task not found");
  }
  res.send(task);
});

//create a new task
router.post("/", validateTask, (req, res) => {
  const task = req.body;
  if (task) {
    task.id = tasks.length + 1;
    task.level = req.body.level;
    //adding date
    task.createdAt = new Date().toISOString();
    tasks.push(task);
  }
  // res.send(task)
  res.status(201).send({ message: "Task created successfully!" });
});

//update a specific task by ID
router.put("/:id", validateTask, (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id == parseInt(id));
  if (!task) {
    res.status(404).send("Task not found");
  }
  task.title = req.body.title;
  task.description = req.body.description;
  task.completed = req.body.completed;
  task.level = req.body.level;
  // res.send(task)
  res.status(200).json({ message: "Task updated successfully" });
});

//delete a specific task by ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id == parseInt(id));
  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
  res.status(200).json({ message: "Task deleted successfully" });
});

// Get tasks by priority level
router.get("/priority/:level", (req, res) => {
    const level = req.params.level;
    if (!['low', 'medium', 'high'].includes(level)) {
      return res.status(400).json({ error: 'Invalid priority level' });
    }
  
    const filteredTasks = tasks.find((task) => task.level == level);
    res.send(filteredTasks);
});

module.exports = router;
