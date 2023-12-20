import * as React from 'react';
import useState from 'react';
import { Down } from '../../assets';
import useRopen from '../../Hooks/UseRopen';
interface ISelectProps {
}

enum ShapeKind {
    Sales="sales",
    BestSelling="Best Selling",
    Newest="Newest"
  }

const Select: React.FunctionComponent<ISelectProps> = (props) => {
    const [sort, setSort] = React.useState<string>(ShapeKind.Sales); //todo---ShapeKind[Shapekind.Sales] if you have just enum key
    const [open, setOpen] = React.useState<boolean>(false);
    const minRef = React.useRef<any>(null);
    const maxRef = React.useRef<any>(null);
    const popup  = React.useRef<any>(null);
    const {handle} = useRopen();
    const reSort = (type:string) => {
      setSort(type);
      setOpen(false);
    };
  
    const apply = ()=>{
      console.log(minRef.current.value)
      console.log(maxRef.current.value)
    }


    React.useEffect(() => {
      handle(popup,setOpen)
    },);


  return(
   <section className='space-y-4 mt-5'>
     <span className="p">Liverr - Graphics & Design -</span>
        <h1 className='h1'>AI Artists</h1>
        <p className='p'>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu flex justify-between items-center">
          <div className="left space-x-3">
            <span>Budget</span>
            <input className='borde border-gray-300 rounded-md mr-3 p-1 outline-none' ref={minRef} type="number" placeholder="min" />
            <input className='borde border-gray-300 rounded-md mr-3 p-1 outline-none' ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply} className=' bg-green-600 rounded-md px-3 py-1 text-white'>Apply</button>
          </div>


          <div ref={popup} className="relative right flex space-x-3 items-center">
            <span className="sortBy">Sort by</span>
            <span className="font-[600]">
              {sort === "sales" ? ShapeKind.BestSelling : ShapeKind.Newest}
            </span>
            <img className='w-[20px] h-[20px] cursor-pointer' src={Down} alt="" onClick={()=>setOpen(!open)}/>
            {open && (
              <div className="rightMenu absolute right-0 flex flex-col bg-gray-50 shadow-MyBox p-2 space-y-4 top-9">
                {sort === "sales" ? (
                  <span className='px-4 transition-all duration-300 hover:bg-gray-300 cursor-pointer' onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span className='px-4 transition-all duration-300 hover:bg-gray-300 cursor-pointer' onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span className='px-4 transition-all duration-300 hover:bg-gray-300 cursor-pointer' onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>

        </div>
   </section>
  );
};

export default Select;
