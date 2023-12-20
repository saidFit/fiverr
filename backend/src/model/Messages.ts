import mongoose, { Document,Model,model,Schema } from "mongoose";


interface MessagesModel extends Document {
    conversationId:String,
    senderId:any,
    receiverId:any,
    text:String,
}


interface MessagesMethods extends Model<MessagesModel> {
      
}

const MessagesSchema = new Schema<MessagesModel> ({
    conversationId:{type:String,required:true},
    senderId:{type:Schema.Types.ObjectId,ref:"User"},
    receiverId:{type:Schema.Types.ObjectId,ref:"User"},
    text:{type:String,required:true},
      
},{ timestamps: true })


// MessagesSchema.statics.insertMessages = async function()


const Messages = model<MessagesModel,MessagesMethods>('Messages',MessagesSchema);
export default Messages;