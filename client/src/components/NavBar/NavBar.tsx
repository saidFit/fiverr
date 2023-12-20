import * as React from "react";
import { MdBusinessCenter } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { IoIosMan, IoIosNotificationsOutline } from "react-icons/io";
import {TiMessages} from 'react-icons/ti'
import { AiOutlineMenuFold } from "react-icons/ai";
import UseMediaQuery from "../../Hooks/UseMediaQuery";
import Popup from "./Popup";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { menu } from "../../data/data";
import UseCustomLine from "../../Hooks/UseCustomLine";
import Cookies from "js-cookie";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import useRopen from "../../Hooks/UseRopen";
import newRequest from "../../utils/newRequest";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { LogoutAction } from "../../redux/actions/auth";
import { useGlobalState } from "../../context/context";

interface INavBarProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  Active: boolean;
  user: any;
  usersOline: string[];
}

type Data = {
  name: string;
  email: string;
};
interface State {
  register: {
    user: any;
  };
}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  const {setMessageUser,setIsSame,conversations,setconversationSelect,settypeClick,notification,usersOline} = useGlobalState()
  // todo------state-------------//
  const { user } = useSelector((state: State) => state.register);
  // todo--------variables--------//
  const navigate = useNavigate()
  const { setActive, Active } = props;
  const IsBigMedia = UseMediaQuery("(min-width: 768px)");
  const [IsClick, setIsClick] = useState<boolean>(false);
  const dispatch: Dispatch<any> = useDispatch();
  const { pathname } = useLocation();
  const popup = React.useRef<HTMLDivElement>(null);
  const popup1 = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [open1, setOpen1] = React.useState<boolean>(false);
  const [IsLogin, setIsLogin] = React.useState<boolean>(false);
  const [notificationOfUser,setNotificationOfUser] = useState<any[]>([])
  const { handle } = useRopen();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleGithubLogin = async () => {
    window.open(
      "http://localhost:5000/auth/github",
      "_self",
      "width=500,height=600"
    );
  };

  const handleGoogleLogin = async () => {
    setIsLogin(true);
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleJoin = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  React.useEffect(() => {
    handle(popup, setOpen);
    handle(popup, setOpen1);

  });

  const handleLogoutUser = async (
    e: any,
    callback: () => Promise<string | undefined>
  ) => {
    setOpen(!open);
    await callback();
    navigate('/')
  };

  React.useLayoutEffect(()=>{
   console.log(notification);
   console.log(notificationOfUser);
   setNotificationOfUser(notification.filter((item:any) => item.conversationId.receiverId === user?.userData._id))
  },[notification])
  const Logout = async (): Promise<string | undefined> => {
    localStorage.clear();
    dispatch(LogoutAction());
    try {
      const { data } = await newRequest.get("/auth/logout");

      return data;
    } catch (error) {
      // Handle error appropriately
      throw error;
    }
  };


  const handleSelectRoom = (item:any) =>{
    setOpen1(!open1);
    console.log(item.conversationId.user);
    navigate("/Dashboard");
    settypeClick('Messages');
    setIsSame(1);
    setMessageUser(item.conversationId.user )
  }

  const handleSlctOfStBar = (to:string,exactPath:string,ind:number) =>{
    setOpen(!open);
    navigate(to);
    settypeClick(exactPath);
    setIsSame(ind)
  }
  const handleMoveToMessages = () =>{
    setOpen(!open);
    navigate("/Dashboard");
    settypeClick('Messages');
  }

  return (
    <div
      className={`bg-green-950 z-40 ${
        Active && pathname ? "avtiv-nav" : "text-white"
      }`}
    >
      <section className="container px-4 py-3 mx-auto">
        <div className="flex justify-between items-center">
          <Link to={"/"} className="h1">
            fiverr.
          </Link>
          {IsBigMedia && (
            <div className="space-x-4 flex items-center">
              <button className="btn-parent">
                <p className="font-[700]">Business</p>
                <UseCustomLine color={"bg-green-400"} />
              </button>
              <button className="btn-parent">
                <p className="font-[700]">Explore</p>
                <UseCustomLine color={"bg-green-400"} />
              </button>
              <button className="btn-parent">
                <p className="font-[700]">English</p>
                <UseCustomLine color={"bg-green-400"} />
              </button>
              <button className="btn-parent">
                <p className="font-[700]">Become a Seller</p>
                <UseCustomLine color={"bg-green-400"} />
              </button>
              <button className="btn-parent">
                <p className="font-[700]">Sign in</p>
                <UseCustomLine color={"bg-green-400"} />
              </button>
              {user ? (
                <div
                  ref={popup}
                  className="relative flex items-center space-x-3"
                >
                  <p>welcome {user?.userData.firstName}</p>
                {/*//TODO-------------notification & messages--------------- */}
                {/*//TODO-------------notification & messages--------------- */}
                  <button
                    type="button"
                    className="relative inline-flex items-center"
                  >
                    <span className="opacity-60">
                     <IoIosNotificationsOutline size={25}/> 
                    </span>
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                      8
                    </div>
                  </button>

                  <button
                    type="button"
                    className="relative inline-flex items-center"
                  >
                    <span onClick={()=>setOpen1(!open1)} className="opacity-60">
                     <TiMessages size={25}/> 
                    </span>
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                      {notificationOfUser && notificationOfUser.length}
                    </div>

                  {open1 && 
                  <div className="border border-gray-300 z-50 rounded-lg absolute top-10 -right-8 w-[190px] bg-white shadow-MyBox h-[180px]">
                    <span className="flish2"></span>
                      {notificationOfUser?.length > 0 ?(
                        <div>
                          {notificationOfUser.map((item,ind) =>{
                            const {conversationId:{user:{firstName,_id,img,lastName,background},id,receiverId,lengthMessages }} = item;
                            // console.log(firstName);
                            
                             return(
                             
               <div key={ind} onClick={()=>handleSelectRoom(item)} className="flex w-full relative gap-2 items-center transition-all duration-200 hover:bg-green-200  p-2 border-b  border-gray-300">
                                   {!img ? (
                  <span className="relative w-fit">
                    <b
                      style={{ background: background }}
                      className={`flex justify-center w-10 h-10 items-center object-cover rounded-full`}
                    >
                      {`${firstName} ${lastName}`.substring(0, 1).toUpperCase()}
                    </b>
                    {usersOline.includes(_id) ? (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                    ) : (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                    )}
                  </span>
                ) : (
                  <div className="relative w-fit">
                    <img
                      className="flex justify-center flex-auto w-10 h-10 items-center object-cover rounded-full"
                      src={img}
                      alt=""
                    />
                    {usersOline.includes(_id) ? (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                    ) : (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                    )}
                  </div>
                )}
                   <div className="text-black flex items-center gap-1">
                     <div className="space-x-1">
                      <b>{firstName}</b>
                      <span className="p">sent to you</span>
                     </div>
                     <p className="bg-red-500 flex items-center justify-center rounded-full w-5 h-5 text-white">{lengthMessages.length}</p>
                     </div>
                      </div>
                             )
                          })}
                        </div>
                      ):(
                         
                        <p className="text-black">no message yet</p>
                      )}
                  </div>
                  }  
                  </button>

                  <>
                    {user?.userData.img && props.usersOline ? (
                      <div
                        className="relative cursor-pointer"
                        onClick={() => setOpen(!open)}
                      >
                        <img
                          className="w-12 h-12 object-cover rounded-full"
                          src={user?.userData.img}
                          alt=""
                        />
                        {props.usersOline?.includes(user?.userData._id) ? (
                          <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                        ) : (
                          <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                        )}
                      </div>
                    ) : (
                      <div
                        className="relative cursor-pointer"
                        onClick={() => setOpen(!open)}
                      >
                        <button
                          style={{ background: user?.userData.background }}
                          className={`flex justify-center items-center w-[40px] h-[40px] object-cover rounded-full`}
                        >
                          {user?.userData.firstName
                            .substring(0, 1)
                            .toUpperCase()}
                        </button>
                        {props.usersOline?.includes(user?.userData._id) ? (
                          <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                        ) : (
                          <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                        )}
                      </div>
                    )}
                  </>

                  {open && (
                    <div className="absolute top-12 right-4 z-40 w-full rounded-md bg-green-600 shadow-md">
                      <Link to={'/Gigs'}>
                       <button
                        onClick={() => setOpen(!open)}
                        className="py-2 w-full text-start px-3 transition-colors duration-300 hover:bg-green-400"
                      >
                        Gigs
                      </button>
                      </Link>
                     
                      <Link to={"/Dashboard"}>
                        <button
                          onClick={() => handleSlctOfStBar('Dashboard','Gigs',3)}
                          className="py-2 w-full text-start px-3 transition-colors duration-300 hover:bg-green-400"
                        >
                          Add New Gig
                        </button>
                      </Link>

                      <button
                        onClick={handleMoveToMessages}
                        className="py-2 w-full text-start px-3 transition-colors duration-300 hover:bg-green-400"
                      >
                        Messages
                      </button>
                      <button
                        onClick={(e) => handleLogoutUser(e, Logout)}
                        className="py-2 w-full text-start px-3 transition-colors duration-300 hover:bg-green-400"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div ref={popup} className=" relative flex space-x-3">
                  <button
                    onClick={handleJoin}
                    className="border border-gray-300 rounded-md px-4 py-2 transition-all duration-300 hover:text-white hover:bg-green-400"
                  >
                    Join
                  </button>
                  {open && (
                    <div className="absolute top-12 right-4 z-40 w-[170px] rounded-md bg-green-600 shadow-md">
                      <Link to={"/Auth"}>
                        <button
                          onClick={() => setOpen(!open)}
                          className="py-3 w-full text-start px-5 transition-colors duration-300 hover:bg-green-400 hover:rounded-md"
                        >
                          Register
                        </button>
                      </Link>

                      <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex justify-center items-center dark:focus:ring-[#4285F4]/55"
                      >
                        <svg
                          className="w-4 h-4 mr-2 -ml-1"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="google"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 488 512"
                        >
                          <path
                            fill="currentColor"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                          ></path>
                        </svg>
                        Sign in with Google
                      </button>
                    </div>
                  )}
                  {/* <button onClick={handleLogout} className='border border-gray-300 rounded-md px-4 py-2 transition-all duration-300 hover:text-white hover:bg-green-400'>log out</button> */}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      {Active && pathname && IsBigMedia && (
        <div className="text-sm border-t border-gray-300 py-1">
          <div className="container mx-auto flex space-x-10 flex-wrap py-1 items-center">
            {menu[0].options.map((item, ind) => {
              return (
                <div key={ind} className="btn-parent">
                  <Link
                    className="opacity-50 transition-all duration-500 hover:opacity-90"
                    to="/"
                  >
                    {item}
                  </Link>
                  <UseCustomLine color={"bg-green-400"} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!IsBigMedia && (
        <div className="fixed z-30 bottom-0 left-0 space-x-3 text-black border py-2 border-gray-300 shadow-MyBox bg-gray-200 right-0 flex justify-evenly items-center px-0">
          <div className="flex flex-col items-center space-y-1">
            <span className="opacity-70">
              <MdBusinessCenter size={22} />
            </span>
            <button className="text-sm opacity-60 font-serif">Business</button>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <span className="opacity-70">
              <MdExplore size={22} />
            </span>
            <button className="text-sm opacity-60 font-serif">Explore</button>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <span className="opacity-70">
              <GrLanguage size={22} />
            </span>
            <button className="text-sm opacity-60 font-serif">English</button>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <span className="opacity-70">
              <IoIosMan size={22} />
            </span>
            <button className="text-sm opacity-60 font-serif">Seller</button>
          </div>

          <div
            onClick={() => setIsClick(() => !IsClick)}
            className="flex border border-gray-400 rounded-md p-2 space-x-2 items-center space-y-1"
          >
            <span className="opacity-70">
              <AiOutlineMenuFold size={22} />
            </span>
            <button className="text-sm opacity-60 font-serif">menu</button>
          </div>
        </div>
      )}

      {IsClick && <Popup IsClick={IsClick} setIsClick={setIsClick} />}
    </div>
  );
};

export default NavBar;
