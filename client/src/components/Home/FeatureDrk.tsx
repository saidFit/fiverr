import * as React from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

interface IFeatureDrkProps {
}

const FeatureDrk: React.FunctionComponent<IFeatureDrkProps> = (props) => {
  return(
    <div className=" my-20 p-12 bg-blue-900 text-white">
    <div className="container mx-auto flex MTwoCol items-center justify-between">
      <div className="space-y-4 w-full md:w-2/5">
        <h1 className='h1'>
          liverr <i className='font-[100]'>business</i>
        </h1>
        <h1 className='h1'>
          A business solution designed for <i>teams</i>
        </h1>
        <p className='p'>
          Upgrade to a curated experience packed with tools and benefits,
          dedicated to businesses
        </p>
        <div className="flex space-x-3 items-center">
          <span><IoMdCheckmarkCircleOutline size={20} /></span>
         <p className='p'>Connect to freelancers with proven business experience</p> 
        </div>

        <div className="flex space-x-3 items-center">
          <span><IoMdCheckmarkCircleOutline size={20} /></span>
         <p className='p'>Get matched with the perfect talent by a customer success manager</p> 
        </div>

        <div className="flex space-x-3 items-center">
          <span><IoMdCheckmarkCircleOutline size={20} /></span>
         <p className='p'>Manage teamwork and boost productivity with one powerful workspace</p> 
        </div>
        <button className='bg-green-600 rounded-md text-white px-4 p-2 transition-all duration-200 hover:bg-green-700'>Explore Liverr Business</button>
      </div>
      <div className="w-full md:w-2/5">
        <img
         className='w-full'
          src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
          alt=""
        />
      </div>
    </div>
  </div>
  );
};

export default FeatureDrk;
