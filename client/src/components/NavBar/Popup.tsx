import * as React from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import { menu } from '../../data/data';
import { Link } from 'react-router-dom';

interface IPopupProps {
    IsClick:boolean
    setIsClick:React.Dispatch<React.SetStateAction<boolean>>,
}

const Popup: React.FunctionComponent<IPopupProps> = (props) => {
  const [IsMatch,setIsMatch] = React.useState<number | null>(null)

  const handleClick = (ind:number) =>{
       if(IsMatch == ind) return setIsMatch(()=>null)
       return setIsMatch(()=>ind)
  }

  return(
    <div className='bg-gray-50 text-black page-container overflow-y-auto w-full h-screen z-20 fixed inset-0 rounded-tl-md rounded-tr-md'>
     <div className='flex p-4 justify-between w-full items-center shadow-MyBox'>
       <h1>Fiverr.</h1>
       <span onClick={()=>props.setIsClick(!props.IsClick)}><AiOutlineClose/></span> 
     </div>
      <div className='px-4 py-7 space-y-3'>
        <p className='opacity-80'>Your parcorses.</p>
        <div className='flex flex-col space-y-5 justify-start items-start'>
           {menu.map((item,ind) =>{
            const {select,down,icon,options} = item
            return(
            <div key={ind} className='w-full'>
               <div className='font-[500] flex justify-between text-lg shadow-MyBox1 px-4 py-2 w-full text-start'>
                 <p>{select}</p>
                 <button onClick={()=> handleClick(ind)}>{down}</button>
               </div>
              {IsMatch == ind &&
              <div className='ml-8 my-3 space-y-2'>
                 {options.map((item,ind)=>{
                  return(
                    <div key={ind} className="container text-sm flex space-x-4 py-1 items-center border-t border-gray-300">
                      <Link className="opacity-50 transition-all duration-500 hover:opacity-90" to="/">
                        {`${ind+1}- ${item}`}
                      </Link>
                    </div>
                  )
                 })}
               </div>
              } 
              

           </div>    
            )
           })}
           
           {/* <button className='font-[500] text-lg shadow-MyBox1 px-4 py-2 w-full text-start'>orders</button>  
           <button className='font-[500] text-lg shadow-MyBox1 px-4 py-2 w-full text-start'>your gigs</button> 
           <button className='font-[500] text-lg shadow-MyBox1 px-4 py-2 w-full text-start'>your messages</button>
           <button className='font-[500] text-lg shadow-MyBox1 px-4 py-2 w-full text-start'>your orders</button>
           <button className='font-[500] text-lg shadow-MyBox1 px-4 py-2 w-full text-start'>your porfile</button>
           <button className='font-[500] text-lg shadow-MyBox1 px-4 py-2 w-full text-start'>your porfile</button>
           <button className='font-[500] text-lg shadow-MyBox1 px-4 py-2 w-full text-start'>your porfile</button> */}
        </div>
      </div>

      <div className='flex flex-col justify-center space-y-5 px-4'>
        <button className='bg-red-500 rounded-full py-2 px-4 shadow-xl text-white'>Sign up</button>
        <button className='bg-gray-200 rounded-full py-2 px-4 shadow-xl'>Log in</button>
      </div>
    </div>
  );
};

export default Popup;
