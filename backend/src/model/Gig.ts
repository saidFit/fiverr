import { Document,Model,model,Schema } from "mongoose";


interface Review {
    userId:any;
    comment: string;
  }

interface GigModel extends Document {
     userId : any,
     title  : string,
     desc   : string,
     totalStarts:Number,
     startNumber:Number,
     reviews: Review[],
     category:string,
     subCategory:string,
     price:Number,
     cover:string,
     images:string[],
     tags:string[],
     shortTitle:string,
     shortDesc:string,
     sales:Number,
     createdAt:Date

}


interface GigMethods extends Model<GigModel> {
      
}

const GigSchema = new Schema<GigModel> ({
    userId :{ type: Schema.Types.ObjectId, ref: "User" },
    title  :{type:String,max:80},
    desc   :{type:String,required:true},
    totalStarts:{type:Number ,default:0},
    startNumber:{type:Number ,default:0},
    reviews: [{
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, required: true },
    }],
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    price:{type:Number,required:true},
    cover:{type:String,required:true},
    images:[String],
    tags: {
        type: [String],
        validate: {
          validator: function (tags: string[]) {
            return tags.length <= 5;
          },
          message: "Tags array cannot have more than 5 elements",
        },
      },
      shortTitle:{type:String,required:true},
      shortDesc:{type:String,required:true},
      sales:{type:Number,required:true,default:0},
      createdAt: {
        type: Date,
        default: Date.now,
        index: true,
      },
})

// mention to reviews as default value;
GigSchema.path('reviews').default(function() {
  return [];
});

// GigSchema.statics.insertGig = async function()


const Gig = model<GigModel,GigMethods>('Gig',GigSchema);
export default Gig;