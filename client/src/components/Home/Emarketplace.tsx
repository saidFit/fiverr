import * as React from 'react';
import { Emarketplace as marketplace } from '../../data/data';
import UseCustomLine from '../../Hooks/UseCustomLine';
import UseGradianLine from '../../Hooks/UseGradientLine';
interface IEmarketplaceProps {
}

const Emarketplace: React.FunctionComponent<IEmarketplaceProps> = (props) => {
  return(
    <div className='py-12 container mx-auto bg-gray-200'>
      <section className='container mx-auto space-x-6 space-y-8'>
        <div className='relative w-fit'>
           <h1 className='h1'>Explore the marketplace</h1> 
           <UseGradianLine bottom={6} width={'w-full'} color={"bg-green-600"}/>
        </div>
        
        <article style={{margin:'20px 0'}} className='grid container mx-auto justify-center items-center grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5'>
         {marketplace.map((item,ind) =>{
            const {icon,title} = item;
            return(
               <div key={ind} className='space-y-4 w-full p-4 flex flex-col justify-center'>
                <div className='btn-parent w-1/3 cursor-pointer mx-auto'>
                 <img className='w-full' src={icon} alt={icon} />
                 <UseCustomLine color={"bg-gray-400"}/>  
                </div>
                 <span className='text-center'>{title}</span>
               </div>
            )
        })}    
        </article>
       
    </section>  
    </div>
    
  );
};

export default Emarketplace;
