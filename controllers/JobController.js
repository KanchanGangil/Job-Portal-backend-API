const JobModel = require("../models/job");

class JobController {
    static getAllJob = async (req, res) => {
        try {
            const jobs = await JobModel.find({ expired: false })
            res.status(200).json({
                success: true,
                jobs,
            });
        } catch (error) {
            console.log(error);
        }
    }
    static postJob = async (req, res) => {
        try {
            const { role } = req.userdata
            if (role === "job seeker") {
                res.status(400).json({
                    status: "failed",
                    message: "Job seeker are not allowed to access this resource",
                });
            }
            const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body
            if (!title || !description || !category || !country || !city || !location) {
                res.status(400).json({
                    status: "failed",
                    message: "Please provider full job details",
                });
            }
            if ((!salaryFrom || !salaryTo) && !fixedSalary) {
                res.status(400).json({
                    status: "failed",
                    message: "Please either provide fixed salary or ranged salary",
                });
            }
            if (salaryFrom && salaryTo && fixedSalary) {
                res.status(400).json({
                    status: "failed",
                    message: "Cannot enter fixed and ranged salary together",
                });
            }
            const postedBy = req.userdata._id
            const job = await JobModel.create({
                title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo, postedBy
            })
            res.status(200).json({
                success: true,
                message: "Job posted successfully",
            });

        } catch (error) {
            console.log(error);
        }
    }
    static getMyJobs = async (req, res) => {
        try {
            const { role } = req.userdata
            if (role === "job seeker") {
                res.status(400).json({
                    status: "failed",
                    message: "Job seeker are not allowed to access this resource",
                });
            }
            const myJobs = await JobModel.find({ postedBy: req.userdata._id })
            res.status(200).json({
                success: true,
                myJobs,
            });
        } catch (error) {
            console.log(error);
        }
    }
    static updateJob = async (req, res) => {
        try {
            const { role } = req.userdata
            if (role === "job seeker") {
                res.status(400).json({
                    status: "failed",
                    message: "Job seeker are not allowed to access this resource",
                });
            }
            const { id } = req.params
            let job = await JobModel.findById(id)
            if (!job) {
                res.status(400).json({
                    status: "failed",
                    message: "OOPS! Job not found",
                });
            }
            job = await JobModel.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            res.status(200).json({
                success: true,
                message: "Job Updated!"
            });
        } catch (error) {
            console.log(error);
        }
    }
    static deleteJob = async (req, res) => {
        try {
            const { role } = req.userdata
            if (role === "job seeker") {
                res.status(400).json({
                    status: "failed",
                    message: "Job seeker are not allowed to access this resource",
                });
            }
            const { id } = req.params
            let job = await JobModel.findById(id)
            if (!job) {
                res.status(400).json({
                    status: "failed",
                    message: "OOPS! Job not found",
                });
            }
            await JobModel.deleteOne()
            res.status(200).json({
                success: true,
                message: "Job Deleted!"
            });
        } catch (error) {
            console.log(error);
        }
    }
    static getSingleJob = async (req, res) => {
        try {
            const { id } = req.params
            let job = await JobModel.findById(id)
            if (!job) {
                res.status(400).json({
                    status: "failed",
                    message: "OOPS! Job not found",
                });
            }
            res.status(200).json({
                success: true,
                job,
            });
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = JobController