

import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
// import getDataUri from "../util/datauri.js";
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';


//&  ----------------------------------------------------------------------------------------------------



export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;

        // Validate required fields
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        // File upload to Cloudinary (Check if file exists)
        let profilephoto = '';  // Default to empty string in case no file is uploaded
        if (req.file) {
            const file = req.file;
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilephoto = cloudResponse.secure_url;  // Use the cloudinary URL for profile photo
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            profile: {
                profilephoto,
                // cloudinary_id: cloudResponse.public_id (if needed)
            }
        });

        return res.status(200).json({
            message: "User account created successfully",
            success: true,
            user: newUser  // Optional: return the created user details
        });

    } catch (error) {
        console.error("Error in register controller:", error.message);

        return res.status(500).json({
            message: "Server error occurred while creating the account",
            success: false,
            error: error.message  // Pass the error message to the response for easier debugging
        });
    }
};



//&  ----------------------------------------------------------------------------------------------------


export const login = async (req, res) => {

try {   
     const { email, password , role } = req.body;
     
       if(!email || !password || !role) {   // without filling this information you  can not be logged in
           return res.status(400).json({ 
               message: "All fields are required",
               success: false
            });
        };
     
     let user = await User.findOne({ email });  // finding user by email . if not found it will return null . here we use let because we want  to change (modified) the value of user in below if i declared it as const it will not work
     
       if(!user) {
           return res.status(400).json({
               message: "User does not exist",
               success: false
            });
        };
     
     const isPasswordMatch = await bcrypt.compare(password , user.password);
     
       if(!isPasswordMatch) {
           return res.status(400).json({
               message: "Invalid password",
               success: false
            });
        };
     
     // check role is correct or not

           if(role !== user.role) {
               return res.status(400).json({
                   message: "Invalid role",
                   success: false
                });
            };
  
           const tokenData = {
              userId: user.id
            }   
           
           const token = jwt.sign(tokenData , process.env.SECRET_KEY , { expiresIn: "1d" });
  
            user = {
              _id:user._id,
              fullname: user.fullname,
              email: user.email,
              role: user.role,
              phoneNumber: user.phoneNumber,
              profile: user.profile
            };
  
               return res.status(200).cookie("token" , token , { 
                    maxAge: 1*24*60*60*1000 , 
                    httpOnly: true , 
                    sameSite: "strict", 
                    secure: true 
                }).json({
                       message: `Welcome ${user.fullname}`,
                       user,
                       success: true
                    });
        
 } catch (error) {
       console.log("error is found in login controller");
     console.log(error.User.message);
 }

};


//&  ----------------------------------------------------------------------------------------------------


export const logout = async (req, res) => {
   
   try {
       
       return res.status(200).cookie("token" , "" , {maxAge: 0}).json({
           message: "User logout successfully",
           success: true
        });
       
       
    } catch (error) {
        console.log("error is found in logout controller");
        console.log(error.message);
    };
   
};


//&  ----------------------------------------------------------------------------------------------------


export const updateProfile = async (req, res) => { // main file
    try {
        const { fullname, email, phoneNumber, bio, skills, github, linkedin   } = req.body;
        // console.log(fullname, email, phoneNumber, bio, skills, github, linkedin);

        const file = req.file; 
        // console.log(req.body);
        // console.log(file);

        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; // from middleware authentication
        
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            });
        }

        // Update user profile fields if provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (github) user.github = github;
        if (linkedin) user.linkedin = linkedin;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URL
            user.profile.resumeOriginalName = file.originalname; // Save the original filename if needed
        }

        // Save the updated user profile
        await user.save();

        // Prepare the user data to return in the response
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            github: user.github,
            linkedin: user.linkedin,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });
        
    } catch (error) {
        console.log("Error is found in updateProfile controller");
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}; 



//&  ----------------------------------------------------------------------------------------------------


