import * as React from "react";
import { useGlobalState } from "../../context/context";
import newRequest from "../../utils/newRequest";
import { useSelector } from "react-redux";
import Scrollable from "../Dashboard/Right/Messages/Messages";
import EmojiPickerComponent from "../Dashboard/Right/Messages/EmojiPickerComponent";
import { BsEmojiSmile } from "react-icons/bs";
import io from "socket.io-client";
import { IoIosClose } from "react-icons/io";
import { formatDistanceToNow } from 'date-fns';
interface IUserContactProps {
  SingleGigg: any;
}

interface Position {
  x: number;
  y: number;
}
const endpoint = "http://localhost:5000";
var socket: any, selectedChatCompare: any;
const UserContact: React.FunctionComponent<IUserContactProps> = (props) => {
  const {
    conversations,
    setNotification,
    roomsInTyping,
    loading,
    conversationSelect,
    usersOline,
    setLoading,
    setconversationSelect,
    ConvMessages,
    setMessageNotification,
    setNewMessage,
    setRoomsInTyping,
    setIsTyping,
    setConvMessages,
    desconnectUsers,
    setDesconnectUsers,
  } = useGlobalState();
  const [PickSingleGig, setPickSingleGig] = React.useState<any>(
    props?.SingleGigg[0]
  );
  const wrapper  = React.useRef<HTMLDivElement>(null);
  const header   = React.useRef<HTMLDivElement>(null);
  const [showMessages, setShowMessages] = React.useState<boolean>(false);
  const { user } = useSelector((state: any) => state.register);
  const [SocketConnected, setSocketConnected] = React.useState<any>(false);
  const [text, setText] = React.useState<any>("");
  const [chosenEmoji, setChosenEmoji] = React.useState<any | null>(null);
  const [showEmojis, setShowEmojis] = React.useState<boolean>(false);
  const [desconnectUser,setDesconnectUser] = React.useState<any | null>(null);

  // const {
  //   userId: { firstName, img, lastName, _id, background },
  // } = PickSingleGig;


  React.useEffect(()=>{
    if(desconnectUsers){

      setDesconnectUser(desconnectUsers.find((user:any,ind:number) => user.userId === PickSingleGig?.userId?._id));
    }
  },[desconnectUsers])


  React.useEffect(() => {
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });


    socket = io(endpoint);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    setTimeout(() => {
      setSocketConnected(false);
    }, 900);
  }, []);

  const handleSelectConv = async () => {
    // TODO--add new room to check them with roomTyping---//
    // socket.emit("TwoLaterRooms", item,user?.userData);
    setShowMessages(!showMessages);
    const room = conversations.find((item: any) => item.user._id === PickSingleGig?.userId?._id);
    setconversationSelect(room);
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data: messages } = await newRequest.get(
        `/coversation/getAllConvMessages/${room?._id}`,
        config
      );
      setConvMessages(messages);
    } catch (error) {
      throw error;
    }

    setLoading(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setNewMessage("");
      const {
        data: { newMessage, AllMessages },
      } = await newRequest.post(
        `/coversation/SendMessage/${conversationSelect._id}`,
        {
          senderId: user?.userData._id,
          receiverId: conversationSelect.user._id,
          text,
        },
        config
      );
      socket.emit(
        "new message",
        newMessage,
        conversationSelect.user._id,
        user?.userData
      );
      socket.emit("TwoLaterRooms", conversationSelect, user?.userData);
      setMessageNotification([]);
      setText("");

      setConvMessages((prev: any) => [...prev, newMessage]);
    } catch (error) {
      throw error;
    }
  };

  const handleTyping = (e: any) => {
    setText(e.target.value);
    socket.emit("typing", conversationSelect);
  };

  const handleStopTyping = (e: any) => {
    socket.emit("stop typing", conversationSelect);
  };

  React.useEffect(() => {
    //todo---Listen for coming the room and roomsTyping from the server--//
    socket.on("typing", (room: any, roomsTyping: any) => {;
      if (room.user?._id === user?.userData?._id) {
        setRoomsInTyping(roomsTyping);
      }
    });
    //todo---Listen for coming the room and roomsTyping from the server--//
    socket.on("stop typing", (room: any) => {
      if (room.user?._id === user?.userData?._id) {

        setRoomsInTyping(null);
        setIsTyping(false);
      }
    });
  });

  React.useEffect(() => {
    selectedChatCompare = conversationSelect;
  }, [conversationSelect]);

  React.useEffect(() => {
    // TODO---listen to coming the newMessageReceived from server to put it to receiver
    socket.on("message received", (newMessageReceived: any) => {
      if (newMessageReceived.receiverId._id === user?.userData._id) {
        if (
          conversationSelect &&
          roomsInTyping &&
          selectedChatCompare._id === newMessageReceived.conversationId
        ) {
          if (ConvMessages != null) {
            return setConvMessages([...ConvMessages, newMessageReceived]);
          }
        }
      }
    });
  }, [ConvMessages, roomsInTyping]);

  React.useEffect(() => {
    socket.on("NewNotifications", (notification: any) => {
      // if (notification.receiverId === user.userData._id) {
      setNotification(notification.notification);
      // }
    });
  });

 
  const popupRef = React.useRef<HTMLDivElement>(null);


  

  return (
    <section>
      <div
        onClick={handleSelectConv}
        className="bg-white fixed rounded-full py-3 pr-7 pl-2 shadow-MyBox1 z-30 bottom-9 left-9 cursor-pointer transition-all duration-200 hover:bg-green-100"
      >
        <div className="flex w-full space-x-3 relative gap-2 items-center ">
          {!PickSingleGig?.userId?.img ? (
            <span className="relative w-fit">
              <b
                style={{ background: PickSingleGig?.userId?.background }}
                className={`flex justify-center w-10 h-10 items-center object-cover rounded-full`}
              >
                {`${PickSingleGig?.userId?.firstName} ${PickSingleGig?.userId?.lastName}`.substring(0, 1).toUpperCase()}
              </b>
              {usersOline?.includes(PickSingleGig?.userId?._id) ? (
                <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
              ) : (
                <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
              )}
            </span>
          ) : (
            <div className="relative w-fit">
              <img
                className="flex justify-center flex-auto w-10 h-10 items-center object-cover rounded-full"
                src={PickSingleGig?.userId?.img}
                alt=""
              />
              {usersOline?.includes(PickSingleGig?.userId?._id) ? (
                <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
              ) : (
                <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
              )}
            </div>
          )}
          <div>
            <b>Message {`${PickSingleGig?.userId?.firstName} ${PickSingleGig?.userId?.lastName}`}</b>
            {!usersOline?.includes(PickSingleGig?.userId?._id) ? (
              <div className="flex space-x-2 items-center">
               <p className="p">away</p> 
             {desconnectUser && 
             <p className="opacity-60">
            {formatDistanceToNow(new Date(desconnectUser.createAt), { addSuffix: true })}
              </p>
             }  
              </div>
              
            ) : (
              <p className="p">active</p>
            )}
          </div>
        </div>
      </div>
      {/* ------show messages--------- */}
      {showMessages && (
        <div
        ref={popupRef}
        // 
        className="bg-white popup h-[88%] fixed z-40 bottom-9 left-9 w-full shadow-MyBox1 max-w-[430px] rounded-lg">
          <div
          className="flex header w-full space-x-2 relative gap-2 items-center p-6 border-b border-gray-300">
            {!PickSingleGig?.userId?.img ? (
              <span className="relative w-fit">
                <b
                  style={{ background: PickSingleGig?.userId?.background }}
                  className={`flex justify-center w-10 h-10 items-center object-cover rounded-full`}
                >
                  {`${PickSingleGig?.userId?.firstName} ${PickSingleGig?.userId?.lastName}`.substring(0, 1).toUpperCase()}
                </b>
                {usersOline?.includes(PickSingleGig?.userId?._id) ? (
                  <span className="bottom-0 left-10 absolute w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
                ) : (
                  <span className="bottom-0 left-10 absolute w-4 h-4 bg-gray-400 border-1 border-white rounded-full"></span>
                )}
              </span>
            ) : (
              <div className="relative w-fit">
                <img
                  className="flex justify-center flex-auto w-14 h-14 items-center object-cover rounded-full"
                  src={PickSingleGig?.userId?.img}
                  alt=""
                />
                {usersOline?.includes(PickSingleGig?.userId?._id) ? (
                  <span className="bottom-0 left-10 absolute  w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
                ) : (
                  <span className="bottom-0 left-10 absolute  w-4 h-4 bg-gray-400 border-1 border-white rounded-full"></span>
                )}
              </div>
            )}
            <div>
              <b className=" opacity-60 text-lg">
                Message {`${PickSingleGig?.userId?.firstName} ${PickSingleGig?.userId?.lastName}`}
              </b>
              {!usersOline?.includes(PickSingleGig?.userId?._id) ? (

                <div className="flex space-x-2 items-center">
                <p className="p">away</p> 
                {desconnectUser && 
                <p className="opacity-60">Last seen {formatDistanceToNow(new Date(desconnectUser.createAt), { addSuffix: true })}
                </p>
                }  
                </div>
              ) : (
                <>
                <p className="p">active</p>
                {roomsInTyping?.includes(conversations.find((item:any,ind:number) => item?.user?._id === PickSingleGig?.userId?._id)._id) && (
                    <p>typing...</p>)}

                </>
                
              )}
            </div>

            <span
              onClick={() => setShowMessages(!showMessages)}
              className="absolute opacity-40 cursor-pointer top-4 right-4"
            >
              <IoIosClose size={34} />
            </span>
          </div>

          <article className="relative col-start-1 col-end-9 max-h-[20%]">
            <div className="h-[60vh]">
              {/* ---messages----- */}
              {/* ---messages----- */}
              <Scrollable />
            </div>
            <div className="relative">
              {showEmojis && (
                <EmojiPickerComponent
                  setText={setText}
                  chosenEmoji={chosenEmoji}
                  setChosenEmoji={setChosenEmoji}
                  setShowEmojis={setShowEmojis}
                  showEmojis={showEmojis}
                />
              )}

              <form
                onSubmit={handleSubmit}
                className="flex w-full relative space-x-2 p-4"
              >
                <span
                  className="flex justify-start items-center opacity-60 transition-all duration-300 hover:cursor-pointer hover:opacity-100"
                  onClick={() => setShowEmojis(!showEmojis)}
                >
                  <BsEmojiSmile size={22} />
                </span>
                <input
                  onChange={handleTyping}
                  onBlur={handleStopTyping}
                  value={text}
                  className="flex-auto border border-gray-300 rounded-sm outline-none bg-gray-50 py-2 px-4"
                  type="text"
                  placeholder="Create an Offer"
                />

                <button className="text-green-500">Send</button>
              </form>
            </div>
          </article>
        </div>
      )}
    </section>
  );
};

export default UserContact;
