import React, { useRef, useEffect } from 'react';
import Swiper, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { projects } from '../../data/data';
import {GrFormNextLink,GrFormPreviousLink} from 'react-icons/gr';


Swiper.use([Navigation]);

const SlideComponent: React.FC = () => {
const swiperRef = useRef<any>(null);

  useEffect(() => {
    swiperRef.current = new Swiper('.swiper-container', {
      slidesPerView: 5,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      

      breakpoints: {
        1024: {
          slidesPerView: 5,
        },
        
        780: {
          slidesPerView: 3,
        },
        480: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      },
    });

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);


  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className='container relative ml-[13px] md:ml-auto mx-auto overflow-hidden'>
    <div className="swiper-container">
      <div className="swiper-wrapper">

      {projects.map((item,key)=>{ 
        const {img,pp,cat,username} = item;
        return(
         
          <div className='swiper-slide relative space-y-3 shadow-lg border border-gray-300 rounded-md flex flex-col h-[300px]' key={key}>
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
        {/* <div className="swiper-slide">
          <img src="image1.jpg" alt="Image 1" />
        </div>
        <div className="swiper-slide">
          <img src="image2.jpg" alt="Image 2" />
        </div>
        <div className="swiper-slide">
          <img src="image3.jpg" alt="Image 3" />
        </div> */}
        {/* Add more slides as needed */}
      </div>
      {/* <div className="swiper-button-next" onClick={goNext}></div>
      <div className="swiper-button-prev" onClick={goPrev}></div> */}
    </div>
    <div className='absolute flex justify-between z-50 w-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <button onClick={goPrev}><GrFormPreviousLink size={35}/></button>
    <button onClick={goNext}><GrFormNextLink size={35}/></button>
    </div>
    
  </div>
  );
};

export default SlideComponent;
