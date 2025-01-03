import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


//login user
const loginUser = async (req,res)=>{
    const {password,email}=req.body;
    try{
        const user =await userModel.findOne({email});
        
        if(!user){
            return res.json({success:false,message:'user doesnt exists'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:'Invalid credentials'})
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    }
    catch (error){
        console.log(error)
        res.json({success:false, message:"Error"})

    }
   

}


const createToken = (id) => {
   
    return jwt.sign({ id }, process.env.JWT_SECRET); 
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({ success: false, message: "An error occurred during registration" });
    }
};


export {loginUser, registerUser};
