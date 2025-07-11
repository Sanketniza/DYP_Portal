import Job  from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {

    try {

        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };

        // let experienceLevel = experience; 
        // if (!isNaN(experience)) { 
        //   experienceLevel = experience.toString(); // Convert number to string
        // }

            // console.log("experienceLevel", experience);

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
};

// how much jobs are created by admin 
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
    
};

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Await the result of the deletion
        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({
            message: "Internal Server Error. Could not delete the job.",
            success: false,
        });
    }
};

