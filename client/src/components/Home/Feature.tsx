import * as React from 'react';
import { feature } from '../../data/data';
import { video } from '../../assets';

interface IFeatureProps {
}

const Feature: React.FunctionComponent<IFeatureProps> = () => {
  return (
      <div className=' bg-green-100 px-4 py-16 flex MTwoCol my-20 justify-around items-center w-full'>
        <article className='space-y-8 w-full md:w-[35%]'>
             <div className='relative'>
             <h1 className='h1'>A whole world of freelance talentat your fingertips</h1>   
             </div>
            
            <div className='space-y-4'>
             {feature.map((item,ind)=>{
            const {icon,title,desc} = item
            return(
                <div key={ind} className='space-x-8'>
                    <div className='flex space-x-2 items-center'>
                     <span className='opacity-60'>{icon}</span>   
                     <h1 className='h2'>{title}</h1>    
                    </div>
                    <p className='p'>{desc}</p>
                </div>
            )
        })} 
            </div>
            
        </article>
        <video className='w-full md:w-[45%]' src={video} autoPlay controls></video>
      
      </div>
  );
};

export default Feature;
