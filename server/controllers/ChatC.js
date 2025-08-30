import { generateStreamToken } from '../config/stream.js';

export async function getStreamToken() {
  try{
    const token = generateStreamToken(req.user.id);
    res.status(200).json({token});
  }catch(error){
    console.log("Error in getStreamToken controller:",error.message);
    req.status(500).json({message:"Internal Server Error"});
  }
}

