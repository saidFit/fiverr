import * as React from 'react';
import { gigsSaller } from '../../../data/data';
import UseGradianLine from '../../../Hooks/UseGradientLine';
import CardProfile from '../CardProfile';
import { useSelector } from 'react-redux';
interface IDashboardComProps {
 
}

const DashboardCom: React.FunctionComponent<IDashboardComProps> = (props) => {
 
  const [Paused,setPaused]   = React.useState<boolean>(false);
  const [ActiveGigs,setActiveGigs] = React.useState<boolean>(true);
  const {user} = useSelector((state:any) => state.register);

  // React.useEffect(()=>{
  //     console.log(ActiveGigs,Paused)
  // },[ActiveGigs])

  
  return(
    <section className='flex gap-4 md:space-x-12 px-4 py-12'>
        <CardProfile/>
        <section className='w-[58%] space-y-7'>
        <div className='w-full bg-white shadow-md border border-gray-300 rounded-md p-3 flex space-x-8'>
            <div onClick={() => {setActiveGigs(!ActiveGigs)
             setPaused(!Paused)}} className='w-fit relative'>
            <button>ACTIVES GIGS</button>
            {ActiveGigs &&<UseGradianLine color='bg-green-600' bottom={12} width={''}/>}
            </div>
            <div onClick={() => {setActiveGigs(!ActiveGigs)
             setPaused(!Paused)}} className='w-fit relative'>
            <button>PAUSED</button>
            {Paused &&<UseGradianLine color='bg-green-600' bottom={12} width={''}/>}
            </div>
            
            
          </div>
           <article className='grid grid-cols-3 gap-4'>
          {gigsSaller.map((item,ind) =>{
            return(
              <div key={ind} className='space-y-12 shadow-md border border-gray-300'>
                <div>
                <img className='w-full h-[120px] object-cover' src={item.img} alt={item.title} />
                <p className="p m-2">{item.title}</p>
                </div>
               
                <div className='p-2 flex justify-between items-center px-3'>
                  <span>p</span>
                  <span className='flex space-x-2 items-center'><p className='text-green-600'>STARTING AT</p><b>${item.price}</b></span>
                </div>
              </div>
            )
          })}
        </article>
        </section>
       
    </section>
  ) ;
};

export default DashboardCom;
