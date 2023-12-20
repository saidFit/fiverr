import * as React from 'react';

interface IActionsOrdersProps {
}

const ActionsOrders: React.FunctionComponent<IActionsOrdersProps> = (props) => {
  return(
    <div className='flex w-full justify-between items-center'>
      <article className='space-y-4'>
        <div className='flex space-x-3 items-center'>
          <p>Withdrown</p>
          <div className='flex items-center space-x-3'>
           <button className='border border-gray-300 rounded-md py-2 px-4'>Paypal</button>
           <button className='border border-gray-300 rounded-md py-2 px-4'>Bank Transfer</button>
          </div>
        </div>

        <div className='flex space-x-3 items-center'>
          <p>Show</p>
          <div className='flex space-x-3'>

        <select id="countries" className="bg-gray-200 space-y-3 w-[24%] p-3 outline-none cursor-pointer transition-all duration-300 hover:bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg ">
            <option value="Select a category" disabled selected>EveryThing</option>
            <option className='font-bold' value="Graphics & Design" >Graphics & Design</option>
            <option className='font-bold' value="Digital Marketing">Digital Marketing</option>
         </select>

          <select id="countries" className="bg-gray-200 space-y-3 w-[24%] p-3 outline-none cursor-pointer transition-all duration-300 hover:bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg ">
            <option value="Select a category" disabled selected>2023</option>
            <option className='font-bold' value="Graphics & Design" >Graphics & Design</option>
            <option className='font-bold' value="Digital Marketing">Digital Marketing</option>
         </select>

          <select id="countries" className="bg-gray-200 space-y-3 w-[24%] p-3 outline-none cursor-pointer transition-all duration-300 hover:bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg ">
            <option value="Select a category" disabled selected>All Month</option>
            <option className='font-bold' value="Graphics & Design" >Graphics & Design</option>
            <option className='font-bold' value="Digital Marketing">Digital Marketing</option>
         </select>

          </div>
         

       

        </div>
      </article>  

      <button className='bg-green-500 text-white py-2 px-4 rounded-md'>Get Startement of Earnings</button>
    </div>
  );
};

export default ActionsOrders;
