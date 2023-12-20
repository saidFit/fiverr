import * as React from 'react';
import { Star } from '../../assets';
import { MdBackpack, MdLocationOn } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import {CiClock1} from 'react-icons/ci'
import { IoIosSend } from 'react-icons/io';
import Switch from './Sidebar/Switch';
import { useSelector } from 'react-redux';
import { useGlobalState } from '../../context/context';


interface ICardProfileProps {
}

const CardProfile: React.FunctionComponent<ICardProfileProps> = (props) => {
    const [IsClick,setIsClick] = React.useState<boolean>(false);
    const {user:{userData:{_id,firstName,lastName,img,background}}} = useSelector((state:any) => state.register);
    const {
      usersOline
    } = useGlobalState();

     return (
     <article className='rounded-md md:w-[30%] h-fit  p-4 border border-gray-200 bg-white shadow-md'>
         <div className='text-center space-y-2'>
          {img && !background ? (
                      <div
                        className="relative cursor-pointer"
                      >
                        <img
                          className="w-12 h-12 object-cover rounded-full"
                          src={img}
                          alt=""
                        />
                        {usersOline?.includes(_id) ? (
                          <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                        ) : (
                          <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                        )}
                      </div>
                    ) : (
                      <div
                        className="relative cursor-pointer w-[80px] h-[80px] mx-auto"
                       
                      >
                        <button
                          style={{ background:background }}
                          className={`flex justify-center items-center w-full h-full object-cover rounded-full`}
                        >
                          <p className='text-2xl'>
                           {firstName?.substring(0, 1)
                            .toUpperCase()} 
                          </p>
                          
                        </button>
                        {usersOline?.includes(_id) ? (
                          <span className="bottom-0 left-16 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                        ) : (
                          <span className="bottom-0 left-9 absolute w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                        )}
                      </div>
                    )}
            <h1 className='h1'>{`${firstName} ${lastName}`}</h1>
            <p className="p">A Professional WordPress Developer</p>
            <div className='flex justify-center space-x-6'>
            <div className='flex space-x-2'>
             <img className='w-[12px] h-[12px]' src={Star} alt="" />
             <img className='w-[12px] h-[12px]'src={Star} alt="" />
             <img className='w-[12px] h-[12px]' src={Star} alt="" />
            </div>
            <p className="p">5.5(28 reviews)</p>
            </div>
           
           <p className='border mt-4 border-gray-100 rounded-md p-1'>Preview Public Mode</p>
          </div>

          <section className='space-y-2 border-b border-gray-400 py-3'>
            <div className='flex justify-between p-2'>
            <div className='flex items-center space-x-2'>
              <span className='p'><MdLocationOn size={14}/></span>
              <p className='p'>From</p>
            </div>
            <b>Casablanca</b>
            </div>

             <div className='flex justify-between p-2'>
            <div className='flex items-center space-x-2'>
                <span className='p'><BsFillPersonFill size={14}/></span>
                <p className='p'>Member since</p>
              </div>
              <b>Jui 2019</b>
            </div>

             <div className='flex justify-between p-2'>
            <div className='flex items-center space-x-2'>
                <span className='p'><CiClock1 size={14}/></span>
                <p className='p'>AVG.Response Time</p>
              </div>
              <b>9 hours</b>
            </div>

             <div className='flex justify-between p-2'>
            <div className='flex items-center space-x-2'>
            <span className='p'><IoIosSend size={14}/></span>
                <p className='p'>Recent</p>
              </div>
              <b>about 1 month</b>
            </div>
          </section>
           <div className='flex justify-between p-2'>
            <div className='flex items-center space-x-2'>
              <span className='p'><MdBackpack size={14}/></span>
              <p className='p'>Out of office</p>
            </div>
            <span className=''> <Switch IsClick={IsClick} setIsClick={setIsClick} shadow={'border border-gray-400 rounded-full'}/></span>
          </div>
        </article>
  );
};

export default CardProfile;
