import * as React from 'react';
import PostGig from './PostGig';
import UseGradianLine from '../../../Hooks/UseGradientLine';
import { AiFillCloseCircle } from 'react-icons/ai';

interface IEditGigProps {
    gig:any,
    setisShowPopup:React.Dispatch<React.SetStateAction<boolean>>
}


const EditGig: React.FunctionComponent<IEditGigProps> = (props) => {
   
const handleClosePopup = () =>{
    props.setisShowPopup(false)
    document.body.style.overflow = '';
} 

  return(
    <div className='page-container fixed inset-0 z-40 bg-[#00000092] overflow-auto'>
        <span onClick={handleClosePopup } className='absolute top-8 cursor-pointer right-12 text-white'><AiFillCloseCircle size={28}/></span>
        <div className='max-w-[900px] w-full mx-auto my-6 space-y-6'>
        <div className='relative w-fit mx-auto text-white'>
           <h1 className='h1'>Edit gig</h1> 
           <UseGradianLine bottom={6} width={'w-full'} color={"bg-green-600"}/>
        </div>
            
         <PostGig isEdit gig={props.gig}/>   
        </div>
       
    </div>
  );
};

export default EditGig;
