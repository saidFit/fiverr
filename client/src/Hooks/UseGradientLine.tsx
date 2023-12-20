
type Props ={
    bottom:number,
    width:string,
    color:string
  }
  
   const UseGradianLine:React.FC<Props> = ({width = "w-full",bottom,color}) => {
    return <div  className={` h-[2px] ${width} ${color} absolute -bottom-${bottom} left-0 right-0`}/>
  }
  
  export default UseGradianLine;