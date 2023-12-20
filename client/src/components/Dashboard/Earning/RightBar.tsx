import * as React from 'react';

interface IRightBarProps {
}

const RightBar: React.FunctionComponent<IRightBarProps> = (props) => {
  return(
    <section className='bg-white p-7 border border-gray-300 rounded-md space-y-5'>
        <input className='border border-gray-300 rounded-md py-2 px-4 outline-none' type="text" placeholder='Search Activities' />
        <div className='space-y-2 flex flex-col items-start'>
        <button className='text-green-500 transition-all duration-200 hover:text-green-600'>Manage Sales</button>
        <button className='text-green-500 transition-all duration-200 hover:text-green-600'>Analytics</button>
        <button className='text-green-500 transition-all duration-200 hover:text-green-600'>My Gigs</button>  
        </div>
        
        <div>
            <p>Actions</p>
            <button className='bg-green-600 text-white py-2 px-4 rounded-md'>Create Gigs</button>
        </div>
    </section>
  );
};

export default RightBar;
