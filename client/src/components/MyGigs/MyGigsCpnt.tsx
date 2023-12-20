import * as React from 'react';
import { MyGigs } from '../../data/data';

interface IMyGigsCpntProps {
}

const MyGigsCpnt: React.FunctionComponent<IMyGigsCpntProps> = (props) => {
  return(
    <section className='container mx-auto'>
        <div className='flex items-center justify-between'>
         <h1 className="h1">Gigs</h1>
         <button className='bg-green-600 py-1 px-3 rounded-md text-white text-center '>Add New Gig</button>
        </div>
        <div>
            {MyGigs.map((item,ind)=>{
                // const {}
                return(
                     <div></div>
                )
            })}
        </div>
    </section>
  );
};

export default MyGigsCpnt;
