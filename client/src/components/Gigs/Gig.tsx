import * as React from "react";
import { gigs } from "../../data/data";
import { Star, heart } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { FaEllipsisV } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiFillMessage, AiTwotoneEdit } from "react-icons/ai";
import useRopen from "../../Hooks/UseRopen";
import { CgProfile } from "react-icons/cg";
import newRequest from "../../utils/newRequest";
import { useGlobalState } from "../../context/context";
import { Link, useNavigate } from "react-router-dom";

interface IGigsProps {}

interface Data {
  id: number;
  img: string;
  pp: string;
  desc: string;
  price: number;
  star: number;
  username: string;
}
interface Items {
  id: number;
  StartEnd: {
    S: number;
    E: number;
  };
}
type CallbackFunction = (arg2: number) => void;

const Gigs: React.FunctionComponent<IGigsProps> = (props) => {

  const dispatch = useDispatch<any>();
  const {gigs} = useSelector((state:any) => state.gighandle);
  const {settypeClick,setIsSame,setcoversations,usersOline} = useGlobalState()
  const navigate = useNavigate();

  const {user} = useSelector((state:any) => state.register);
  const [ElementTarget,setElementTarget] = React.useState<any>(null);
  const popup = React.useRef<HTMLDivElement>(null);
  const [open,setOpen] = React.useState<boolean>(false)
  const {handle} = useRopen()




  const [startNumberBar, setstartNumberBar] = React.useState<number>(1);
  const [endNumberBar, setendNumberBar] = React.useState<number>(
    gigs.length / 8 / 2 + 1
  );
  const [isSameInd, setIsSameInd] = React.useState<number>(1);
  const [StartList, setStartList] = React.useState<number>(0);
  const [EndList, setEndList] = React.useState<number>(7);
  const [ListBar, setListBar] = React.useState<Items[]>([
    { id: 1, StartEnd: { S: StartList, E: EndList } },
  ]);
  const [HidButton, setHidButton] = React.useState<Boolean>(true);
  const [gigsList, setgegsList] = React.useState<Data[]>(
    gigs.filter((item:any, ind:any) => ind >= StartList && ind <= EndList)
  );

  let numberArray = Array.from(
    { length: endNumberBar - startNumberBar + 1 },
    (_, index) => startNumberBar + index
  );



  const handleChange = (
    ind: number,
    item: number,
    callback: CallbackFunction
  ) => {
    setIsSameInd(() => item);
    if (ind + 1 == numberArray.length && numberArray[ind] < gigs.length / 8) {
      setstartNumberBar((p) => p + 1);
      setendNumberBar((p) => p + 1);
    }
    if (numberArray[ind] >= gigs.length / 8 - 1) {
      setHidButton(false);
    } else {
      setHidButton(true);
    }
    if (item == numberArray[0] && item != 1) {
      setstartNumberBar((p) => p - 1);
      setendNumberBar((p) => p - 1);
    }

    callback(item);
  };

  const callbackFilter = (item: number) => {
    for (let i = 0; i < ListBar.length; i++) {
      if (ListBar[i].id == item) {
        setgegsList(
          gigs.filter(
            (item:any, ind:any) =>
              ind >= ListBar[i].StartEnd.S && ind <= ListBar[i].StartEnd.E
          )
        );
        return;
      }
    }
    setListBar((p) => [
      ...p,
      { id: item, StartEnd: { S: EndList + 1, E: EndList + 8 } },
    ]);
    setStartList(EndList + 1);
    setEndList(EndList + 8);
    setgegsList(
      gigs.filter((item:any, ind:any) => ind >= EndList + 1 && ind <= EndList + 8)
    );
  };




  const handleVisibleDelEd = (item:any) =>{
    if(open && item !== ElementTarget){
      setOpen(false);
      setOpen(true);
    }else if (open && item === ElementTarget){
      setOpen(false);
    }
    else{
      setOpen(true);
    }
    setElementTarget(item)
}

React.useEffect(() => {
  handle(popup,setOpen)
},);



const IsNewGig = (gig:any):boolean =>{

  const currentDate = new Date();
  const gigDate  = new Date(gig.createdAt);
  const OneDayAgo = new Date(currentDate.getTime() - 20 * 60 * 1000);
  return gigDate >= OneDayAgo && gigDate <= currentDate;

}

const handleConv = async(senderId:string,receiverId:string):Promise<void> =>{
    setOpen(!open);
    try {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
      };
      const {data} = await newRequest.post("/coversation/InsertCov",{senderId,receiverId},config);
      setcoversations(data)
    } catch (error) {
        throw error;
    }
    navigate('/Dashboard')
    settypeClick('Messages')
    setIsSame(1);
    window.scrollTo({ top: 0 });
      
}

const handleProfileUser = () =>{
  setOpen(!open);
}

  return (
    <div className="py-5">

      <section className="w-full my-7 flex gap-8 justify-center items-center flex-row flex-wrap">
     {gigs ?(
       gigs?.map((item:any, ind:any) => {
           console.log(item?.userId?._id,item?.userId?.firstName)
          return (
            
        
            <div key={ind} className="relative cursor-pointer">
                
                {IsNewGig(item) && (
                  <p className=" absolute z-20 -top-4 -left-4 shadow-MyBox1 px-3 py-1 rounded-full bg-AlertColor-danger-BgDanger text-AlertColor-danger-TextDanger">
                    new
                  </p>)}

              <article className="w-[244px] rounded-md">
                <Link key={ind} to={`/Gig/${item._id}`}>
                <img
                  className="w-full h-[160px] object-cover"
                  src={item.cover}
                  alt={item.cover}
                />
                </Link>
                <article className="py-4 space-y-4">
                  <div className="flex items-center justify-between">


                    {/* <div className="flex items-center space-x-3">
                      {img ? (
                      <img
                      className="w-[24px] h-[24px] object-cover rounded-full"
                      src={img}
                      alt={firstName}
                    />
                      ):(
                        <p style={{background:background}} className={`flex justify-center items-center w-[24px] h-[24px] text-white object-cover rounded-full`}>{firstName.substring(0, 1).toUpperCase()}</p>
                      )}
                    
                    <p>{firstName + lastName}</p> 
                    </div> */}

<div className="flex items-center space-x-3">
                      {item.userId?.img ? (
                      <div className="relative w-fit">
                      <img
                        className="flex justify-center flex-auto w-[35px] h-[35px] items-center object-cover rounded-full"
                        src={item.userId?.img}
                        alt=""
                      />
                      {usersOline?.includes(item.userId._id) ? (
                        <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                      ) : (
                        <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                      )}
                    </div>
                      ):(
                        <span className="relative w-fit">
                <b
                  style={{ background: item?.userId?.background }}
                  className={`flex justify-center w-[35px] h-[35px] items-center object-cover rounded-full`}
                >
                  {`${item?.userId?.firstName} ${item?.userId?.lastName}`.substring(0, 1).toUpperCase()}
                </b>
                {usersOline?.includes(item?.userId?._id) ? (
                  <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                ) : (
                  <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                )}
              </span>
                      )}
                    
                    <p>{item?.userId?.firstName + item?.userId?.lastName}</p> 
                    </div>
                    
                   {user?.userData._id !== item.userId?._id &&(
               <div ref={ElementTarget === item ? popup:null}  className="relative">
                  <button onClick={()=>handleVisibleDelEd(item)} className="opacity-60"><FaEllipsisV size={18}/></button>
                 {open && ElementTarget === item &&(
                  <div className="absolute z-30 top-5 right-3 w-[100px] bg-white shadow-MyBox1 rounded-md">
                    <div className="flex cursor-pointer p-2 transition-all duration-300 hover:bg-green-300 hover:rounded-md space-x-1 items-center border-b border-gray-100">
                      <span className="text-AlertColor-danger-TextDanger"><AiFillMessage size={20}/></span>
                      <button onClick={() =>handleConv(user.userData._id,item.userId._id)} className="text-start text-AlertColor-danger-TextDanger">message</button>
                    </div>
                    <div className="flex cursor-pointer p-2 transition-all duration-300 hover:bg-green-300 hover:rounded-md space-x-1 items-center">
                      <span className=" text-AlertColor-Primary-TextPrimary"><CgProfile size={20}/></span>
                      <button onClick={handleProfileUser} className="text-start text-AlertColor-Primary-TextPrimary">profil</button>
                    </div>
                   
                  </div>
                 )}
                  
                </div>
                   )}
                  
                  </div>

                  <p className="p">{item.userId?.desc}</p>

                  <div className="flex items-center space-x-1 text-yellow-400">
                    <img className="w-[13px]" src={Star} alt={item.userId?.firstName} />
                    {/* <span>{totalStarts}</span> */}
                  </div>

                  <div className="border-t border-gray-300 py-2 flex justify-between items-center">
                    <img
                      className="w-[20px] h-[20px] cursor-pointer"
                      src={heart}
                      alt={heart}
                    />

                    <div className="space-y-2">
                      <p className="p">Starting At</p>
                      <div className="relative w-fit">
                        <p className="">$ {item.price}</p>
                        <p className=" absolute -right-5 -top-2">99</p>
                      </div>
                    </div>
                  </div>
                </article>
              </article>
            </div>
            
            
          );
        })
     ):(
      <p>loading...</p>
     )}
     
      </section>

      <section className="space-y-3">
        <div className="border border-gray-400 rounded-md flex items-center w-fit mx-auto">
          {numberArray[0] != 1 && (
            <button className="border-r border-gray-400 py-2 px-8 transition-all duration-300 hover:bg-gray-400">
              ...
            </button>
          )}
          {numberArray.map((item, ind) => {
            return (
              <div key={ind}>
                {isSameInd == item ? (
                  <button
                    onClick={() => handleChange(ind, item, callbackFilter)}
                    className="border-r border-gray-400 py-2 px-8 transition-all duration-300 bg-gray-400"
                  >
                    {item}
                  </button>
                ) : (
                  <button
                    onClick={() => handleChange(ind, item, callbackFilter)}
                    className="border-r border-gray-400 py-2 px-8 transition-all duration-300 hover:bg-gray-400"
                  >
                    {item}
                  </button>
                )}
              </div>
            );
          })}
          {HidButton && (
            <button className="border-r border-gray-400 py-2 px-8 transition-all duration-300 hover:bg-gray-400">
              ...
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gigs;
