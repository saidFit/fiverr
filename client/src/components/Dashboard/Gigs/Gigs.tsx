import * as React from "react";
import { gigsSaller } from "../../../data/data";
import UseGradianLine from "../../../Hooks/UseGradientLine";
import { useSelector } from "react-redux";
import { BiShow } from "react-icons/bi";
import {FaEllipsisV} from 'react-icons/fa'
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import useRopen from "../../../Hooks/UseRopen";
import EditGig from "./EditGig";
import UseAlert from "../../../Hooks/UseAlert";
import { empty_gigs } from "../../../assets";
interface IGigsProps {}

const Gigs: React.FunctionComponent<IGigsProps> = (props) => {
  const { gigsUser } = useSelector((state: any) => state.gighandle);

  const [Paused, setPaused] = React.useState<boolean>(false);
  const [ActiveGigs, setActiveGigs] = React.useState<boolean>(true);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const popup = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [ElementTarget,setElementTarget] = React.useState<any>(null);
  const [isShowPopup,setisShowPopup] = React.useState<boolean>(false);
  const {handle} = useRopen()
  const handleMouseEnter = (item: string) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const isNewGig = (gig: any): boolean => {
    // TODO---currentDate.getTime() returns the timestamp of the current date and time in milliseconds.
    //
    const currentDate = new Date();
    const gigDate = new Date(gig.createdAt);
    //TODO---8 * 60 * 1000 calculates the number of milliseconds in 8 minutes. Since there are 60 seconds in a minute and 1000 milliseconds in a second, multiplying these values together gives us the total number of milliseconds in 8 minutes.
    const twoMinutesAgo = new Date(
      currentDate.getTime() - 1 * 24 * 60 * 60 * 1000
    );
    //todo that means every day has 24 hours & each hour has 60 minutes & each minute has 60 second & each second has 1000 milisecond
    return gigDate >= twoMinutesAgo && gigDate <= currentDate;
  };

  React.useEffect(() => {
    handle(popup,setOpen)
  },);
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


  const handleEdit = () => {
    setisShowPopup(true)
    document.body.style.overflow = 'hidden';
    setOpen(!open)
    // const windowHeight = window.innerHeight;
    // const scrollPosition = windowHeight;
    // window.scrollTo({
    //   top: scrollPosition,
    //   behavior: 'smooth',
    // });
  };

  
  const handleDelete = () =>{
    setOpen(!open)
  }
  return (
    <section className="p-8">
    
     <section className="w-[70%] space-y-7 mx-auto">
      {gigsUser.length === 0 ?
      (<div className="w-fit mx-auto p-3 flex flex-col items-center border border-gray-400 rounded-md">
        <img className="w-[300px] h-[300px] object-cover" src={empty_gigs} alt="" />
        <p className="text-xl opacity-80 font-[700]">
          you don't have any gig yet 
        </p>
        
      </div>)
      :
      ( <React.Fragment>
         <div className="w-full bg-white shadow-md border border-gray-300 rounded-md p-3 flex space-x-8">
          <div
            onClick={() => {
              setActiveGigs(!ActiveGigs);
              setPaused(!Paused);
            }}
            className="w-fit relative"
          >
            <button>ACTIVES GIGS</button>
            {ActiveGigs && (
              <UseGradianLine color="bg-green-600" bottom={12} width={""} />
            )}
          </div>
          <div
            onClick={() => {
              setActiveGigs(!ActiveGigs);
              setPaused(!Paused);
            }}
            className="w-fit relative"
          >
            <button>PAUSED</button>
            {Paused && (
              <UseGradianLine color="bg-green-600" bottom={12} width={""} />
            )}
          </div>
        </div>
        <article className="grid grid-cols-3 gap-7">
          {gigsUser?.map((item: any, ind: any) => {
            return (
              <div key={ind} className="relative">
                <div
                  className=" relative space-y-16 shadow-md border border-gray-300"
                >
                  <div>
                    <div
                      className={`relative w-full h-[150px] ${
                        hoveredItem === item ? "hover:bg-black" : ""
                      }`}
                      onMouseEnter={() => handleMouseEnter(item)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={item.cover}
                        alt={item.title}
                      />
                      {hoveredItem === item && (
                        <div className="absolute flex justify-center items-center transition-all duration-200 inset-0 w-full h-full bg-[#0000005b] z-10">
                          {/* Content to show on hover */}
                          <div>
                            <button className="text-white bg-[#000000c7] px-5 rounded-full  0">
                              <BiShow size={27} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="p m-2">{item.title}</p>
                  </div>

                  <div className="p-2 flex justify-between items-center px-3">
                    <span>p</span>
                    <span className="flex space-x-2 items-center">
                      <p className="text-green-600">STARTING AT</p>
                      <b>${item.price}</b>
                    </span>
                  </div>
                </div>
                {isNewGig(item) && (
                  <p className=" absolute z-20 -top-4 -left-4 shadow-MyBox1 px-3 py-1 rounded-full bg-AlertColor-danger-BgDanger text-AlertColor-danger-TextDanger">
                    new
                  </p>
                )}
                <div ref={ElementTarget === item ? popup:null}  className="absolute top-1 right-1 z-40">
                  <button onClick={()=>handleVisibleDelEd(item)} className="text-white"><FaEllipsisV size={18}/></button>
                 {open && ElementTarget === item &&(
                  <div className="absolute top-5 right-3 w-[90px] bg-gray-50 rounded-md">
                    <div className="flex py-2 transition-all duration-300 hover:bg-green-300 hover:rounded-md space-x-1 items-center border-b border-gray-100">
                      <span className="text-AlertColor-danger-TextDanger"><MdDelete size={20}/></span>
                      <button onClick={handleDelete} className="text-start text-AlertColor-danger-TextDanger">delete</button>
                    </div>
                    <div className="flex py-2 transition-all duration-300 hover:bg-green-300 hover:rounded-md space-x-1 items-center">
                      <span className=" text-AlertColor-Primary-TextPrimary"><AiTwotoneEdit size={20}/></span>
                      <button onClick={handleEdit} className="text-start text-AlertColor-Primary-TextPrimary">edit</button>
                    </div>
                   
                  </div>
                 )}
                  
                </div>
                
              </div>
            );
          })}
        </article>
      </React.Fragment>)}
      
       
      </section>
     {isShowPopup && (<EditGig gig={ElementTarget} setisShowPopup={setisShowPopup}/>)} 
    </section>
  );
};

export default Gigs;
