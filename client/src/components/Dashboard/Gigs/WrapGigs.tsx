import * as React from 'react';
import Gigs from './Gigs';
import PostGig from './PostGig';

interface IWrapGigsProps {
}


const WrapGigs: React.FunctionComponent<IWrapGigsProps> = (props) => {
  React.useEffect(()=>{
 window.scrollTo({
    top: 300,
    behavior: "smooth",
  },);
  },[])
 
  return(
    <div>
        <Gigs/>
        <PostGig isEdit={false}/>
    </div>
  ) ;
};

export default WrapGigs;
