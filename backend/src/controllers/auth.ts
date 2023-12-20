// controllers/auth.js
import passport from 'passport';
import { Request,Response,NextFunction } from 'express';
import User from '../model/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';


// import createError from '../utils/CreateError.js';

const SECRET: string = 'sdfoijfer4333fefewf49443feoifefi';

// const generateToken = (userId: string, isSeller: boolean): string => {
//   const payload = {
//     id: userId,
//     isSeller: isSeller,
//   };
//   const token = jwt.sign(payload, jwtKey, { expiresIn: '1h' }); // Set token expiration if desired
//   return token;
// };

const CreateToken = (userId: string, isSeller: boolean) =>{
  const payload = {
    id: userId,
    isSeller: isSeller,
  };                         // this time represent which token has been expired
  // const token = jwt.sign(payload, SECRET, { expiresIn: '1h' }); // Set token expiration if desired
  const token = jwt.sign(payload, SECRET);
  return token;
}



interface Userr {
  isSaller :boolean,
}

export const registerAuth= async(req:Request,res:Response,next:NextFunction) =>{
  const {password:ps,firstName,lastName,email,password,country} = req.body;
  const ArrayData:string[] =[firstName,lastName,email,password,country];
  const ArrayString:string[] =['firstName','lastName','email','password','country'];
  const errorArray :string[] =[];


  if(ArrayData.length > 0){
    for (let index = 0; index < ArrayData.length; index++) {
      if(!ArrayData[index]) errorArray.push(ArrayString[index]);
    }
  }

  if(errorArray.length > 0) return res.status(401).json(errorArray);

  console.log(req.body)
  try {
    const hash = bcrypt.hashSync(ps, 5);
    const newUser = new User({...req.body,password:hash})

      await newUser.save()
      const userInfo = newUser.toObject();
      const { password, ...info } = userInfo;
      res.status(201).json({userData:info,token:CreateToken(newUser.id,Boolean(newUser.isSeller))})
     } catch (error:any) {
      next(CreateError(401,{message:error.message}))
  }

}

export const loginAuth  = async(req:Request,res:Response,next:NextFunction) =>{
           const {password,email} = req.body;
           const errorArray : string[] = [];

           if(!email) errorArray.push('email');
           if(!password) errorArray.push('password')
           
           if(errorArray.length > 0) return res.status(401).json(errorArray);

       try {

           const FindUser = await User.findOne({email:email});
           if(!FindUser){
             return next(CreateError(401,{message:'the user not found'}))
           }
          //  const matchPassword =await bcrypt.compare(String(FindUser.password),password);
          const matchPassword = await bcrypt.compare(password, String(FindUser.password));
           if(!matchPassword){
           return next(CreateError(401,{message:'password not match'}))
           }
            res.status(201).json({userData:FindUser,token:CreateToken(FindUser.id,Boolean(FindUser.isSeller))});
        
       } catch (error:any) {
        next(CreateError(401,{message:error.message}))
       }
}

export const deleteUser = async(req:Request,res:Response,next:NextFunction) =>{
  
    try {
      await User.findByIdAndDelete(req.params.id)
      next(CreateError(201,{message:"user deleted"}))
    } catch (error:any) {
      next(CreateError(401,{message:error.message}))
    }
     

}


export const logout = async(req:Request,res:Response) =>{
  res
  .clearCookie("accessToken", {
    sameSite: "none",
    secure: true,
  })
  .status(200)
  .send("User has been logged out.");
}

// Google OAuth callback controller

type Name ={
  givenName:string,familyName:string
}

interface User {
  name: Name;
  given_name: string;
  family_name: string;
  photos: any;
  emails: any;
}

let userVar : any = null;

export const LoginGoogle = async(req:Request,res:Response) =>{
       
      try {
        if(!userVar){
          return
         }
          const user = await User.findOne({email:userVar.email})
          res.status(201).json({userData:user,token:CreateToken(user?.id,Boolean(user?.isSeller || false))});
      } catch (error) {
          throw error;
      }
      userVar = null;
}

export const googleCallback = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Access user information from req.user
  const user: User | undefined = req.user as User | undefined;

  if (!user) {
    // Handle the case when user information is not available
    res.status(401).json({ error: "User not found" });
    return;
  }

  if (!isUserValid(user)) {
    // Handle the case when user object is not valid
    res.status(401).json({ error: "Invalid user data" });
    return;
  }

  const { name:{givenName,familyName}, emails,photos } = user;
  console.log(givenName,familyName)
  try {
     const Ruser = await User.register(givenName,familyName,emails[0].value,photos[0].value)
     console.log(Ruser)
      userVar = Ruser;
     res.redirect('http://localhost:5173/');
  } catch (error:any) {
       res.status(400).json({msg:error.message})
  }
 

  
};

function isUserValid(user: User | undefined): user is User {
  return user !== undefined;
}

// export const googleCallback = (req:Request,res:Response,next:NextFunction) => {
  // Access user information from req.user
//   const user = req.user;
//   console.log(user)
//   const { name, given_name, family_name, picture, email } = user;
  // Here, you can insert the user into MongoDB or perform any other desired operations
  // For example, using Mongoose:
  // const User = require('../models/user');
  // const newUser = new User({ email: user.email });
  // newUser.save()
  //   .then(() => {
  //     console.log('User saved to MongoDB');
      // Redirect or send a response as needed
  //   })
  //   .catch(err => {
  //     console.log(err);
      // Handle error response
  //   });

  // Redirect or send a response as needed
//  try {
//     res.redirect('http://localhost:5173/Dashboard');
//  } catch (error:any) {
//     res.status(400).json({message:error.message})
//  }
//   res.redirect('http://localhost:5173/Dashboard');

// };


export const facebookCallback = (req:Request,res:Response,next:NextFunction) => {
    // Access user information from req.user
    const user = req.user;
    console.log(user)
    // Here, you can insert the user into MongoDB or perform any other desired operations
    // For example, using Mongoose:
    // const User = require('../models/user');
    // const newUser = new User({ email: user.email });
    // newUser.save()
    //   .then(() => {
    //     console.log('User saved to MongoDB');
    //     // Redirect or send a response as needed
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     // Handle error response
    //   });
  
    // Redirect or send a response as needed
   try {
      res.redirect('http://localhost:5173/');
   } catch (error:any) {
      res.status(400).json({message:error.message})
   }
  //   res.redirect('http://localhost:5173/Dashboard');
  
  };

  export const likedinCallback = (req:Request,res:Response,next:NextFunction) => {
    // Access user information from req.user
    const user = req.user;
    console.log(user)
    // Here, you can insert the user into MongoDB or perform any other desired operations
    // For example, using Mongoose:
    // const User = require('../models/user');
    // const newUser = new User({ email: user.email });
    // newUser.save()
    //   .then(() => {
    //     console.log('User saved to MongoDB');
    //     // Redirect or send a response as needed
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     // Handle error response
    //   });
  
    // Redirect or send a response as needed
   try {
      res.redirect('http://localhost:5173/');
   } catch (error:any) {
      res.status(400).json({message:error.message})
   }
  //   res.redirect('http://localhost:5173/Dashboard');
  
  };

export const githubCallback = (req:Request,res:Response,next:NextFunction) => {
    // Access user information from req.user
    const user:any = req.user;
    // console.log(user)
    if (user.emails && user.emails.length > 0) {
        // Extract the user's email from the user object
        const email = user.emails[0].value;
        console.log(email);
      } else {
        console.log('Email not available');
      }
    // Here, you can insert the user into MongoDB or perform any other desired operations
    // For example, using Mongoose:
    // const User = require('../models/user');
    // const newUser = new User({ email: user.email });
    // newUser.save()
    //   .then(() => {
    //     console.log('User saved to MongoDB');
    //     // Redirect or send a response as needed
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     // Handle error response
    //   });
  
    // Redirect or send a response as needed
   try {
      res.redirect('http://localhost:5173/');
   } catch (error:any) {
      res.status(400).json({message:error.message})
   }
  //   res.redirect('http://localhost:5173/Dashboard');
  
  };

// Set up Google OAuth strategy with Passport.js
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import CreateError from '../utils/CreateError';
import user from '../model/User';
// import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
// import { Strategy as TwitterStrategy } from 'passport-twitter';





//TODO-------FacebookStrategy--------//

interface FacebookStrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string[];
  }

  const options: FacebookStrategyOptions = {
    clientID: "1287674622153541",
    clientSecret: 'a01c7b8ebc04034e3d0572c79b81c8fb',
    callbackURL: '/auth/facebook/callback',
    scope: ['user:saidaymenazert@gmail.com'], // Add this line
  };

passport.use(
    new FacebookStrategy(options,
    //     {
    //     clientID:,
    //     clientSecret: ,
    //     callbackURL: '/auth/facebook/callback',
    //     scope :['user:saidaymenazert@gmail.com'], // Add this line
    //   },
      (accessToken:string, refreshToken:any, profile:any, done:any) => {
        // Process the authenticated user data
      //   const user = {
      //     id: profile.id,
      //     email: profile.emails[0].value,
      //     name: profile.displayName,
      //   };
  
        // You can perform additional checks or modify the user object before saving
  
        return done(null, profile);
      }
    )
  );


//TODO-------GithubStrategy--------//
passport.use(
  new GithubStrategy(
    {
      clientID: "51867e30f71e1672fcfd",
      clientSecret: '3bc17337e8b39c2701ca9a8882931b7547286b13',
      callbackURL: '/auth/github/callback',
    },
    (accessToken:any, refreshToken:any, profile:any, done:any) => {
      // Process the authenticated user data
    //   const user = {
    //     id: profile.id,
    //     email: profile.emails[0].value,
    //     name: profile.displayName,
    //   };

      // You can perform additional checks or modify the user object before saving

      return done(null, profile);
    }
  )
);


//TODO-------GoogleStrategy--------//
passport.use(
new GoogleStrategy(
  {
    clientID: "132084916155-ckq4i5d4362hipgl7jrj75gvh9jb8n2e.apps.googleusercontent.com",
    clientSecret: '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',
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // Process the authenticated user data
  //   const user = {
  //     id: profile.id,
  //     email: profile.emails[0].value,
  //     name: profile.displayName,
  //   };

    // You can perform additional checks or modify the user object before saving

    return done(null, profile);
  }
)
);



//TODO-------LikedinStrategy--------//

// passport.use(
//     new LinkedInStrategy( 
//       {
//         clientID: "7858jmmpppxhmt",
//         clientSecret: 'XAMzUF09B7Htuy9E',
//         callbackURL: 'http://localhost:5000/auth/linkedin/callback',
//         scope: ['r_liteprofile', 'r_emailaddress', 'w_member_social'], // Specify the required scopes here
//       },
//       (accessToken:string, refreshToken:any, profile:any, done:any) => {
//         // Process the authenticated user data
//       //   const user = {
//       //     id: profile.id,
//       //     email: profile.emails[0].value,
//       //     name: profile.displayName,
//       //   };
  
//         // You can perform additional checks or modify the user object before saving
  
//         return done(null, profile);
//       }
//     )
//   );


  //TODO-------TwitterStrategy--------//

// N1dLeGhuRXVYbm5rTkdQb2ZTMHY6MTpjaQ
// aXHH7NPJgQD5AEGvhFLDVJZBXmDEvV4G5aaGFjzn0fyFMT8D1D


// passport.use(
//   new TwitterStrategy( 
//     {
//       consumerKey: "TXCNqjZ6HoYIDes9s0YzG2LYE",
//       consumerSecret: '4xP5N1ciW9xw6WxRfqPYtJg8STBU0zgFhYyL5wLhrVqjJLxBW7',
//       clientID: "N1dLeGhuRXVYbm5rTkdQb2ZTMHY6MTpjaQ",
//       clientSecret: 'aXHH7NPJgQD5AEGvhFLDVJZBXmDEvV4G5aaGFjzn0fyFMT8D1D',
//       callbackURL: 'http://localhost:5000/auth/twitter/callback',
//       // scope: ['r_liteprofile', 'r_emailaddress', 'w_member_social'], // Specify the required scopes here
//     },
//     (accessToken:string, refreshToken:any, profile:any, done:any) => {
//       // Process the authenticated user data
//     //   const user = {
//     //     id: profile.id,
//     //     email: profile.emails[0].value,
//     //     name: profile.displayName,
//     //   };

//       // You can perform additional checks or modify the user object before saving

//       return done(null, profile);
//     }
//   )
// );
// Serialize/deserialize user with Passport.js
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user:any, done) => {
  done(null, user);
});
