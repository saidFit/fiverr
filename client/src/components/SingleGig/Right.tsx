import * as React from 'react';
import {SingleGig} from '../../data/data';
import { check, clock, recycle } from '../../assets';

interface IRightProps {
  Active:boolean
}

const Right: React.FunctionComponent<IRightProps> = (props) => {
  return(
     <section className={`${props.Active ? 'sticky top-[100px]':''} flex border border-gray-400 rounded-md p-4 md:w-[30%]`}>

      <div className={``}>

    

    
      {SingleGig.map((item,ind) =>{
        const {
            Right:{
                title
                ,price
                ,desc
                ,details:{dur,titleD,features}
            }
          } = item;
          return(
            <div key={ind} className='space-y-8'>
                <div className='flex justify-between items-center'>
                    <b>{title}</b>
                    <p>{price}</p>
                </div>
                <p className="p">{desc}</p>
                <div className='flex justify-between'>
                  <div className='flex items-center space-x-2'>
                    <img className='w-[13px]' src={clock} alt={clock} />
                    <p>{titleD}</p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <img className='w-[13px]' src={recycle} alt={recycle} />
                    <p>{dur}</p>
                  </div>  
                </div>

                 <div>
                    {features.map((item,ind)=>{
                    return(
                        <div key={ind} className='flex items-center space-x-2'>
                            <div className='flex items-center space-x-2'>
                               <img className='w-[12px]' src={item.img} alt="img" />
                                <p className="p">{item.p}</p> 
                            </div>
                        </div>
                    )
                })}   
                 </div>
             
                
            </div>
          )

      })}
        <button className=' w-11/12 mx-auto bg-green-500 text-white text-center p-2 my-3 rounded-md block'>continue</button>
        </div>
     </section>
  ) ;
};

export default Right;
