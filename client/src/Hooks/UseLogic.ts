// import { useGlobalState } from "../context/context";

interface IUseLogicProps {
    IsEmpty: (array: Data[] | null) => boolean;
  }
  type Data = {
    id: number;
    name: string;
  }
  
  

  export const getRandomColor = ():string =>{
      const Colors:string[] = ["#ff7675"," #74b9ff","#55efc4","#fdcb6e","#a29bfe","#a29b"]
      const randomNb = Math.floor(Math.random()*6);
      return Colors[randomNb];
  }

  
  function UseLogic(): IUseLogicProps {
    // Implement your custom hook logic here
    function IsEmpty(array: Data[] | null): boolean {
      // Implement the logic to check if the array is empty
      return array?.length === 0;
    }
  
    // Other properties and methods of your custom hook
    return {IsEmpty};
  }
  


  export default UseLogic;