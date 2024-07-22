import userModel from "../models/userModel";
import jwp from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from "validator"

// login user

const loginUser = async (req,res) => {

}

// register user

const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        //checking if user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res,json({success:false,message:"User already exists."})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email."})
        }

        //enter strong password
        if(password.length < 8){
            return res.json({success:false,message:"Please enter a stronger pasword"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

    } catch (error) {
        
    }
}

export {loginUser,registerUser}