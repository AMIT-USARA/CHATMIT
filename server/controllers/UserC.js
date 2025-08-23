import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export const getRecommendedUsers = async(req,res) =>{
    try{
        const currentUserId = req.user.id;
        const currentUser = req.user;


        const getRecommendedUsers = await User.find({
            $and:[
                {_id:{$ne:currentUserId}},
                {_id:{$nin:currentUser.friends}},
                {isOnboarded:true}
            ]
        })
        res.status(200).json(getRecommendedUsers)
    }
    catch(error){
        console.error("Error in getRecommendedUsers controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getMyFriends = async(req,res) => {
    try{
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends","fullName profilePic nativeLanguage learningLanguage");
    
        res.status(200).json(user.friends);
    
    }catch(error){
        console.error("Error in getMyFriends controller", error.message);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

export const sendFriendRequest = async(req,res) =>{
    try{
        const myId = req.user.id;
        const {id:recipientId} = req.params;
        if(myId=== recipientId){
            return res.status(400).json({message:"You can't send friend request to yourself"});
        }
        const recipient = await User.findById(recipientId)
        if(!recipient){
            return res.status(404).json({message:"Recipient not found."});
        }
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message:"You are Already friends with this user"});
        }
        const existingReq = await FriendRequest.findOne({
            $or:[{
                sender:myId,recipient:recipientId
            },{
                sender:recipientId,recipient:myId
            }],
        });
        if(existingReq){
            return res.status(400).json({message:"A friend request already exists between you and this user"});
        }

 
        const friendReq = await FriendRequest.create({
            sender:myId,
            recipient:recipientId,
        })

        res.status(200).json(friendReq);
    }
    catch(error){
        console.error("Error in sendFriendRequest Controller",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}