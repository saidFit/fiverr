import * as React from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import DashboardCom from '../components/Dashboard/Right/DashboardCom';
import UseLogic from '../Hooks/UseLogic';
import OrderGigsCom from '../components/Dashboard/Right/OrderGigsCom';
import WrapperMessage from '../components/Dashboard/Right/Messages/WrapperChat';
import WrapGigs from '../components/Dashboard/Gigs/WrapGigs';
import EarningWrap from '../components/Dashboard/Earning/EarningWrap';
import { useGlobalState } from '../context/context';


interface IDashboardProps {
}
type Data={
  id:number,
  name:string
}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
 const [Array,setArray] = React.useState<Data[]>([{id:2,name:'said'}])
 const [LessSidbar,setLessSidbar]   = React.useState<number>(3)
 const { IsEmpty } = UseLogic();
 const {typeClick,settypeClick} = useGlobalState()



  return(
    <section className='grid grid-cols-12 gap-4 min-h-full'>
      <Sidebar LessSidbar={LessSidbar} typeClick={typeClick} settypeClick={settypeClick}  setLessSidbar={setLessSidbar}/>
      <div style={{gridColumnStart:LessSidbar == 1 ? 2 : 3}} className={`col-end-13`}>
     {typeClick == 'Dashboard' && <DashboardCom/>} 
     {typeClick == 'Orders' && <OrderGigsCom/>}
     {typeClick == 'Messages' && <WrapperMessage/>}
     {typeClick == 'Gigs' && <WrapGigs/>}
     {typeClick == 'Earning' && <EarningWrap/>}
     </div>
    </section>
  );
};

export default Dashboard;
