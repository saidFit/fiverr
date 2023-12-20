import axios from 'axios';
import * as React from 'react';
import newRequest from '../../utils/newRequest';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../../redux/actions/auth';

interface ILoginProps {
    setToggle:React.Dispatch<React.SetStateAction<string>>
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const dispatch:Dispatch<any> = useDispatch()
    const {errors} = useSelector((state:any) => state.register);
    const [ErrorForm,setErrorForm] = React.useState<string[] | null>(null);
    const [LoadingButton,setLoadingButton] = React.useState<boolean>(false);
    const [user,setUser] = React.useState({
        email:'',
        password:''
    })


    const handleChange = (e:any) =>{
        setUser((prev) => {return {...prev,[e.target.name]:e.target.value}})
    }

    const handleSumbit =async(e:any) =>{
       e.preventDefault();
       dispatch(LoginAction(user))
    }
  return(
    <form onSubmit={(e) => handleSumbit(e)} className='w-full max-w-[400px] my-24 border border-gray-400 pb-8 shadow-MyBox1 rounded-md px-12 mx-auto'>
        <h1 className='text-xl opacity-70 font-bold text-center my-8'>Login</h1>
      <article className="space-y-3 flex flex-col">
        <div className="flex flex-col space-y-2">
          <label>
            email <span className=" text-red-500 text-xl">*</span>
          </label>
          <input
            className={`${
             !errors?.message && errors?.includes("email") ? "border border-rose-500" : ""
            } py-3 px-4 border border-gray-300 rounded-md outline-none`}
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="email"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>
            password <span className=" text-red-500 text-xl">*</span>
          </label>
          <input
            className={`${
              !errors?.message && errors?.includes("password") ? "border border-rose-500" : ""
            } py-3 px-4 border border-gray-300 rounded-md outline-none`}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        {LoadingButton ? (
          <button
            disabled
            type="button"
            className="bg-green-500 cursor-not-allowed opacity-90 py-3 px-4 text-white rounded-md"
          >
            Register...
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 ml-2 text-gray-200 animate-spin text-xl"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#fff"
              />
            </svg>
          </button>
        ) : (
          <button className="bg-green-500 py-3 px-4 text-white rounded-md ">
            Register
          </button>
        )}
       {errors?.message && <p className='p-3 text-center rounded-md bg-AlertColor-danger-BgDanger text-AlertColor-danger-TextDanger border border-AlertColor-danger-BorderDanger'>{errors.message}</p>} 
        <button onClick={()=> props.setToggle('register')} className=" underline text-gray-400 transition-all duration-300 hover:text-gray-500">register right now</button>
        <button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
  <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
  Sign in with Google
</button>
      </article>
    </form>
  );
};

export default Login;
