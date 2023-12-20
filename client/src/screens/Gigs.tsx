import * as React from 'react';
import Select from '../components/Gigs/Select';
import Gig  from '../components/Gigs/Gig';
interface IGigsProps {
}

const Gigs: React.FunctionComponent<IGigsProps> = (props) => {
  return(
    <div className='container mx-auto'>
   <Select/>
   <Gig/>
    </div>
    
  ) ;
};

export default Gigs;
