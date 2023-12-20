import * as React from 'react';
import UseGradianLine from '../../../Hooks/UseGradientLine';
import ActionsOrders from './ActionsOrders';
import OrdersEarning from './OrdersEarning';

interface IHeadEarningProps {
}

const HeadEarning: React.FunctionComponent<IHeadEarningProps> = (props) => {
  return(
    <section className='space-y-6 container mx-auto p-3 bg-white rounded-md shadow-MyBox1'>
      <div className='flex items-center justify-between p-4'>
        <div className='relative'>
           <h1 className="h1">Earning</h1>
           <UseGradianLine color='bg-green-600' bottom={12} width={''}/>
        </div>
        <p className='p'>Expected Earning <strong>$304</strong></p>
      </div>
     <div className='bg-white border border-gray-300 rounded-md flex p-4 items-center flex-wrap'>
      <div className='border-l border-gray-400 py-5 space-y-3 px-7 flex-1'>
        <p className="p">Earning</p>
         <p className='opacity-90 font-[500] text-xl'>$200</p>
      </div>
      <div className='border-l border-gray-400 py-5 space-y-3 px-7 flex-1'>
       <p className="p">Withdrawn</p>
      <p className='opacity-90 font-[500] text-xl'>$13.50</p>
      </div>
      <div className='border-l border-gray-400 py-5 space-y-3 px-7 flex-1'>
       <p className="p">used for Purchases</p>
      <p className='opacity-90 font-[500] text-xl'>$120.40</p>
      </div>
      <div className='border-l border-gray-400 py-5 space-y-3 px-7 flex-1'>
       <p className="p">Panding Clearance</p>
      <p className='opacity-90 font-[500] text-xl'>$90.30</p>
      </div>
      <div className='border-l border-gray-400 py-5 space-y-3 px-7 flex-1'>
       <p className="p">Available for Withdrawn</p>
       <p className='opacity-90 font-[500] text-xl'>$190.20</p>
      </div>
      
    </div> 
    <ActionsOrders/>
    <OrdersEarning/>
    </section>
    
  );
};

export default HeadEarning;
