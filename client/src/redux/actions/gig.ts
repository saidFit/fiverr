import { AnyAction, Dispatch } from "redux";
import newRequest from "../../utils/newRequest";
import { ADD_GIG, GET_ALL_GIGS, GET_GIGS, UPDATA_REVIEWS } from "../constant/constant";




export const GetAllGigsAction = () =>async(dispatch:Dispatch<AnyAction>) =>{

  try {
     const {data} = await newRequest.get('/gig/getAllGigs');
     dispatch({type:GET_ALL_GIGS,payload:data})
  } catch (error) {
     throw error;
  }

}

export const InsertGigAction = (gig:any,tags:any[],cover:string,images:string[] | undefined,setIsValidInsert: React.Dispatch<React.SetStateAction<boolean>>,set_idOfpublishedGig:React.Dispatch<React.SetStateAction<string | null>>) => async(dispatch:Dispatch,  getState:any) => {

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
     const {data} = await newRequest.post(`/gig/insert`,{...gig,tags,cover,images},config)
     console.log(data);
     set_idOfpublishedGig(data.nowGig)
      dispatch({type:ADD_GIG,payload:data.gigs})
      setIsValidInsert(true);
  } catch (error) {
      throw error
  }

}
export const GetAllGigsOfSeller = () => async(dispatch:Dispatch,  getState:any) => {

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
     const {data} = await newRequest.get(`/gig/getGigs`,config)
     console.log(data)
      dispatch({type:GET_GIGS,payload:data})
  } catch (error) {
      throw error
  }

}


export const EditReviewAction = (comment:string,GigId:string) =>async(dispatch:Dispatch,getState:any) =>{
 console.log('click2');
 
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

    const {data} = await newRequest.put(`/gig/EditReview/${GigId}`,{comment},config)
    console.log(data);
    dispatch({type:UPDATA_REVIEWS,payload:{data:data,gigId:GigId}})
    }
 catch (error) {
    throw error;
  }

}

export const EditGigAction = (OriginGig:any,gig:any,tags:string[],cover:string,images:string[] | undefined) => async(dispatch:Dispatch,getState:any) => {
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

    const {data} = await newRequest.put(`/gig/putGig/${OriginGig._id}`,{...gig,tags,cover,images},config)
    console.log(data)
     dispatch({type:GET_GIGS,payload:data})
    
  } catch (error) {
    throw error;
  }
}
