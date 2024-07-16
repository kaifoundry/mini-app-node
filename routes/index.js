const { createApplication, getAllApplications } = require("../controllers/applicationController");
const { createJob, getJobDetails, getAllJobs } = require("../controllers/jobController");
const { createLink, getLink, getAllLinks } = require("../controllers/linkController");
const { createUser, getUser } = require("../controllers/userController");

const route = require("express").Router();

// userRoutes
route.post('/createUser',createUser)
route.get('/getUser',getUser)

//linkRoutes
route.post('/createLink',createLink)
route.get('/getLink',getLink)
route.get('/getAllLinks',getAllLinks)

//applicationRoutes
route.post('/createApplication',createApplication)
route.get('/getApplications',getAllApplications)

//jobRoutes
route.post('/createJobs',createJob)
route.get('/getJobDetails',getJobDetails)
route.get('/getAllJobs',getAllJobs)

module.exports = route;
