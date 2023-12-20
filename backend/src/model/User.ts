import { Document, Model, model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';


interface UserMethods extends Document {
  firstName: String,
  lastName: String,
  email: String | undefined,
  password: String,
  img: String,
  background:String,
  country: String,
  phone: String,
  desc: String,
  isSeller: Boolean,
  // Add other instance methods here
}

interface UserModel extends Model<UserMethods> {
  register(firstName: string, lastName: string, email: string, img: string): Promise<UserMethods>;
  // Add other static methods as needed
}

const userSchema = new Schema<UserMethods>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value:string) => {
        // Custom validation logic
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address",
    },},
  password: { type: String, required: false },
  img: { type: String, required: false,default:'' },
  background:{type:String,required:false},
  country: { type: String, required: false },
  phone: { type: String, required: false },
  desc: { type: String, required: false },
  isSeller: { type: Boolean, required: false,default:false },
},{ timestamps: true });


userSchema.statics.register = async function(firstName: string, lastName: string, email: string, img: string): Promise<UserMethods> {
  if(!validator.isEmail(email)){
    throw Error("this email not valid...")
 }
//  else if(!validator.isStrongPassword(password)){
//     throw Error("this password not Strong enough...")
//  }

 const email_exist = await this.findOne({email})
 if(email_exist){
    console.log('user already existe...')
    return email_exist

    // throw Error('this email already used...')
 }
//  const salt = await bcrypt.genSalt(10)
//  const hash = await bcrypt.hash(password,salt)

    const now_user = await this.create({firstName,lastName,email,img})
    return now_user
};

const User = model<UserMethods, UserModel>('User', userSchema);

export default User;
