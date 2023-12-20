import * as React from 'react';
import CardProfile from '../CardProfile';
import { OrdersGigs } from '../../../data/data';

interface IOrderGigsComProps {
}

const OrderGigsCom: React.FunctionComponent<IOrderGigsComProps> = (props) => {
  return(
    <section className='flex gap-4 md:space-x-12 px-4 py-12'>
        <CardProfile/>
        
<div className="relative overflow-x-auto shadow-md sm:rounded-lg md:w-[60%]">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    in Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {OrdersGigs.map((item,ind ) =>{
                const { id,
                    imgGig,
                    imageCustomer,
                    price,
                    create_at,
                    status,
                    textColor,
                    bgColor,} = item;
                return(
                   <tr key={ind} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" >
                    <div className='flex space-x-3 items-center'>
                        <img className='w-[50px] h-[50px] object-cover' src={imgGig} alt="" />
                        <img className='w-[35px] h-[35px] object-cover rounded-full' src={imageCustomer} alt="" />
                       
                    </div>
                </th>
                <td className="px-6 py-4">
                   ${price}
                </td>
                <td className="px-6 py-4">
                    {create_at}
                </td>
                <td className={` my-auto`}>
                    <span  className='block text-AlertColor-Success-TextSuccess bg-AlertColor-Success-BgSuccess text-center py-1 rounded-full'> {status}</span>
                   
                </td>
                

                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr> 
                )
            })}
            
           
        </tbody>
    </table>
</div>

     </section>
  );
};

export default OrderGigsCom;
