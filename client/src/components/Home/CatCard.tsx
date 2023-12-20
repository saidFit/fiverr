import * as React from 'react';
import Slide from '../Slide';
import { cards } from '../../data/data';




interface ICatCardProps  {
    
}

const CatCard: React.FunctionComponent<ICatCardProps> = () => {

  return(
    <Slide superLargeDesktop={5} Desktop={3} tablet={2} mobile={1} width='w-full'>
      
      {cards.map((item,key)=>{ 
        const {title,desc,img} = item;
        return(
         
          <div className='relative slider h-[300px]' key={key}>
             <img className='img absolute inset-0 w-full h-full z-0 object-cover' src={img} alt="" />
             <div className='space-y-1 p-2 text-white relative z-10'>
               <h2 className='h2'>{title}</h2>
             <p>{desc}</p>
            
            
          </div>  
          </div>
          
        )
      })}
    </Slide>
  ) ;
};

export default CatCard;
