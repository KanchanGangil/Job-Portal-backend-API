const express = require('express')
const UserController = require('../controllers/UserController')
const checkUserAuth = require('../middleware/auth')
const JobController = require('../controllers/JobController')
const ApplicationController = require('../controllers/ApplicationController')
const CategoryController = require('../controllers/CategoryController')

const router = express.Router()


//UserController
router.get('/getuser', checkUserAuth, UserController.getUser)
router.post('/registeruser', UserController.registerUser)
router.post('/login', UserController.login)
router.get('/logout', UserController.logout)

//JobController
router.post('/postjob', checkUserAuth, JobController.postJob)
router.get('/getalljob', JobController.getAllJob)
router.get('/getmyjobs', checkUserAuth, JobController.getMyJobs)
router.post('/updatejob/:id', checkUserAuth, JobController.updateJob)
router.get('/deletejob/:id', checkUserAuth, JobController.deleteJob)
router.get('/getsinglejob/:id', JobController.getSingleJob)

//ApplicationController
router.post('/post', checkUserAuth, ApplicationController.postApplication)
router.get('/employer/getall', checkUserAuth, ApplicationController.employerGetAllApplications)
router.get("/jobseeker/getall", checkUserAuth, ApplicationController.jobseekerGetAllApplications);
router.delete("/delete/:id", checkUserAuth, ApplicationController.jobseekerDeleteApplication);

//CategoryController
router.get('/viewallcategory', CategoryController.getallcategory)
router.post('/postcategory', checkUserAuth, CategoryController.categoryinsert)
router.post('/updatecategory/:id', checkUserAuth, CategoryController.categoryupdate)
router.get('/deletecategory/:id', checkUserAuth, CategoryController.categorydelete)
router.get("/categorylist/:cname", checkUserAuth, CategoryController.Categorylist)





module.exports = router