import * as React from 'react';
import LeftGig from '../components/SingleGig/LeftGig';
import Right from '../components/SingleGig/Right';

interface ISingleGigProps {
  Active:boolean,
}

const SingleGig: React.FunctionComponent<ISingleGigProps> = (props) => {
  return(
    <section className='container mx-auto py-7 flex gap-4 items-start'>
        <LeftGig/>
        <Right Active={props.Active}/>
    </section>
  ) ;
};

export default SingleGig;
