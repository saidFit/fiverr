import * as React from "react";
import { BsCloudUpload } from "react-icons/bs";
import {upload} from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";
import Switch from "../Dashboard/Sidebar/Switch";
import { useDispatch, useSelector } from "react-redux";
import { RegisterAction } from "../../redux/actions/auth";
import { Dispatch } from "redux";
import { getRandomColor } from "../../Hooks/UseLogic";

interface IRegisterProps {
    setToggle:React.Dispatch<React.SetStateAction<string>>
}

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  img: string;
  country: string;
  isSeller: boolean;
  desc: string;
};

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  // todo---------state-------------//
  const {errors:ErrorForm} = useSelector((state:any) => state.register)
  const navigate = useNavigate();
  const dispatch:Dispatch<any> = useDispatch()
  // todo-----variables-----------//
  const [UrlImg, setUrlImg] = React.useState<string | null>(null);
  const [Loading, setLoading] = React.useState<boolean>(false);
  const [LoadingButton, setLoadingButton] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [IsClick, setIsClick] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingButton(true);
    if(!file){
      dispatch(RegisterAction(user,'',getRandomColor()))
      setLoadingButton(false);
      return;
    }

    const url = await upload(file);
    setUrlImg(url);
    dispatch(RegisterAction(user,url))
    setLoadingButton(false);
    
  };

  const handleChange = (e: any) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (event: any) => {
    setLoading(true);
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.files);
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setUrlImg(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };

  React.useEffect(() => {
    if (IsClick) return setUser((prev) => ({ ...prev, isSeller: true }));
    return setUser((prev) => ({ ...prev, isSeller: false }));
  }, [IsClick]);

  return (
    <form
      onSubmit={handleSubmit}
      className="container border border-gray-400 my-4 rounded-md mx-auto p-5 flex justify-around"
    >
      <article className="space-y-3">
        <h1 className="text-4xl opacity-50 font-bold my-3">
          Create a new Account
        </h1>
        <div className="flex flex-col space-y-2">
          <label>
            firstName <span className=" text-red-500 text-xl">*</span>
          </label>
          <input
            className={`${
              ErrorForm?.includes("firstName") ? "border border-rose-500" : ""
            } py-3 px-4 border border-gray-300 rounded-md outline-none`}
            onChange={handleChange}
            name="firstName"
            type="text"
            placeholder="firstName"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>
            lastName <span className=" text-red-500 text-xl">*</span>
          </label>
          <input
            className={`${
              ErrorForm?.includes("lastName") ? "border border-rose-500" : ""
            } py-3 px-4 border border-gray-300 rounded-md outline-none`}
            onChange={handleChange}
            name="lastName"
            type="text"
            placeholder="lastName"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>
            email <span className=" text-red-500 text-xl">*</span>
          </label>
          <input
            className={`${
              ErrorForm?.includes("email") ? "border border-rose-500" : ""
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
              ErrorForm?.includes("password") ? "border border-rose-500" : ""
            } py-3 px-4 border border-gray-300 rounded-md outline-none`}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="password"
          />
        </div>

        <div className="flex flex-col space-y-2 mx-auto w-full">
          <p>image profile</p>
          <label
            onChange={handleFileChange}
            className="flex w-full flex-col items-center px-6 py-4 bg-gray-200 border border-gray-400 rounded-md cursor-pointer"
          >
            {/* <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" /> */}
            <span className="opacity-30">
              <BsCloudUpload size={90} />
            </span>
            <span>Select a image</span>
            <input
              name="img"
              type="file"
              className="hidden"
              //   onChange={handleFileChange}
            />
          </label>
          {Loading && <p>Loading...</p>}
          {UrlImg && !Loading && (
            <img
              className="w-[70px] h-[70px] rounded-md object-cover"
              src={UrlImg}
              alt=""
            />
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label>
            Country <span className=" text-red-500 text-xl">*</span>
          </label>
          <input
            className={`${
              ErrorForm?.includes("country") ? "border border-rose-500" : ""
            } py-3 px-4 border border-gray-300 rounded-md outline-none`}
            onChange={handleChange}
            name="country"
            type="text"
            placeholder="Country"
          />
        </div>
      </article>

      <article className="space-y-3 flex flex-col">
        <h1 className="text-4xl opacity-50 font-bold my-3">
          i want to become a saller
        </h1>
        <div className="flex items-center space-x-4">
          <p className=" opacity-60 text-xl">Activate the saller account</p>
          <Switch IsClick={IsClick} setIsClick={setIsClick} shadow="" />
        </div>

        <div className="flex flex-col space-y-2">
          <label>Phone Number</label>
          <input
            className="py-3 px-4 border border-gray-300 rounded-md outline-none"
            onChange={handleChange}
            name="phone"
            type="text"
            placeholder="+212 63 045 54"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label>Description</label>
          <textarea
            className="py-3 px-4 border border-gray-300 rounded-md outline-none"
            onChange={handleChange}
            name="desc"
            placeholder="description..."
          ></textarea>
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
        <button onClick={() => props.setToggle('login')} className=" underline text-gray-400 transition-all duration-300 hover:text-gray-500">Already have a compte</button>
      </article>
    </form>
  );
  
};

export default Register;
