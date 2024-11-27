const CategoryModel = require("../models/category");
const JobModel = require("../models/job");

class CategoryController {

    static getallcategory = async (req, res) => {
        try {
            const categories = await CategoryModel.find()
            res.status(200).json({
                success: true,
                categories,
            });
        } catch (error) {
            console.log(error);
        }
    }


    static categoryinsert = async (req, res) => {
        try {
            const { role } = req.userdata
            if (role === "job seeker") {
                res.status(400).json({
                    status: "failed",
                    message: "Job seeker are not allowed to access this resource",
                });
            }
            const { name, icon } = req.body
            const category = new CategoryModel({
                name: name,
                icon: icon
            })
            await category.save()
            res.status(201).json({
                status: "success",
                message: "Category Inserted😃",
            });
        } catch (error) {
            console.log(error);
        }
    }

    static categoryupdate = async (req, res) => {
        try {
            const { role } = req.userdata
            if (role === "job seeker") {
                res.status(400).json({
                    status: "failed",
                    message: "Job seeker are not allowed to access this resource",
                });
            }
            const { id } = req.params
            const { name, icon } = req.body
            const update = await CategoryModel.findByIdAndUpdate(id, {
                name: name,
                icon: icon
            })
            res.status(200).json({
                success: true,
                message: "Category Updated!",
                update
            })
        } catch (error) {
            console.log(error);
        }
    }
    static categorydelete = async (req, res) => {
        try {
            const { role } = req.userdata
            if (role === "job seeker") {
                res.status(400).json({
                    status: "failed",
                    message: "Job seeker are not allowed to access this resource",
                });
            }
            const { id } = req.params
            await CategoryModel.findByIdAndDelete(id)
            res.status(200).json({
                success: true,
                message: "Job Deleted!"
            });
        } catch (error) {
            console.log(error);
        }
    }

    static Categorylist = async (req, res) => {
        try {
            const { cname } = req.params;
            console.log(cname)
            const categorylist = await JobModel.find({ category: cname });
            console.log(categorylist)
            if (!categorylist) {
                return res.status(404).json({ message: "category  not found" });
            }
            res.status(200).json({
                success: true,
                categorylist,
            });
        }
        catch (error) {
            console.log(error.message);
            res.status(400).json({ status: "failed", message: error.message });
        }
    };

}
module.exports = CategoryController