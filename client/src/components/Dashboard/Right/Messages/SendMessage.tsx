import * as React from "react";
import Scrollable from "./Messages";
import { useSelector } from "react-redux";
import { useGlobalState } from "../../../../context/context";
// import Picker from 'emoji-picker-react';
// import 'react-emoji-picker/dist/index.css';;
import newRequest from "../../../../utils/newRequest";
import io from "socket.io-client";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPickerComponent from "./EmojiPickerComponent";
import { formatDistanceToNow } from 'date-fns';
// import ScrollableFeed from "react-scrollable-feed";
const endpoint = "http://localhost:5000";
var socket: any, selectedChatCompare:any; //todo----Replace with your backend server URL
interface IConversationMsgProps {}

interface EmojiPickerProps {
  onSelect: (emoji: any) => void;
}
const ConversationMsg: React.FunctionComponent<IConversationMsgProps> = (
  props
) => {
  const conversationRef = React.useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: any) => state.register);
  const [SocketConnected, setSocketConnected] = React.useState<any>(false);
  const [text, setText] = React.useState<any>("");
  const [showEmojis,setShowEmojis] = React.useState<boolean>(false);

  const [chosenEmoji, setChosenEmoji] = React.useState<any | null>(null); // Change the type to string
  const [desconnectUser,setDesconnectUser] = React.useState<any | null>(null);
  const {
    setNewMessage,
    conversationSelect,
    ConvMessages,
    setConvMessages,
    roomsInTyping,
    setRoomsInTyping,
    notification,
    setNotification,
    isTyping,
    setIsTyping,
    setMessageNotification,
    messageNotification,
    desconnectUsers,
  } = useGlobalState();



  React.useEffect(() => {
    // Scroll to the bottom of the conversation div
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  });


  React.useLayoutEffect(() => {
    if (conversationSelect) {
      socket.emit("join chat", conversationSelect._id);
    }
  }, [conversationSelect]);

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
      socket.emit("new message", newMessage, conversationSelect.user._id,user?.userData);
      socket.emit("TwoLaterRooms", conversationSelect,user?.userData);
      setMessageNotification([])
      setText("");
      console.log(AllMessages);
      setConvMessages((prev: any) => [...prev, newMessage]);
    } catch (error) {
      throw error;
    }
  };


 React.useEffect(()=>{
  socket = io(endpoint);
  socket.emit("setup", user);
  socket.on("connected", () => setSocketConnected(true));
  setTimeout(() => {
    setSocketConnected(false);
  }, 900);
 },[])

  // React.useEffect(() =>{
  //     console.log(SocketConnected);
      
  // },[SocketConnected])
  React.useEffect(() => {
    
    //todo---Listen for coming the room and roomsTyping from the server--//
  socket.on("typing", (room:any,roomsTyping:any) =>{
    // console.log(room,roomsTyping);
    if(room.user._id === user?.userData._id){   
      setRoomsInTyping(roomsTyping)
      }
  })
 //todo---Listen for coming the room and roomsTyping from the server--//
  socket.on("stop typing", (room:any) =>{
    if(room.user._id === user?.userData._id ){
      setRoomsInTyping(null)
      setIsTyping(false);
    }
  });
  },);

  React.useEffect(() =>{
    selectedChatCompare = conversationSelect;
    console.log(desconnectUsers);
    
    
    if(conversationSelect){
       setDesconnectUser(desconnectUsers.find((user:any,ind:number) => user.userId === conversationSelect.user._id));
    }
  },[conversationSelect])


React.useEffect(()=>{
   console.log(desconnectUsers);
   
},[desconnectUsers])

  React.useEffect(() => {
    
    // TODO---listen to coming the newMessageReceived from server to put it to receiver
    socket.on("message received", (newMessageReceived: any )=> {
     
      if (newMessageReceived.receiverId._id === user?.userData._id) {
           if(conversationSelect &&roomsInTyping && selectedChatCompare._id === newMessageReceived.conversationId){
            if (ConvMessages != null) {
              return  setConvMessages([...ConvMessages, newMessageReceived]);
            }
           }
        
      }
    });
  },[ConvMessages,roomsInTyping]);

 
  React.useEffect(()=>{
    console.log(messageNotification)
  },[messageNotification])


  const handleTyping = (e:any) =>{
    setText(e.target.value)
    socket.emit("typing", conversationSelect);
  }

  const handleStopTyping = (e:any) =>{
    socket.emit("stop typing", conversationSelect);
  }

  React.useEffect(() =>{
    console.log(conversationSelect);
    
  },[conversationSelect])

  return (
    <section className="h-full">
      <div className="py-2 px-6 h-[60px] border-b border-gray-300">
        
        {conversationSelect && (
          <div>
         {conversationSelect && <b>{`${conversationSelect.user.firstName} ${conversationSelect.user.lastName}`}</b>}
          { desconnectUser ?(
          <p className="opacity-60">
            {formatDistanceToNow(new Date(desconnectUser.createAt), { addSuffix: true })}
         </p>
        ):(
          <p className="opacity-60">active</p>
        )}
         </div>
        )} 
        
        
      </div>
      <section className="grid grid-cols-12">
        <article className="relative col-start-1 col-end-9 max-h-[20%]">

          <div className="h-[60vh]">
            {/* ---messages----- */}
            {/* ---messages----- */}
            <Scrollable />
          </div>
      <div className="relative">
        {showEmojis &&(
           <EmojiPickerComponent setText={setText} chosenEmoji={chosenEmoji} setChosenEmoji={setChosenEmoji} setShowEmojis={setShowEmojis} showEmojis={showEmojis}/>
        )}
         
          <form onSubmit={handleSubmit} className="flex w-full relative space-x-2 p-4">
      <span className="flex justify-start items-center opacity-60 transition-all duration-300 hover:cursor-pointer hover:opacity-100" onClick={() => setShowEmojis(!showEmojis)}>
      <BsEmojiSmile size={22}/>
      </span>
            {/* {!isTyping && <p className="absolute -top-4 left-2">typing...</p>} */}
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
        <article className="col-start-9 col-end-13 border border-gray-300">
          <div className="px-2 py-3 border-b border-gray-300">
            <p>Orders</p>
            <p className=" underline">Past Orders(10)</p>
          </div>

          <div className=" space-y-8 p-4 h-full">
            <b>About</b>

            <div className="flex flex-col items-center text-center">
              <img
                className="w-[50px] h-[50px] object-cover rounded-full"
                src="https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg"
                alt=""
              />
              <b>Said Bifalan</b>
              <p>Returning Buyer</p>
            </div>
            <section>
              <div className="flex justify-between items-center">
                <b>From</b>
                <p>casa</p>
              </div>
              <div className="flex justify-between items-center">
                <b>English</b>
                <p>Level Unspecified</p>
              </div>
            </section>
          </div>
        </article>
      </section>
    </section>
  );
};

export default ConversationMsg;
