import * as React from 'react';

interface IUseAlertProps {
    children: React.ReactNode;
    bg:string,
    text:string,
    borderColor:string
  }

const UseAlert: React.FunctionComponent<IUseAlertProps> = (props) => {
  return(
    <div className={`flex items-center space-x-2 fixed top-4 left-[50%] translate-x-[-40%] w-fit py-3 z-50 pl-3 pr-6 rounded-md bg-${props.bg} text-${props.text} border-l-4 border-${props.text}`}>
        <p className={`rounded-full flex items-center justify-center bg-${props.text} w-[20px] p-3 space-x-2 h-[20px] text-white`}>&#10003;</p>
      {props.children}  
    </div>
  );
};

export default UseAlert;
