
import { useSelector } from "react-redux";
import { ADD_GIG, AUTH_GOOGLE, ERRORS_FORM, GET_ALL_GIGS, GET_GIGS, LOG_IN, LOUG_OUT, REGISTER, REMOVE_ERRORS_FORM, UPDATA_REVIEWS } from "../constant/constant";

// const { gigs } = useSelector((state: any) => state.gighandle);

interface TypeAction {
    type:string,
    payload:any
}

const initialState = {
    user: null,
    errors:null
  };

export const AuthRegister = (state=initialState,action:TypeAction) =>{
   
    const {payload} = action;

    switch (action.type) {
        case REGISTER:
            return {...state,user:payload}
        case ERRORS_FORM:
            return {...state,errors:payload}  
        case REMOVE_ERRORS_FORM:
            return {...state,errors:null}     
        case LOG_IN:
            return {...state,user:payload}
        case AUTH_GOOGLE:
            return {...state,user:payload}
        case LOUG_OUT:
            return {...state,user:null}    
        default:
            return state;
    }
}

interface Gig {
    _id:any,
    reviews:any,
}

interface GigState {
    gigsUser:Gig[],
    gigs:Gig[], 
}

const initialStat:GigState={
    gigsUser:[],
    gigs:[],
}

export const AddGigReducer = (state=initialStat,action:TypeAction) =>{
  const {payload,type} = action;

  switch (type) {
    case GET_ALL_GIGS:
        return {...state,gigs:payload}
    case ADD_GIG:
        return {...state,gigsUser:[...payload]}
    case GET_GIGS:
        return {...state,gigsUser:payload}
    case UPDATA_REVIEWS:
        console.log('reducer');
        
        const updatedGigs = state.gigs.map((gig) => {
            if (gig._id === payload.gigId) {
                console.log('find');
                
              // Create a new Gig object with updated reviews
              return {
                ...gig,reviews: [...payload.data], // Merge existing reviews with new reviews
              };
            }
            return gig; // For other gigs, return them as they are
          });
    
          return { ...state, gigs: updatedGigs };
    default:
       return state;
  }
      
}
