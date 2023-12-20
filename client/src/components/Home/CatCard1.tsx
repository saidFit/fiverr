import * as React from 'react';
import Slide from '../Slide';
import { projects } from '../../data/data';




interface ICatCard1Props  {
    
}

const CatCard1: React.FunctionComponent<ICatCard1Props> = () => {

  return(
    <Slide superLargeDesktop={5} Desktop={3} tablet={2} mobile={1} width={"w-full"}>
      
      {projects.map((item,key)=>{ 
        const {img,pp,cat,username} = item;
        return(
         
          <div className='relative slider space-y-3 shadow-lg border border-gray-300 rounded-md flex flex-col h-[300px]' key={key}>
             <img className='img h-3/4 z-0 object-cover' src={img} alt="" />
             <div className='flex space-x-5 p-2 items-center relative z-10'>
                <img className='w-[35px] h-[35px] object-cover rounded-full' src={pp} alt="" />
                <div>
                  <p className='p'>{cat}</p>
             <p>{username}</p>   
                </div>
              
            
            
          </div>  
          </div>
          
        )
      })}
    </Slide>
  ) ;
};

export default CatCard1;
