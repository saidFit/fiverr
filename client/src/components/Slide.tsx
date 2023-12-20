
// import React, { Children, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import * as React from 'react';




interface ISlideProps {
  children:React.ReactNode,
  superLargeDesktop:number,
    Desktop:number,
    tablet:number,
    mobile:number,
    width:string
}

const Slide: React.FunctionComponent<ISlideProps> = ({children,superLargeDesktop,Desktop,tablet,mobile,width}) => {
  const [slidesToSlide, setSlidesToSlide] = React.useState<number>(4);

  React.useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      console.log(screenWidth)
      let newSlidesToSlide = 4; // Default number of slides to slide

      // Customize the number of slides to slide based on screen width
         if (screenWidth <= 2000) {
        newSlidesToSlide = superLargeDesktop;
      }  if (screenWidth <= 1060) {
        newSlidesToSlide = Desktop;
      }  if (screenWidth <= 800) {
        newSlidesToSlide = tablet;
      } if(screenWidth <= 400) {
        newSlidesToSlide = mobile;
      }

      setSlidesToSlide(newSlidesToSlide);
    };

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Call handleResize initially to set the initial value
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 2000, min: 1060 },
      items: superLargeDesktop,
     
       //TODO-----this means in screen between(maxWidth:4000px,minWidth:3000px) => will have 6 items in your screen
    },
    Desktop: {
      breakpoint: { max:1060 , min:  800},
      items: Desktop,
      cols: 3
    },
    tablet: {
      breakpoint: { max: 800, min: 400 },
      items: tablet
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: mobile
    }
  };

  const CustomButtonGroup: React.FC<any> = ({ next, previous }) => (
    <div>
      <button className='bg-gray-800 p-4 text-white' onClick={previous}>Prev</button>
      <button className='bg-gray-800 p-4 text-white' onClick={next}>Next</button>
    </div>
  );
  
  return (
    <>
 <section className={`mt-20 space-y-12 ${width}`}>
  <Carousel
        customButtonGroup={<CustomButtonGroup /> as any}
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
        slidesToSlide={slidesToSlide}
        dotListClass="custom-dot-list-style"
      >
      {children}
    </Carousel>
 </section>  
  </>
  );
};

export default Slide;




// responsive={responsive}
// additionalTransfrom={0}
// arrows
// autoPlaySpeed={3000}
// centerMode={false}
// className=""
// itemClass="carousel-item"
// containerClass="carousel-container"
// dotListClass=""
// draggable
// focusOnSelect={false}
// infinite
// keyBoardControl
// minimumTouchDrag={80}
// renderButtonGroupOutside={false}
// renderDotsOutside={false}
// showDots
// sliderClass=""
// slidesToSlide={slidesToSlide}
// swipeable