import { AnyAction, Dispatch } from "redux";
import newRequest from "../../utils/newRequest";
import { useGlobalState } from "../../context/context";

// const {conversations,setcoversations,settypeClick} = useGlobalState()



export const InsertNewCoversationAction =(senderId:string,receiverId:string) =>async(dispatch:Dispatch<AnyAction>,getState:any)=>{
    try {
        const {
            register: { user:{token} },
          } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
          };
          const {data} = await newRequest.post("/coversation/InsertCov",{senderId,receiverId},config);
          console.log(data);
        } catch (error) {
            throw error;
        }
}


// export const GetAllOwnCoversationsAction = ()=> async(dispatch:Dispatch<AnyAction>,getState:any) =>{

//     let Data : any | null = null;

   

//     // await setcoversations(Data)
// }