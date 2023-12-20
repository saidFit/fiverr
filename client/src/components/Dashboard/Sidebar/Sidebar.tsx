import * as React from 'react';
import { SidebarDash } from '../../../data/data';
import { GrFormPrevious } from 'react-icons/gr';
import Switch from './Switch';
import { useGlobalState } from '../../../context/context';


type Data={
    
        name:string,
        icon: JSX.Element,
    
}

interface ISidebarProps {
  LessSidbar:number,
  setLessSidbar:React.Dispatch<React.SetStateAction<number>>
  typeClick:string,
  settypeClick:React.Dispatch<React.SetStateAction<string>>
}

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {

    const [ListSidebar,setListSidebar] = React.useState<Data[]>(SidebarDash)
    const {IsSame,setIsSame} = useGlobalState()
    const [IsClick,setIsClick] = React.useState<boolean>(false);
    const handleChnage = (ind:number,name:string) =>{
         setIsSame(ind);
         props.settypeClick(name);
    }


  return(
    <section style={{gridColumnEnd:props.LessSidbar}} className={`bg-gray-50 cursor-pointer relative shadow-md min-h-full p-6 py-12 flex flex-col col-start-1 space-y-5`}>
        <button onClick={() => props.setLessSidbar(props.LessSidbar == 3 ? 1 : 3)} className='absolute top-2 right-2 bg-gray-100 rounded-md p-1'><GrFormPrevious className={`transform transition-transform duration-500 ${
        props.LessSidbar == 1 ? 'rotate-180' : 'rotate-0'
      }`} size={25}/></button>
        <Switch IsClick={IsClick} setIsClick={setIsClick}/>
       {ListSidebar.map((item,ind)=>{
        return(
            <div key={ind} onClick={() => handleChnage(ind,item.name)} className={`relative parent-item-sidebar flex items-center ${props.LessSidbar == 1 ? 'justify-center':''} py-2 space-x-3`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${IsSame == ind ? 'w-full':'w-0'} from-[#ffffff40] to-green-200 border-r-2 border-green-600`}>
                </div>
               <span className=' opacity-75'>{item.icon}</span>
               {props.LessSidbar !=1 && <button className='p' key={ind}>{item.name} </button>}
                
            </div>
           
        )
       })} 
    </section>
  ) ;
};

export default Sidebar;
