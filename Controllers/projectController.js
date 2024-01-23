const projects = require("../Models/projectSchema");

// add projects
exports.addProjects = async (req, res) => {
  console.log("inside add project function");
  const userId = req.payload;
  const { title, languages, overview, github, website } = req.body;
  // console.log(`${title},${languages},${overview},${github},${website}`);
  // console.log(userId);
  const projectImage = req.file.filename;
  // console.log(projectImage);
  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("Projects already exists upload another!!!");
    } else {
      const newProject = new projects({
        title,
        languages,
        overview,
        github,
        website,
        projectImage,
        userId,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (err) {
    res.status(401).json(`Request Failed , Error : ${err}`);
  }
};

// get userprojects
exports.allUserProjects = async (req, res) => {
  const userId = req.payload;
  try {
    const userprojects = await projects.find({ userId });
    res.status(200).json(userprojects);
  } catch (err) {
    res.status(401).json(err);
  }
};

// get all projects
exports.getAllProjects = async (req, res) => {
  const searchKey = req.query.search;
  const query = {
    languages: { $regex: searchKey, $options: "i" },
  };
  try {
    const projectDetails = await projects.find(query);
    res.status(200).json(projectDetails);
  } catch (err) {
    res.status(401).json(err);
  }
};

// home projects
exports.getHomeProjects = async (req, res) => {
  try {
    const homeProjects = await projects.find().limit(3);
    res.status(200).json(homeProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

// edit projects
exports.editProjectController = async (req, res) => {
  const { id } = req.params;
  const userId = req.payload;
  const { title, languages, overview, github, website, projectImage } =
    req.body;
  const uploadProjectImage = req.file ? req.file.filename : projectImage;
  try {
    const updateProject = await projects.findByIdAndUpdate(
      { _id: id },
      {
        title,
        languages,
        overview,
        github,
        website,
        projectImage: uploadProjectImage,
        userId,
      },
      { new: true }
    );
    await updateProject.save();
    res.status(200).json(updateProject);
  } catch (err) {
    res.status(401).json(`Request Failed , Error : ${err}`);
  }
};

// delete project
exports.deleteProjectController = async (req, res) => {
  const { id } = req.params;
  try {
    const removeProject = await projects.findByIdAndDelete({ _id: id });
    res.status(200).json(removeProject);
  } catch (err) {
    res.status(401).json(`Request Failed , Error : ${err}`);
  }
};
