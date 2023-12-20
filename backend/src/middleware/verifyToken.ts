// import jwt, { VerifyErrors } from "jsonwebtoken";
// import createError from "../utils/CreateError";
import {NextFunction, Request,Response } from "express";
import { VerifyErrors } from "jsonwebtoken";
import CreateError from "../utils/CreateError";

const jwtKey: string = 'sdfoijfer4333fefewf49443feoifefi';

interface CustomRequest extends Request {
  userId?: string;
  isSeller?: boolean;
}


// export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
//   const token = req.cookies.accessToken;

//   if (!token) return next(createError(401,{message:'You are not authenticated!'}))

//   jwt.verify(token, jwtKey, async (err: VerifyErrors | null, payload: any) => {
//     if (err) return next(createError(403, { message: 'Token is not valid!' }));

//     const reqWithCustomProps: CustomRequest = req;

//     console.log( reqWithCustomProps.userId,payload)
//     console.log(  reqWithCustomProps.isSeller,payload.isSeller)

//     reqWithCustomProps.userId = payload.id;
//     reqWithCustomProps.isSeller = payload.isSeller;
//     next();
//   });
// };






const jwt = require("jsonwebtoken")

  export const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
  try {
    let token : string | undefined = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Authorisation is required");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // const verified = jwt.verify(token, process.env.SECRET);
    // req.user = verified;


    // If the token is valid,it assigns payload.id to req.userId and payload.isSeller to req.isSeller.
    jwt.verify(token, jwtKey, async (err: VerifyErrors | null, payload: any) => {
      if (err) return next(CreateError(403, { message: 'Token is not valid!' }));
  
      const reqWithCustomProps: CustomRequest = req;
      
  
      reqWithCustomProps.userId = payload.id;
      reqWithCustomProps.isSeller = payload.isSeller;
      // console.log( reqWithCustomProps.userId,payload)
      // console.log(  reqWithCustomProps.isSeller,payload.isSeller)
    });
    next();
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};


