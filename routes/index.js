const { createApplication, getAllApplications, getAllRefApplications, getRedeemableApplications, removeAllRedeemableApplications } = require("../controllers/applicationController");
const { createJob, getJobDetails, getAllJobs, deleteJob, getAllFeaturedJobs, getAllUnFeaturedJobs, changeFeatureStatus, updateJob } = require("../controllers/jobController");
const { createLink, getLink, getAllLinks, getAllActiveLinks } = require("../controllers/linkController");
const { createUser, getUser, updateUser, getTop10Users } = require("../controllers/userController");

const route = require("express").Router();

// userRoutes
route.post('/createUser',createUser)
route.get('/getUser',getUser)
route.put('/updateUser',updateUser)
route.get('/getLeaderboard',getTop10Users)

//linkRoutes
route.post('/createLink',createLink)
route.get('/getLink',getLink)
route.get('/getAllLinks',getAllLinks)
route.get('/getActiveLinks',getAllActiveLinks)

//applicationRoutes
route.post('/createApplication',createApplication)
route.get('/getApplications',getAllApplications)
route.get('/getRefApplications',getAllRefApplications)
route.get('/getBounties',getRedeemableApplications)
route.patch('/removeBounty',removeAllRedeemableApplications)

//jobRoutes
route.post('/createJobs',createJob)
route.get('/getJobDetails',getJobDetails)
route.get('/getAllJobs',getAllJobs)
route.get('/getFeatJobs',getAllFeaturedJobs)
route.get('/getUnfeatJobs',getAllUnFeaturedJobs)
route.delete('/deleteJob',deleteJob)
route.patch('/updateFStatus',changeFeatureStatus)
route.patch('/updateJob',updateJob)

module.exports = route;
