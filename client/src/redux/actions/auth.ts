import { AnyAction, Dispatch } from "redux";
import newRequest from "../../utils/newRequest";
import { AUTH_GOOGLE, ERRORS_FORM, LOUG_OUT, REGISTER,REMOVE_ERRORS_FORM } from "../constant/constant";




export const RegisterAction = (user:any,url:string,background?:string) => async(dispatch:Dispatch<AnyAction>):Promise<void> => {
     
       console.log(background)
       try {
            
            const {data} = await newRequest.post("/auth/register",background ?{...user,background}:{...user,img:url})
            localStorage.setItem('user',JSON.stringify(data));
            dispatch({type:REGISTER,payload:data})
            dispatch({type:REMOVE_ERRORS_FORM})
       } catch (error:any) {
        // setErrorForm(err.response.data);
            // console.log(error);
            
            dispatch({type:ERRORS_FORM,payload:error.response.data})
            // throw error;
       }

}

export const LoginAction = (user:any) => async(dispatch:Dispatch<AnyAction>):Promise<void> => {
    try {
        const {data} = await newRequest.post('/Auth/login',user)
        dispatch({type:REMOVE_ERRORS_FORM})
        localStorage.setItem('user',JSON.stringify(data));
        dispatch({type:REGISTER,payload:data})
        
    } catch (error:any) {
    dispatch({type:ERRORS_FORM,payload:error.response.data})
      throw error
    }
}

export const AuthGoogle = () =>  async (dispatch:Dispatch<AnyAction>):Promise<void> => {
    

    try {
        const {data} =await  newRequest
         .get("http://localhost:5000/auth/LoginGoogle", {
           withCredentials: true,
         }) 
         localStorage.setItem('user',JSON.stringify(data));
         dispatch({type:AUTH_GOOGLE,payload:data})
       } catch (error) {
         throw error;
       }
}

export const LogoutAction  = () => async (dispatch:Dispatch<AnyAction>):Promise<void> =>{

    try {
        dispatch({type:LOUG_OUT})
    } catch (error) {
        throw error;
    }
}