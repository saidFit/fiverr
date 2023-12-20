import * as React from 'react';
import HeadEarning from './HeadEarning';
import RightBar from './RightBar';

interface IEarningWrapProps {
}

const EarningWrap: React.FunctionComponent<IEarningWrapProps> = (props) => {
  return(
     <div className=' container mx-auto grid grid-cols-12 gap-2 m-6 items-start'>
          <div className=' col-start-1 col-end-10'>
           <HeadEarning/> 
          </div>
          <div className=' col-start-10 col-end-13'>
            <RightBar/>
          </div>
          
     </div>
  );
};

export default EarningWrap;
