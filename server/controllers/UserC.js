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

export const acceptFriendRequest = async(req,res)=>{
    try{
        const {id:requestId} = req.params;
    const friendReq = await FriendRequest.findById(requestId);
    if(!friendReq){
        return res.status(404).json({message:"Friend request not found"});

    }
    if(friendReq.recipient.toString() != req.user.id){
        return res.status(403).json({message:"you are not authorized to accept this request"});
    }
    friendReq.status = "accepted";
    await friendReq.save();

    const user = await User.findByIdAndUpdate(friendReq.sender,{
        $addToSet:{friends:friendReq.recipient},
    });
    await User.findByIdAndUpdate(friendReq.recipient,{
        $addToSet:{friends:friendReq.sender},
    });
     res.status(200).json({message:"Friend request accepted"});
    }catch(error){
        console.log("Error in acceptedFriendRequest controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }

}


export const getFriendRequests = async (req,res)=>{
    try{
        const incomingReqs = await FriendRequest.find({
            recipient:req.user.id,
            status:"pending",
        }).populate("sender","fullName profilePic nativeLanguage learningLanguage");

        const acceptedReqs = await FriendRequest.find({
            sender:req.user.id,
            status:"accepted",
        }).populate("recipient","fullName profilePic");

        res.status(200).json({incomingReqs,acceptedReqs});
    }catch(error){
        console.log("Error in getPendingFriendRequest controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getOutgoingFriendReqs = async(req,res)=>{
    try{
        const outgoingReqs = await FriendRequest.find({
            sender:req.user.id,
            status:"pending",
        }).populate("recipient","fullName profilePic nativeLanguage learningLanguage");
    
    res.status(200).json(outgoingReqs);
    
    }catch(error){
        console.log("Error in getOutgoingFriendReqs controller",error.message);
        res.status(500).json({message:"Internal Server Error"});

    }
}

