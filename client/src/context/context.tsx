import React, { createContext, useState, useContext } from "react";
// import { FiverrContextState } from "./types";





//todo----that defines the shape of the context state-----//
type FiverrContextState={
  typeClick:string,
  settypeClick:React.Dispatch<React.SetStateAction<string>>,
  IsSame:number | null,
  setIsSame:React.Dispatch<React.SetStateAction<number | null>>
  conversations:any | null,
  setcoversations:React.Dispatch<any>
  conversationSelect:any | null,
  setconversationSelect: React.Dispatch<any>
  ConvMessages:any | null,
  setConvMessages:React.Dispatch<any>,
  loading:boolean,
  setLoading:React.Dispatch<React.SetStateAction<boolean>>,
  newMessage:string,
  setNewMessage:React.Dispatch<React.SetStateAction<string>>,
  usersOline:any,
  setUserOline:React.Dispatch<any>,
  roomsInTyping:any |null,
  setRoomsInTyping :React.Dispatch<React.SetStateAction<any|null>>,
  isTyping:boolean,
  setIsTyping:React.Dispatch<React.SetStateAction<boolean>>,
  notification: any[] | [];
  setNotification: React.Dispatch<React.SetStateAction<any[] | []>>;
  messageNotification:string[],
  setMessageNotification:React.Dispatch<React.SetStateAction<string[]>>,
  messageUser:any,
  setMessageUser:React.Dispatch<any>,
  desconnectUsers:any,
  setDesconnectUsers:React.Dispatch<any>,
  isValidInsertGig:boolean,
  setIsValidInsertGig:React.Dispatch<React.SetStateAction<boolean>>,
  notificationEvent:any[] | null,
  setNotificationEvent:React.Dispatch<React.SetStateAction<any[] | null>>,
}




//todo----constant defines the default values for the context state-----//
const contextDefaultValues: FiverrContextState = {
  typeClick:'Dashboard',
  settypeClick: () => {}, // placeholder value for the Dispatch setter
  IsSame:0,
  setIsSame: () => {},
  conversations:null,
  setcoversations:() => {},
  conversationSelect:null,
  setconversationSelect:() =>{},
  ConvMessages:null,
  setConvMessages:() => {},
  loading:false,
  setLoading:() => {},
  newMessage:'',
  setNewMessage:() =>{},
  usersOline:null,
  setUserOline:() =>{},
  roomsInTyping:[],
  setRoomsInTyping:() =>{},
  isTyping:false,
  setIsTyping:() => {},
  notification:[],
  setNotification:() =>{},
  messageNotification:[],
  setMessageNotification:()=>{},
  messageUser:null,
  setMessageUser:()=>{},
  desconnectUsers:null,
  setDesconnectUsers:()=>{},
  isValidInsertGig:false,
  setIsValidInsertGig:()=>{},
  notificationEvent:null,
  setNotificationEvent:()=>{},


};



//todo----variable creates a new context using the createContext function from React. It takes FiverrContextState as the generic type and contextDefaultValues as the default value.-----//
export const FiverrContext = createContext<FiverrContextState>(
  contextDefaultValues
);




//todo----component is a React functional component that acts as a provider for the FiverrContext. It takes a single prop "children" which represents the child components that will have access to the context(that means the components that App has them).-----//
export const FiverrProvider:React.FC<{ children: React.ReactNode }> = ({children}) => {
  // TODO----chatMessages------//
  const [loading,setLoading] = useState<boolean>(false);
  const [conversations,setcoversations] = React.useState<any | null>(contextDefaultValues.conversations)
  const [conversationSelect,setconversationSelect] = useState<any | null>(null);
  const [ConvMessages,setConvMessages] = useState<any>(null);
  const [usersOline,setUserOline] = useState<any>(null);
  const [desconnectUsers,setDesconnectUsers] = useState<any>(null);
  const [newMessage,setNewMessage] = useState<string>('');
  const [roomsInTyping,setRoomsInTyping] = React.useState<any | null>(null);
  const [notification,setNotification] = React.useState<any[] | []>([])
  const [messageNotification,setMessageNotification] = useState<string[]>([])
  const [isTyping,setIsTyping] = useState<boolean>(false)
  const [typeClick,settypeClick] = React.useState<string>(contextDefaultValues.typeClick)
  const [IsSame,setIsSame]           = React.useState<number | null>(contextDefaultValues.IsSame);
  const [messageUser,setMessageUser] = useState<any | null>(null);
  const [isValidInsertGig,setIsValidInsertGig] = useState<boolean>(false);
  const [notificationEvent,setNotificationEvent] = useState<any[] | null>(null)
  return (
    <FiverrContext.Provider
      value={{
        typeClick,
        settypeClick,
        IsSame,
        setIsSame,
        conversations,
        setcoversations,
        conversationSelect,
        setconversationSelect,
        ConvMessages,
        setConvMessages,
        loading,
        setLoading,
        newMessage,
        setNewMessage,
        usersOline,
        setUserOline,
        roomsInTyping,
        setRoomsInTyping,
        isTyping,
        setIsTyping,
        notification,
        setNotification,
        messageNotification,
        setMessageNotification,
        messageUser,
        setMessageUser,
        desconnectUsers,
        setDesconnectUsers,
        isValidInsertGig,
        setIsValidInsertGig,
        notificationEvent,
        setNotificationEvent

      }}
    >
       {children}
    </FiverrContext.Provider>
  );
};


//todo----The useGlobalState function is a custom hook that allows components to access the state stored in the FiverrContext. It uses the useContext hook to retrieve the current context value-----//
export const useGlobalState = () => {
  return useContext(FiverrContext);
};