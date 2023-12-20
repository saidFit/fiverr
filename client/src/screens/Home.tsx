import * as React from 'react';
import Header from '../components/Home/Header';
import CatCard from '../components/Home/CatCard';
import Slide from '../components/Slide';
import Feature from '../components/Home/Feature';
import Emarketplace from '../components/Home/Emarketplace';
import FeatureDrk from '../components/Home/FeatureDrk';
import CatCard1 from '../components/Home/CatCard1';
import SlideComponent from '../components/Home/SlideComponent';




interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return(
    <div>
    <Header/>
    <CatCard/>
    <Feature/>
    <Emarketplace/>
    <FeatureDrk/>
    <CatCard1/>

    <SlideComponent/>
    </div>
    
  );
};

export default Home;
