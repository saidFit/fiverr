import * as React from "react";
import { BiSearch } from "react-icons/bi";
import { Conversations } from "../../../../data/data";
import { getRandomColor } from "../../../../Hooks/UseLogic";
import { useGlobalState } from "../../../../context/context";
import newRequest from "../../../../utils/newRequest";
import { useSelector } from "react-redux";
import io from "socket.io-client";
const endpoint = "http://localhost:5000";
let socket: any;

interface IListCoversationsProps {}

const ListCoversations: React.FunctionComponent<IListCoversationsProps> = (
  props
) => {
  const {
    conversations,
    notification,
    setNotification,
    roomsInTyping,
    loading,
    conversationSelect,
    usersOline,
    setLoading,
    setconversationSelect,
    ConvMessages,
    setConvMessages,
    messageUser,
    desconnectUsers
  } = useGlobalState();
  const { user } = useSelector((state: any) => state.register);

  React.useEffect(() => {
    socket = io(endpoint);
  }, []);

  React.useEffect(() => {
    if (messageUser) {
      for (const conversation of conversations) {
        if (conversation.user._id === messageUser._id) {
          //TODO---function might return a promise,that si why using async--//
          (async () => {
            await handleSelectConv(conversation._id, conversation);
            setconversationSelect(conversation);
          })();
          break; // Exit the loop once the conversation is found
        }
      }
    }
  }, [messageUser, conversations]);
  

  const handleSelectConv = async (id: string, item: any) => {
    // TODO--add new room to check them with roomTyping---//
    console.log(id,item);
    
    socket.emit("TwoLaterRooms", item,user?.userData);
    setconversationSelect(item);
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data: messages } = await newRequest.get(
        `/coversation/getAllConvMessages/${id}`,
        config
      );
      setConvMessages(messages);
      console.log(messages);
    } catch (error) {
      throw error;
    }

    setLoading(false);
  };


  React.useEffect(()=>{
    
    socket.on("NewNotifications", (notification: any) => {
      // if (notification.receiverId === user.userData._id) {
            setNotification(notification.notification);
      // }


    });
    // return () => {
    //   socket.disconnect();
    // };
  },)

  return (
    <section>
      <div className="flex items-center border-b justify-between border-gray-300 p-3">
        <select
          id="countries"
          className="bg-gray-200 p-3 outline-none cursor-pointer transition-all duration-300 hover:bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg "
        >
          <option value="Choose a country">Choose a country</option>
          <option value="All Convesations">All Convesations</option>
          <option value="Woman">Woman</option>
          <option value="mal">mal</option>
          <option value="Store">Store</option>
        </select>
        <button className="opacity-70 transition-opacity duration-300 hover:opacity-100">
          <BiSearch size={25} />
        </button>
      </div>

      <article>
        {conversations?.map((item: any, ind: any) => {
          const {
            binary,
            _id: convId,
            readByReceiver,
            readBySender,
            user: { firstName, img, isSeller, lastName, _id, background },
          } = item;
          const convNotification = notification.find(
            (element: any, ind: number) =>
              element?.conversationId.id === convId &&
              element?.conversationId.user._id === _id
          );

          return (
            usersOline && (
              <div
                onClick={() => handleSelectConv(convId, item)}
                key={ind}
                className={`flex w-full relative gap-3 justify-between items-center py-3 px-4 border-b  border-gray-300 transition-all duration-150 hover:bg-green-200 ${
                  item === conversationSelect ? "bg-green-200" : null
                } cursor-pointer`}
              >
                 {/* <div className="absolute w-4 right-2 top-2 bg-red-500 text-white text-xs rounded-full px-2 py-1"></div> */}
                {notification.length != 0 && convNotification && (
                  <div className="absolute right-2 top-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {convNotification?.conversationId.lengthMessages.length}
                  </div>
                )}

                {!img ? (
                  <span className="relative">
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
                  <div className="relative">
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
                <div className="flex-1">
                  {`${firstName}-${lastName}`.length > 12 ? (
                    <b>{`${firstName} ${lastName}`.substring(0, 11)}...</b>
                  ) : (
                    <b>{`${firstName} ${lastName}`}</b>
                  )}
                  {roomsInTyping?.includes(convId) ? (
                    <p>typing...</p>
                  ) : (
                    <p>Me:Hey,no,Sorry</p>
                  )}
                </div>
                <div className="flex-auto">
                  <p className="opacity-60">12h</p>
                </div>
              </div>
            )
          );
        })}
      </article>
    </section>
  );
};

export default ListCoversations;
