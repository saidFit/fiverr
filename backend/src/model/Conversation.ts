import { Document,Model,model,Schema } from "mongoose";


interface ConversationModel extends Document {
    binary : string[],
    senderId:any,
    receiverId:any,
    readBySender:boolean,
    readByReceiver:boolean,
    lastMessage:string,
     

}


interface ConversationMethods extends Model<ConversationModel> {
      
}

const ConversationSchema = new Schema<ConversationModel> ({
      binary:{type:[String],required:true},
      senderId:{type:Schema.Types.ObjectId,ref:"User"},
      receiverId:{type:Schema.Types.ObjectId,ref:"User"},
      readBySender:{type:Boolean,default:false},
      readByReceiver:{type:Boolean,default:false},
      lastMessage:{type:String,trim:true,default:''},//trim=>exemple "   hello said    " => output become "hello said"
      
},{ timestamps: true })


// ConversationSchema.statics.insertConversation = async function()


const Conversation = model<ConversationModel,ConversationMethods>('Conversation',ConversationSchema);
export default Conversation;