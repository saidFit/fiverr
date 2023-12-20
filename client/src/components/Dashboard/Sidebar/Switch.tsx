import { useEffect } from "react";


interface SwitchProps{
    IsClick:boolean,
    setIsClick:React.Dispatch<React.SetStateAction<boolean>>,
    shadow?:string
}

const Switch: React.FunctionComponent<SwitchProps> = (props) => {
    const {IsClick,setIsClick} = props;
    useEffect(()=>{
      console.log(IsClick)
    },[IsClick])
  return (
    <div className={`relative ${props.shadow} inline-block w-8 h-5`}>
      <div onClick={()=> setIsClick(!IsClick)} className={`toggle-switch cursor-pointer transition-all duration-500 ${IsClick ? "bg-blue-400":"bg-gray-300"} w-full h-full  rounded-full relative overflow-hidden`}>
        <div
          className={`toggle-knob bg-white w-5 h-5 rounded-full shadow-md absolute -left-2 top-0 transform transition-transform duration-300 ${
            IsClick ? 'translate-x-full' : 'translate-x-2'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Switch;
