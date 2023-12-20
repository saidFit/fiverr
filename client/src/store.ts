import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { AddGigReducer, AuthRegister } from "./redux/reducer/reducer";

// State
const rootReducer = combineReducers({
  register: AuthRegister,
  gighandle: AddGigReducer,
});

// Types
type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  img: string;
  country: string;
  phone: string;
  desc: string;
  isSeller: boolean;
};

interface InitialState {
  register?: {
    user: any | null;
    errors:string[] | null
  },
  gighandle:{
    gigsUser:any[],
    gigs:any[]
  },
}

// Initial state
const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;
const initialState: InitialState = {
  gighandle:{
    gigsUser:[],
    gigs:[],
  },
  register: {
    user: parsedUser,
    errors:null,
  },
  
};



// Middleware
const middleware = [thunk];

// Create store
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
