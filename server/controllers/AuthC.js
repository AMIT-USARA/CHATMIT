import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { upsertStreamUser } from "../config/stream.js";
dotenv.config();

export const Signup = async(req,res) =>{
    try{
        // const userId = 
        const {email,fullName,password} = req.body;
        if(!email || !fullName || !password){
            return res.status(400).json({success:false,message:"All fildes are required."});
        }
        if(password.length<6){
            return res.status(400).json({success:false,message:"Password must br 6 characters."});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message:"Invalid email format"});
        }

        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({success:false,message:"User already Registered"});
        }

        const idx = Math.floor(Math.random()*100) + 1;
        const randomAvatar = `https://avatar-placeholder.iran.liara.run/public/${idx}.png`

        const newUser = await User.create(
            {
                email,
                fullName,
                password,
                profilePic:randomAvatar
            }
        )
        
        try{
            await upsertStreamUser({
            id:newUser._id.toString(),
            name:newUser.fullName,
            image:newUser.profilePic || "",
        });
        console.log(`Stream user created for ${newUser.fullName}`);
        }catch(error){
            console.log("Error in creating stream user",error);
        }




        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })
        // console.log("111")
        res.cookie("jwt",token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV === "production",
        })
        res.status(201).json({success:true,user:newUser})
    }catch(error){
        // return
        console.log("Error in SIGN_UP controller :- ",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const Login = async(req,res) =>{
    const {email,password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({success:false,message:"All filde are required."})
        }
        const existingUser = await User.findOne({email:email});
        if(!existingUser){
            return res.status(400).json({success:false,message:"User not register, please Signup"})
        }
        const isPasswordCorrect = await existingUser.matchPassword(password);
        if(!isPasswordCorrect){
            return res.status(401).json({message:"Invalid email or password"})
        }

        const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })
        // console.log("111")
        res.cookie("jwt",token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV === "production",
        })

        res.status(200).json({success:true,user:existingUser})

    }catch(error){
        console.log("Error in login",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const Logout = (req,res) =>{
    res.clearCookie("jwt");
    res.status(200).json({success:true, message:"Logout successful"});
}

export const onBoard = async(req,res)=>{
    try{
        const userId = req.user._id;
        const {fullName,bio,nativeLanguage,learningLanguage,location} = req.body
        if(!fullName||!bio||!nativeLanguage||!learningLanguage||!location){
            return res.status(400).json({message:"All fields are required",
                missingFields:[
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    ! learningLanguage && "learningLanguage",
                    !location && "location",
                ].filter(Boolean),
            });
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{
            ...req.body,
            isOnboarded:true,   
        },{new:true})
        if(!updatedUser){
            return res.status(401).json({message:"user not found"})
        }

        try{
            await upsertStreamUser({
            id:updatedUser._id.toString(),
            name:updatedUser.fullName,
            image:updatedUser.profilePic || ""
        })
        console.log(`Stream user created for ${updatedUser.fullName}`);
        }catch(streamError){
            console.log("Error updating Stream user during onboarding:",streamError.message);
        }

        return res.status(200).json({success:true,user:updatedUser});
    }catch(error){
        console.log("Error in onbording",error)
    }
}