
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import authRoutes from './routes/auth';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import gigRouter from './routes/gig';
import coversationRouter from './routes/conversation';
import orderRouter from './routes/order';
import http from 'http';
import { Server, Socket } from 'socket.io';
import Conversations from './model/Conversation';

dotenv.config();

const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     credentials: true,
//   },
// });

app.use(session({
  secret: 'aXHH7NPJgQD5AEGvhFLDVJZBXmDEvV4G5aaGFjzn0fyFMT8D1D',
  resave: true,
  saveUninitialized: true
}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/gig', gigRouter);
app.use('/coversation', coversationRouter);
app.use('/order', orderRouter);

interface Errors {
  status: number,
  message: string
}

app.use((err: Errors, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).send(errorMessage);
});

const PORT = process.env.PORT || 5000;
const mongUri = process.env.MONGO_URI as string;

if (!mongUri) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

const server =app.listen(PORT, () => {
  console.log(`Connected to database & listening on port ${PORT}`);
});


// Increase the MongoDB query timeout value
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase the timeout value to 30 seconds
};


mongoose.connect(mongUri, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error: Error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });






  const io = require("socket.io")(server, {
    // pingTimeout: 60000,//TODO:that means after 60 seconde will be close this chat
    cors: {
    origin: 'http://localhost:5173',
    // credentials: true,
  },
  });


  interface Notification {
     conversationId:{
        user:any,
        id:string,
        lengthMessages:string[],
        receiverId:string,
     }
  }

  interface DesconnectUsers {
     userId:string,
     createAt:any,
  }

  interface UserPublished {
     gig:any,
     user:any,
     timePublished:any,
  }

  let users:any = [];
  let desconnectUsers:DesconnectUsers[] = []; //you need to pick a default value to skip that "desconnectUsers.push(desconnectUser) Cannot read properties of undefined (reading 'push')"

  let roomsInTyping:string[] = [];
  let notification:Notification[] = [];
  let notificationOfUser:Notification[]=[];
  let TwoLaterRooms:string[]  = [];
  let roomTyping:any  = null;
  let publishedGig:UserPublished[] = [];
  const addUser = (userId:string, socketId:any) => {
    !users.some((user:any) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId:any):any => {
   let userDesconnect = users.find((user:any) => user.socketId === socketId);
    users = users.filter((user:any) => user.socketId !== socketId);
    return userDesconnect;
    
  };
  const addDesconnectUser = (userId:string) =>{
    let desconnectUser = { userId: userId, createAt: Date.now()};
      if(desconnectUser){
        desconnectUsers.push(desconnectUser)
      }
  }
  const removeDesconnectUser =(userId:string) =>{
      desconnectUsers = desconnectUsers?.filter((user:any,ind:number) => user.userId !== userId);
  }
  
  // todo EMIT is emit a message and ON is grap from client
  
  io.on('connection', (socket:Socket) => {
    // console.log('A user connected');
    socket.on("publishedGig",(user,gig) =>{
     console.log(gig,"----------");
     
      // for (const item of publishedGig) {
      //       if(item.user._id === user._id){
      //           item.lengthPublished+=1;
      //           userExist = item;
      //       }
      // }

      const newPublished:UserPublished ={
         gig:gig,
         user:user,
         timePublished:Date.now,
      }

   
         publishedGig.push(newPublished);
      
      return io.send(user).emit('getpublished',publishedGig);

     
   })

   socket.on("getAllPublished",() =>{
    io.emit('AllPublished',publishedGig);
   })


  //  io.emit('getpublished',publishedGig);
    socket.on('setup', (user: any) => {
    });

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      removeDesconnectUser(userId);
      io.emit("getUsers", users,desconnectUsers);
    });
  
    socket.on('join chat', (chatId: string) => {
      socket.join(chatId);
    });
  
    socket.on("getAllNotifications",(userIdCurrent) =>{
      io.sockets.emit('AllNotifications',notification,userIdCurrent)
    })
    
    socket.on("TwoLaterRooms",(room:any) =>{
     notification = notification.filter((item:any,ind:number) =>item.conversationId.user._id !== room.user._id);
     io.sockets.emit('NewNotifications', { receiverId: room.user._id, notification: notification });
    // todo----i want to just add the 2 last room because when click
    // todo--- on the room and user click auther room must have a issue of messages will show the message of auther room in TwoLaterRooms
     if(TwoLaterRooms.length == 2){
        TwoLaterRooms = [];
        TwoLaterRooms.push(room._id)
        return;
     }
     TwoLaterRooms.push(room._id);

    })


    socket.on('typing',(room) =>{
      
       roomTyping = room;
       roomsInTyping.push(room._id)
      io.send(room._id).emit('typing',room,room._id)
      
    })
    socket.on('stop typing',(room) =>{
      io.send(room._id).emit('stop typing',room)
    });

    socket.on('new message', (message: any, receiverId: string,user:any) => {
   // todo----here i check if the room has typing is match with room of receiver and sender

        io.send(message.conversationId).emit('message received', message);
    //    };
       
      // todo---check the coversationId.id not have in array of notification will adding
      for (let index = 0; index < notification.length; index++) {
        if(notification[index].conversationId.id === message.conversationId && notification[index].conversationId.user._id === user._id ){
          // console.log(notification[index].conversationId.user ,user ,"check--------");
           notification[index].conversationId.lengthMessages.push(message.conversationId)
          console.log(notification)
          return io.send(receiverId).emit('notification', notification,message);
           
        }
      
    }
  
    
    const newNotification: Notification = {
      conversationId: {
        user:user,
        id: message.conversationId,
        lengthMessages: [message._id], // Assuming `message.c` is an array of strings
        receiverId:receiverId,
      },
    }
    notification.push(newNotification)
    io.send(receiverId).emit('notification', notification,message);
    
    });




    socket.on("disconnect", () => {
    let userDesconnect =  removeUser(socket.id);
    if(userDesconnect){
      addDesconnectUser(userDesconnect.userId);
    }
      
      io.emit("getUsers", users,desconnectUsers);
    });
  
  });
  

