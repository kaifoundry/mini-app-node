const { createApplication, getAllApplications } = require("../controllers/applicationController");
const { createLink, getLink } = require("../controllers/linkController");
const { createUser, getUser } = require("../controllers/userController");

const route = require("express").Router();

// userRoutes
route.post('/createUser',createUser)
route.get('/getUser',getUser)

//linkRoutes
route.post('/createLink',createLink)
route.get('/getLink',getLink)

//applicationRoutes
route.post('/createApplication',createApplication)
route.get('/getApplications',getAllApplications)

module.exports = route;
