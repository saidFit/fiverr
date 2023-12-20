import * as React from "react";
import {
  BrowserRouter as Wrapper,
  Routes,
  Route,
  json,
  Navigate,
} from "react-router-dom";

import Home from "./screens/Home";
import NavBar from "./components/NavBar/NavBar";
import Gigs from "./screens/Gigs";
import SingleGig from "./screens/SignleGig";
import Footer from "./components/Footer/Footer";
import Dashboard from "./screens/Dashboard";
import axios from "axios";
import Auth from "./screens/Auth";
import { useDispatch, useSelector } from "react-redux";
import { AuthGoogle } from "./redux/actions/auth";
import { Dispatch } from "redux";
import { GetAllGigsAction } from "./redux/actions/gig";
import newRequest from "./utils/newRequest";
import { REGISTER } from "./redux/constant/constant";
import { useGlobalState } from "./context/context";
import Payement from "./screens/Payement";
import io from "socket.io-client";
const endpoint = "http://localhost:5000";
let socket: any;
export interface IAppProps {}

interface User {
  country: string;
  createdAt: string;
  desc: string;
  email: string;
  firstName: string;
  updatedAt: string;
  lastName: string;
  _id: string;

  // Add more properties as per your user data structure
}
export function App(props: IAppProps) {
  const {
    setUserOline,
    setNotificationEvent,
    isValidInsertGig,
    setIsValidInsertGig,
    ConvMessages,
    setDesconnectUsers,
    setNotification,
    messageNotification,
    setMessageNotification,
    usersOline,
    setIsTyping,
    setRoomsInTyping,
    roomsInTyping,
  } = useGlobalState();

  const [Active, setActive] = React.useState<boolean>(false);
  const { setcoversations } = useGlobalState();
  const { user } = useSelector((state: any) => state.register);
  const dispatch: Dispatch<any> = useDispatch();
  React.useEffect(() => {
    const userlocal: User | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );
    dispatch({ type: REGISTER, payload: userlocal });
  }, []);

  const FetchAllOwnCovrsations = async (): Promise<any[]> => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await newRequest.get(
        "/coversation/getAllOwnCoversation",
        config
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    // Dispatch AuthGoogle action
    dispatch(AuthGoogle());
    const grapData = async () => {
      try {
        dispatch(GetAllGigsAction());
        // Fetch all own conversations
        const conversations = await FetchAllOwnCovrsations();
        setcoversations(conversations);
      } catch (error) {
        // Handle error if any
        console.error(error);
      }
    };
    if (user) {
      grapData();
    }
  }, [user]);

  React.useEffect(() => {
    socket = io(endpoint);
    socket.emit("addUser", user?.userData._id);
    socket.on("getUsers", (users: any, desconnectUsers: any) => {
      console.log(desconnectUsers);
      console.log(users);

      setDesconnectUsers(desconnectUsers);
      setUserOline(users.map((user: any) => user.userId));
    });
  }, [user]);

  React.useEffect(() => {
    // TODO---listen for coming the Notification---//
    socket.on("notification", (newMessage: any, newMessageReceived: any) => {
      if (newMessageReceived.receiverId._id === user?.userData._id) {
        console.log(newMessage[0].conversationId.lengthMessages);
        setMessageNotification([]);
        setNotification([]);
        for (let index = 0; index < newMessage.length; index++) {
          setNotification((prev: any) => [...prev, newMessage[index]]);
          setMessageNotification((prev: any) => [
            ...prev,
            ...newMessage[index]?.conversationId.lengthMessages,
          ]);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [ConvMessages, roomsInTyping]);

  React.useEffect(() => {
    socket.emit("getAllNotifications", user?.userData._id);
    socket.on("AllNotifications", (notification: any, userId: any) => {
      setMessageNotification([]);
      setNotification([]);
      setNotification(notification);
      if (notification.length != 0 && userId === user?.userData._id) {
        for (let index = 0; index < notification.length; index++) {
          if (
            !messageNotification.includes(
              notification[index]?.conversationId.lengthMessages
            )
          ) {
            setMessageNotification((prev: any) => [
              ...prev,
              ...notification[index]?.conversationId.lengthMessages,
            ]);
          }
        }
      }
    });
  }, []);

  React.useEffect(() => {
    socket.on("getpublished", (published: any) => {
      console.log(published);
    });
  }, [isValidInsertGig]);

  // React.useEffect(() => {
  //   socket.on("getpublished", (published: any) => {
  //     //  if()

  //     console.log(published);
  //     setNotificationEvent(published);
  //   });
  // });
    
   
 
  React.useEffect(() => {
    socket.emit("getAllPublished");
    socket.on("AllPublished", (publiched: any) => {
      console.log(publiched);
      setNotificationEvent(publiched);
    });
  }, []);

  return (
    <div className="app">
      <Wrapper>
        <NavBar
          usersOline={usersOline}
          user={user}
          Active={Active}
          setActive={setActive}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Auth"
            element={!user ? <Auth /> : <Navigate to="/" />}
          />
          <Route path="/Gigs" element={user ? <Gigs /> : <Navigate to="/" />} />
          <Route
            path={`/Gig/:id`}
            element={user ? <SingleGig Active={Active} /> : <Navigate to="/" />}
          />
          <Route
            path="/Dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route path="/Payement" element={<Payement />} />
        </Routes>
        <Footer />
      </Wrapper>
    </div>
  );
}
