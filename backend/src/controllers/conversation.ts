import express,{NextFunction, Request,Response} from 'express';
import { Document } from 'mongoose';
import Conversations from '../model/Conversation';
import CreateError from '../utils/CreateError';
import Messages from '../model/Messages';

interface CustomRequest extends Request{
    userId?:string,
    isSeller?:string
}

interface ConversationDocument extends Document {
    binary: string[];
    senderId: any;
    receiverId: any;
    readBySender: any;
    readByReceiver: any;
    lastMessage: any;
  }

  interface ConversationData {
    _id:string
    binary: any;
    user: any;
    readBySender: any;
    readByReceiver: any;
    lastMessage: any;
  }
  

export const HandleCoversation = async(req:CustomRequest,res:Response,next:NextFunction) =>{
      const {senderId,receiverId} = req.body;

    try {
        const conversation = await Conversations.findOne(
            {
                binary: { $all: [senderId,receiverId] },
                // operator is used to match documents where the binary field contains all the specified values within the array [senderId, receiverId].
            })

         if(!conversation){
            const NewCoversation = new Conversations(
                {
                binary:[senderId,receiverId],
                senderId:req.userId,
                receiverId:receiverId,
               })
               NewCoversation.save();
               await NewCoversation
              .populate('senderId receiverId', '-password')
         } 
          res.status(201).json(await GetAllOwnCov(req,res,next));
    } catch (error:any) {
        next(CreateError(401,{message:error.message}));
    }

}


// export const GetAllOwnCov = async(req:CustomRequest,res:Response,next:NextFunction):Promise<ConversationData[]> =>{


//     try {

//         const conversations: ConversationDocument[] = await Conversations.find({ binary: { $in: [req.userId] } });
        
//          const FetchCovOfUser: any[] = await Promise.all(conversations.map(async (item: ConversationDocument) => {
//            if (req.userId === item.senderId) {
//              const populatedItem = await Conversations.populate(item, { path: 'receiverId', select: '-password -email' });
//              return {
//                binary: populatedItem.binary,
//                user: populatedItem.receiverId,
//                readBySender: populatedItem.readBySender,
//                readByReceiver: populatedItem.readByReceiver,
//                lastMessage: populatedItem.lastMessage
//              };
//            } else {
//              const populatedItem = await Conversations.populate(item, { path: 'senderId', select: '-password -email' });
//              return {
//                binary: populatedItem.binary,
//                user: populatedItem.senderId,
//                readBySender: populatedItem.readBySender,
//                readByReceiver: populatedItem.readByReceiver,
//                lastMessage: populatedItem.lastMessage
//              };
//            }
//          })); 
//          console.log(conversations,FetchCovOfUser)

//          let prev:number = 0;
//          let next:number = FetchCovOfUser.length - 1;
//          let temp:any | null   = null;
//          while(prev < next){
//                temp = FetchCovOfUser[prev];
//                FetchCovOfUser[prev] = FetchCovOfUser[next];
//                FetchCovOfUser[next] = temp;
//                prev++;
//                next--;
//          }

//          return FetchCovOfUser;
        
//     } catch (error) {
        
//     }

// }



export const getAllCoversationRequest = async (req: CustomRequest, res: Response, next: NextFunction) => {

    try {
        res.status(201).json(await GetAllOwnCov(req,res,next));
    } catch (error:any) {
        next(CreateError(401,{message:error.message}))
    }

}


export const GetAllOwnCov = async (req: CustomRequest, res: Response, next: NextFunction): Promise<ConversationData[]> => {
    try {
      const conversations: ConversationDocument[] = await Conversations.find({ binary: { $in: [req.userId] } });
  
      const FetchCovOfUser: ConversationData[] = await Promise.all(
        conversations.map(async (item: any): Promise<ConversationData> => {
          if (req.userId === item.senderId.toString()) {
            const populatedItem = await Conversations.populate(item, { path: 'receiverId', select: '-password -email' });
            return {
              _id:populatedItem._id,
              binary: populatedItem.binary,
              user: populatedItem.receiverId,
              readBySender: populatedItem.readBySender,
              readByReceiver: populatedItem.readByReceiver,
              lastMessage: populatedItem.lastMessage
            };
          } else {
            const populatedItem = await Conversations.populate(item, { path: 'senderId', select: '-password -email' });
            return {
              _id:populatedItem._id,
              binary: populatedItem.binary,
              user: populatedItem.senderId,
              readBySender: populatedItem.readBySender,
              readByReceiver: populatedItem.readByReceiver,
              lastMessage: populatedItem.lastMessage
            };
          }
        })
      );
  
         let prev:number = 0;
         let next:number = FetchCovOfUser.length - 1;
         let temp:any | null   = null;
         while(prev < next){
               temp = FetchCovOfUser[prev];
               FetchCovOfUser[prev] = FetchCovOfUser[next];
               FetchCovOfUser[next] = temp;
               prev++;
               next--;
         }
  
        //  console.log(FetchCovOfUser)
      return FetchCovOfUser;
    } catch (error) {
      // Handle the error appropriately
      throw error; // Throw the error to be caught by the error handling middleware
    }
  };
  



export const getAllMessageCov =  async(req:Request,res:Response,next:NextFunction) =>{
  
   const {id} = req.params;

    try {
      
        const AllMessages = await Messages.find({conversationId:id}).populate('senderId receiverId', '-password');
        res.status(201).json(AllMessages);
    } catch (error:any) {
       next(CreateError(401,{message:error.message}))
      
    }
}

export const InsertNewMessage = async(req:Request,res:Response,next:NextFunction) =>{
  

  const {conversationId} = req.params;
  
  const {senderId,receiverId,text} = req.body;
  try {

   const message =  await new Messages({
       conversationId,
       senderId,
       receiverId,
       text,
     }).save();
    await message.populate('senderId receiverId', '-password')

    const AllMessages = await Messages.find({conversationId})
   .populate('senderId receiverId', '-password');

   res.status(201).json({newMessage:message,AllMessages:AllMessages});

    
  } catch (error:any) {
    next(CreateError(401,{message:error.message}));
  }

}