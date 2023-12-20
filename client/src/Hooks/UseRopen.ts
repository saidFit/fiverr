import React from 'react'

export default function useRopen() {

  const handle = (popup:any,setOpen:React.Dispatch<React.SetStateAction<boolean>>) =>{
     const handleClick = (event:MouseEvent) => {
    if(popup.current && !popup.current.contains(event.target)){
      setOpen(false);
    }
  };
  document.addEventListener('click', handleClick);
  return () => {
  document.removeEventListener('click', handleClick);
  };}
 
  return {handle};
}
