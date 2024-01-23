const express = require("express");
const router = new express.Router();
const userController = require("../Controllers/userController");
const projectController = require("../Controllers/projectController");
const jwtMiddleware = require("../Middlewares/jwtMiddleware");
const multerConfig = require("../Middlewares/multerMiddleware");

// register
router.post("/user/register", userController.register);

// login
router.post("/user/login", userController.login);

// add project
router.post("/project/add",jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects);

// get user projects
router.get("/user/all-projects",jwtMiddleware,projectController.allUserProjects);

// get all projects
router.get("/projects/all",jwtMiddleware,projectController.getAllProjects);

// get home projects
router.get("/projects/home-projects",projectController.getHomeProjects);

// edit project
router.put("/project/edit/:id",jwtMiddleware,multerConfig.single('projectImage'),projectController.editProjectController);

// delete project
router.delete("/project/remove/:id",jwtMiddleware,projectController.deleteProjectController);

module.exports = router;
