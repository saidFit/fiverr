import * as React from 'react';
import { man } from '../../assets';
import UseMediaQuery from '../../Hooks/UseMediaQuery';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    const IsBigMedia = UseMediaQuery("(min-width: 768px)");
  return(
    <div>
      <div className='relative py-3 md:py-0'>
        <div className='absolute inset-0 bg-green-950 z-0'></div>
     <section className='container relative z-10 mx-auto'>
       <div className='flex items-center'>
        <article className='space-y-4 w-full text-center md:text-start text-white md:w-3/4'>
          <h1 className='h1' style={{fontSize:"35px",lineHeight:"45px"}}>Find the perfect <span className='font-[200]' style={{fontSize:"29px"}}>Freelance</span>  services for your Business</h1>  
          <div>
            <input className=' outline-none w-2/3 border border-gray-300 roundedtl-sm rounded-bl-sm p-2' type="text" placeholder='Enter your search...' />
            <button className=' rounded-tr-sm w-1/6 rounded-br-sm p-2 bg-green-600 text-white'>Search</button>
          </div>
          <div className='flex justify-center md:justify-start space-x-4 items-center'>
            <p>Popular:</p>
            <div className='flex space-x-2'>
               <p className='border border-gray-300 text-xs md:text-lg px-2 rounded-full p-1 '>Web Design</p> 
               <p className='border border-gray-300 text-xs md:text-lg px-2 rounded-full p-1'>Word Press</p> 
               <p className='border border-gray-300 text-xs md:text-lg px-2 rounded-full p-1'>Logo Design</p> 
               <p className='border border-gray-300 text-xs md:text-lg px-2 rounded-full p-1'>Ai Service</p> 
            </div>
          </div>
        </article>

        {IsBigMedia &&<img className='w-1/3' src={man} alt="" />} 
       </div> 
    </section>    
    </div>   
    <div className='flex justify-center font-montserrat pt-5 space-x-4 items-center opacity-40 w-full'>
      <p>Trusted by:</p>
      <div className='flex flex-col md:flex-row space-x-3 items-center'>
        <p>Facebook</p>
        <p>Google</p>
        <p>Netflix</p>
        <p>P&G</p>
        <p>PayPal</p>
      </div>  
    </div>
    
    </div>
   
   
  ) ;
};

export default Header;
