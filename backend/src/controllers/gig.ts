import Gig from '../model/Gig';
import {Response,Request, NextFunction} from 'express';
import CreateError from '../utils/CreateError';

interface CustomRequest extends Request {
  userId?: string;
  isSeller?: boolean;
}

export const EditReview = async(req:CustomRequest,res:Response,next:NextFunction) => {

  const {id} = req.params;
  console.log(id);
  
  const {comment} = req.body;
    const existGig = await Gig.findById(id).populate('reviews.userId','-password');
      if(!existGig){
        throw new Error("this gig not found.")   
      }

      const newReview = {
        userId: req.userId, // Assign the entire user object to the review's userId property
        comment: comment,
      };
      existGig.reviews.push(newReview);

  try {
    const updatedGig =await (await existGig.save()).populate({
      path: "reviews.userId",
      select: "-password",
    });

    res.status(200).json(updatedGig.reviews);

  } catch (error:any) {
    next(CreateError(401,{message:error.message}));
  }

}

export const getAllGigs = async(req:CustomRequest,res:Response,next:NextFunction) =>{

  try {
    const AllGigs = await Gig.find({})
      .populate({
        path: "userId",
        select: "firstName img lastName email background",
      })
      .populate({
        path: "reviews.userId",
        select: "-password", // Customize the fields you want to select from the user for the reviews
      })
      .exec(); // Call exec() to execute the query
      // .maxTimeMS(30000); // Set the query timeout to 30 seconds
  
    res.status(201).json(AllGigs);
  } catch (error: any) {
    next(CreateError(401, { message: error.message }));
  }
  

}

export const InsertGig = async(req:CustomRequest,res:Response,next:NextFunction)=>{
     const {title,desc,category,subCategory,price,cover,images,tags,shortTitle,shortDesc,sales,} = req.body;
      console.log(req.body)
     if(!title
       || !desc 
       || !category 
       || !subCategory 
       || !price 
       || !cover 
       || !images 
       || !tags 
       || !shortTitle 
       || !shortDesc ) return next(CreateError(401,{message:"some Query(s) aren't valid!!"}));

      try {

        const gigData = {
          ...req.body,
          userId: req.userId,
        };

          const currentTimestamp = new Date();
          const createdGig = await new Gig(gigData).save();
          // Populate the userId field with user information
          await createdGig.populate("userId", "firstName lastName img email");
          const gigs = await Gig.find({ userId: req.userId }).sort({ createdAt: 1 })
          .populate("userId", "firstName lastName img email");

    // Sort the gigs based on the time difference
    //a and b, representing two elements from the gigs array.
    gigs.sort((a, b) => {
      const timeDifferenceA = Math.abs(currentTimestamp.getTime() - a.createdAt.getTime());
      const timeDifferenceB = Math.abs(currentTimestamp.getTime() - b.createdAt.getTime());
      // console.log(a.title,timeDifferenceA,b.title,timeDifferenceB,timeDifferenceA-timeDifferenceB)
      return timeDifferenceA - timeDifferenceB;
    });
      res.status(201).json({gigs:gigs,nowGig:createdGig});

      } catch (error) {
        throw error;
      }
      
}

export const GetAllGigsOfSeller = async(req:CustomRequest,res:Response,next:NextFunction) =>{

  try {
    const currentTimestamp = new Date();
    const gigs = await Gig.find({ userId: req.userId }).sort({ createdAt: 1 })
    .populate("userId", "firstName lastName img email");

    // Sort the gigs based on the time difference
    //a and b, representing two elements from the gigs array.
    gigs.sort((a, b) => {
      const timeDifferenceA = Math.abs(currentTimestamp.getTime() - a.createdAt.getTime());
      const timeDifferenceB = Math.abs(currentTimestamp.getTime() - b.createdAt.getTime());
      // console.log(a.title,timeDifferenceA,b.title,timeDifferenceB,timeDifferenceA-timeDifferenceB)
      return timeDifferenceA - timeDifferenceB;
    });
      res.status(201).json(gigs);
  } catch (error:any){
    res.status(401).json({msg:error.message})
  }
}


export const editGig = async(req:CustomRequest,res:Response,next:NextFunction) =>{
          console.log(req.params.id)
          const {id} = req.params;
      try {
        
          await Gig.findByIdAndUpdate({_id:id},{$set:{...req.body}});
          const currentTimestamp = new Date();
          const gigs = await Gig.find({ userId: req.userId }).sort({ createdAt: 1 })
          .populate("userId", "firstName lastName img email");

          // Sort the gigs based on the time difference
          //a and b, representing two elements from the gigs array.
          gigs.sort((a, b) => {
            const timeDifferenceA = Math.abs(currentTimestamp.getTime() - a.createdAt.getTime());
            const timeDifferenceB = Math.abs(currentTimestamp.getTime() - b.createdAt.getTime());
            // console.log(a.title,timeDifferenceA,b.title,timeDifferenceB,timeDifferenceA-timeDifferenceB)
            return timeDifferenceA - timeDifferenceB;
          });
            res.status(201).json(gigs);
          // res.status(201).send('update seccessfully');
      } catch (error:any) {
         res.status(401).json({msg:error.message})
          // CreateError(401,{message:error.message})
      }

}