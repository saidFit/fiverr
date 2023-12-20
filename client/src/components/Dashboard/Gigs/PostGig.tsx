import * as React from "react";
import { BiMessageSquareDots } from "react-icons/bi";
import { BsCloudUpload, BsImages } from "react-icons/bs";
import { options } from "../../../data/data";
import { ImProfile } from "react-icons/im";
import { upload, uploadImages } from "../../../utils/upload";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { GetAllGigsOfSeller, InsertGigAction,EditGigAction } from "../../../redux/actions/gig";
import UseAlert from "../../../Hooks/UseAlert";
import io from 'socket.io-client'
import { useGlobalState } from "../../../context/context";
const endpoint = "http://localhost:5000";
let socket:any;
interface IPostGigProps {
     isEdit:boolean,
     gig?:any
}

type ImageFile ={
AllImages:boolean | null,
firstThreeImage:boolean | null
}

type Gig = {
  title:string,
  shortTilte:string,
  category:string,
  subCategory:string,
  tags?:string,
  desc:string,
  shortDesc:string,
  price:number | null,
}

const PostGig: React.FunctionComponent<IPostGigProps> = (props) => {

  const dispatch:Dispatch<any> = useDispatch();

  const [selectedImages, setSelectedImages] = React.useState<any>(props.gig?.images || []);
  const [selectedCover, setSelectedCover] = React.useState<any>(props.gig?.cover||null);
  const [ShowAllImagesFile,setShowAllImagesFile] = React.useState<ImageFile | null>(null);
  const [tagsQuery,settagsQuery] = React.useState<any>([]);
  const [tagsSelected,setTagesSelected] = React.useState<any[]>([])
  const [loadingButton,setloadingButton] = React.useState<boolean>(false)
  const [IsShowAlert,setIsShowAlert]  = React.useState<boolean>(false);
  const {user} = useSelector((state:any) => state.register);
  const [tagsExiste,setTagsExiste] = React.useState<any>([ 
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Music & Audio",
    "Programming & Tech",
    "Business",
    "Lifestyle",
    "Industries"])

    React.useEffect(()=>{
      console.log(selectedCover,selectedImages,ShowAllImagesFile,props.gig)
    },[selectedCover,selectedImages,ShowAllImagesFile])
  const [gig,setGig] = React.useState<Gig>({
    title:'',
    shortTilte:'',
    category:'',
    subCategory:'',
    desc:'',
    shortDesc:'',
    price:null,
  })
  const {isValidInsertGig,setIsValidInsertGig} = useGlobalState();
  const [title,setTitle] = React.useState<string>(props.gig?.title || '');
  const [shortTitle,setshortTittle] = React.useState<string>(props.gig?.shortTitle || '');
  const [category,setcategory] = React.useState<string>(props.gig?.category || 'Select a category');
  const [subCategory,setsubCategory] = React.useState<string>(props.gig?.subCategory || 'Select a subCategory');
  const [desc,setdesc] = React.useState<string>(props.gig?.desc || '');
  const [shortDesc,setshortDesc] = React.useState<string>(props.gig?.shortDesc || '');
  const [price,setprice] = React.useState<string | number>(props.gig?.price || '');
  const [publishedGig,setpublishedGig] = React.useState<string | null>(null)

  const handleFileMultiple = (event: any) => {
    //todo----here as a object like : fiLeList {0:File,1:File}
    const files = event.target.files;
    // todo----converted to an array using Array.from----// here do as [File,File]
    const selectedFiles = Array.from(files);
    setSelectedImages([...selectedImages, ...selectedFiles]);
  };

  const handleFileCover = (event: any) => {
    setSelectedCover(event.target.files[0]);
  };


  const handleChange = (e: any) => {
    if (e.target.name === 'tags') {
      const upperValue: string = e.target.value.toUpperCase();
      settagsQuery(tagsExiste.filter((item: string) => item.toUpperCase().includes(upperValue)));
    }
    // setGig((prev) => {
    //   return { ...prev, [e.target.name]: e.target.value };
    // });
  };

  const handleSubmit = async (event: any) => {
    const buttonSubmit : string = event.target.querySelector('button').textContent
    setloadingButton(true)
    event.preventDefault();
    const url:string = await upload(selectedCover);
    const urls : string[] | undefined = await uploadImages(selectedImages);
     const gigSent = {title,shortTitle,category,subCategory,desc,shortDesc,price};
    if(buttonSubmit === 'Edit'){
      dispatch(EditGigAction(props?.gig,gigSent,tagsSelected,url,urls))
      setloadingButton(false)
      return;
    }
    setIsValidInsertGig(false);
    dispatch(InsertGigAction(gigSent,tagsSelected,url,urls,setIsValidInsertGig,setpublishedGig))
    setloadingButton(false)
    setIsShowAlert(true);
    setTimeout(() => {
      setIsShowAlert(false)
    }, 600);
    socket = io(endpoint);
    // if(isValidInsertGig) return 
   
  };

  React.useEffect(()=>{
     dispatch(GetAllGigsOfSeller());
  },[])
  
  React.useEffect(() =>{
   if(isValidInsertGig && publishedGig){
     socket.emit("publishedGig", user?.userData,publishedGig);
   }
  },[isValidInsertGig,publishedGig])
  

  React.useEffect(()=>{
    if(props.gig){
      setTagesSelected(props.gig.tags)
    }
  },[props.gig])
  return (
    <section className={`flex gap-6 items-start ${!props.isEdit?'my-20':''}`}>
      {IsShowAlert && (
         <UseAlert text="AlertColor-Success-TextSuccess" bg="AlertColor-Success-BgSuccess" borderColor="AlertColor-Success-BorderSuccess">
        <div>
        <b>gig has been creating successfully.</b>
        </div>
      </UseAlert>
      )}
      <div className=" w-full rounded-md border border-gray-300 bg-white p-4">
        <form onSubmit={handleSubmit} className="space-y-7">
          <article className="space-y-2 w-2/3">
            <div className="flex space-x-3">
              <span className="flex-auto">Title Gig</span>
              <textarea
                cols={30}
                rows={2}
                maxLength={40}
                value={title}
                name="title"
                className="w-[85%] resize-none outline-none border border-gray-400 rounded-sm py-2 px-4"
                placeholder="Write the Title of your Gig..."
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
            </div>
            <div className="flex space-x-1">
              <span className="flex-auto">Short title</span>
              <textarea
                cols={30}
                rows={2}
                name="shortTitle"
                value={shortTitle}
                maxLength={40}
                className="w-[85%] resize-none outline-none border border-gray-400 rounded-sm py-2 px-4"
                placeholder="Write the Title of your Gig..."
                onChange={(e) => setshortTittle(e.target.value)}
              ></textarea>
            </div>
            <p style={{ marginLeft: "auto" }} className="p w-fit mt-2">
              0 / 40 max
            </p>
          </article>

          <article className="space-x-6 flex w-2/3 items-center">
            <p>Category</p>
            <div className="flex space-x-2 w-full">
              <select
              onChange={(e) => setcategory(e.target.value)}
                name="category"
                id="countries"
                value={category}

                className="bg-gray-200 space-y-3  w-full p-3 outline-none cursor-pointer transition-all duration-300 hover:bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg "
              >
                <option value="Select a category" disabled>
                  Select a category
                </option>
                <option className="font-bold" value="Graphics & Design">
                  Graphics & Design
                </option>
                <option className="font-bold" value="Digital Marketing">
                  Digital Marketing
                </option>
                <option className="font-bold" value="Writing & Translation">
                  Writing & Translation
                </option>
                <option className="font-bold" value="Video & Animation">
                  Video & Animation
                </option>
                <option className="font-bold" value="Music & Audio">
                  Music & Audio
                </option>
                <option className="font-bold" value="Programming & Tech">
                  Programming & Tech
                </option>
                <option className="font-bold" value="Business">
                  Business
                </option>
                <option className="font-bold" value="Lifestyle">
                  Lifestyle
                </option>
                <option className="font-bold" value="Industries">
                  Industries
                </option>
              </select>
              <select
  
              onChange={(e) => setsubCategory(e.target.value)}
                id="countries"
                name="subCategory"
                value={subCategory}
                className="bg-gray-200 w-full page-container p-3 outline-none cursor-pointer transition-all duration-300 hover:bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg "
              >
                <option value="Select a category" disabled>
                  Select a subCategory
                </option>
                {options.map((option) => (
                  <optgroup key={option.category} label={option.category}>
                    {option.subOptions.map((subOption) => (
                      <option key={subOption.value} value={subOption.value}>
                        {subOption.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </article>

          <div className="space-x-5 w-2/3">
            <div className="flex flex-col relative items-center">
            <div className="flex">
            <span className="flex-auto">Search a Tags</span>
              <input
              name="tags"
              onChange={handleChange}
                className="py-2 px-4 outline-none border border-gray-400 rounded-md w-[80%]"
                placeholder="#web delopement..."
                type="text"
              />
            </div>
              
              {tagsQuery.length !=0 && (
                <div className="absolute top-[36px] z-40 flex right-0 w-[80%] items-end justify-end">
                  <span onClick={()=>settagsQuery([])} className="bg-gray-300 rounded-full p-2 cursor-pointer w-[23px] text-xl h-[23px] flex justify-center items-center absolute top-1 right-0 shadow-MyBox1">x</span>
                 <div className="bg-white my-3 flex flex-col rounded-md shadow-MyBox1 w-full border border-gray-400">
                {tagsQuery.map((item:string,ind:number) =>{
                  return(
                    <span key={ind} onClick={() => {
                    //todo---prev is not iterable" suggests that the prev parameter in your code is not an array as expected.----//
                        setTagesSelected((prev: any) => {
                        if (Array.isArray(prev) && !prev.find((it) => it === item) && prev.length < 5) {

                          return [...prev, item];
                        } else {
                           if(prev?.length <= 5){
                            return [...prev];
                           }
                           return[...prev]
                          
                        }
                      });
                      
                      
                      settagsQuery([]); // Clear tagsQuery state
                    }} className="p-2 cursor-pointer w-full text-start hover:bg-gray-300" >{item}</span>
                  )
                })}
              </div>  
                </div>
             
              )}
             
             <div className=" grid grid-cols-2 justify-start gap-2 my-2 flex-wrap  w-full">
             {tagsSelected && (
              tagsSelected.map((item:string,ind:number) =>{
                return(
                  <div  key={ind} className="bg-gray-300 relative text-[7px] flex-1 pr-4 rounded-lg p-2">
                    <p>
                     {item} 
                    </p>
                    <span onClick={() => setTagesSelected(tagsSelected.filter((el) => el !== item))} className="absolute right-1 top-1 cursor-pointer bg-gray-400 rounded-full p-2 w-[7px] h-[7px] flex justify-center items-center">x</span>
                  </div>
                )
              })
             )} 
             </div>
             
            </div>
            <p style={{ marginLeft: "auto" }} className="p w-fit mt-2">
              5 Tags maximun use by this proved element...
            </p>
          </div>

          <article className="space-y-2 w-2/3">
            <div className="flex space-x-3">
              <span className="flex-auto">Description Gig</span>
              <textarea
              onChange={(e) => setdesc(e.target.value)}
              name="desc"
                cols={30}
                rows={5}
                maxLength={80}
                className="w-[85%] resize-none outline-none border border-gray-400 rounded-sm py-2 px-4"
                placeholder="Write the desc of your Gig..."
                value={desc}
              ></textarea>
            </div>
            <div className="flex space-x-4">
              <span className="flex-auto">shortDesc Gig</span>
              <textarea
              onChange={(e) => setshortDesc(e.target.value)}
              name="shortDesc"
                cols={30}
                rows={5}
                maxLength={80}
                className="w-[85%] resize-none outline-none border border-gray-400 rounded-sm py-2 px-4"
                placeholder="Write the desc of your Gig..."
                value={shortDesc}
              ></textarea>
            </div>
            <p style={{ marginLeft: "auto" }} className="p w-fit mt-2">
              0 / 80 max
            </p>
          </article>

          <div className="flex flex-col space-x-2 mx-auto w-2/3">
            <p>Gig cover</p>
            <label className="flex w-full flex-col items-center px-6 py-4 bg-gray-200 border border-gray-400 rounded-md cursor-pointer">
              {/* <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" /> */}
              <span className="opacity-30">
                <ImProfile size={90} />
              </span>
              <span>Select a cover</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileCover}
              />
            </label>
            <div className="flex mt-2 justify-center">
              {selectedCover && (
                 <img
              className="w-[250px] border border-gray-400 p-2 h-[80px] object-cover rounded-sm"
              src={typeof selectedCover === 'string' ? selectedCover : URL.createObjectURL(selectedCover)}
              alt={`Image`}
            /> 
              )}
            
            </div>
            
            <p>Gig images</p>
            <label className="flex w-full flex-col items-center px-6 py-4 bg-gray-200 border border-gray-400 rounded-md cursor-pointer">
              <span className="opacity-30">
                <BsImages size={90} />
              </span>
              <span>Select images</span>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileMultiple}
              />
            </label>

            {ShowAllImagesFile ? (
               <div className="flex my-5 w-full flex-wrap items-center gap-3">
               {selectedImages.map((image: any, index: any) => {
                return <img
                onClick={() => setSelectedImages(selectedImages.filter((item:any,ind:any) =>ind != index )) }
                   className="w-[50px] h-[50px] object-cover rounded-sm"
                   key={index}
                   src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                   alt={`Image ${index}`}
                 />
                   })}
                  
                  <button onClick={() => setShowAllImagesFile({AllImages:false,firstThreeImage:true})} className="bg-gray-300 rounded-full p-1"><GrFormPreviousLink size={18}/></button>
             </div>
            ):(
              <div className="flex my-5 w-full flex-wrap items-center gap-3">
              {selectedImages.map((image: any, index: number) => {
                if(index >= 4){
                   
                   return
                }
                if(selectedImages.length > 4 && index == 3){
                  return <div onClick={() => setShowAllImagesFile({AllImages:true,firstThreeImage:false})} key={index} className="relative cursor-pointer rounded-full">
                      <img 
                  className="w-[50px]  border-3 border-green-800 h-[50px] object-cover rounded-full"
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                />
                <div key={index} className="bg-[#0000008f] rounded-full flex justify-end px-1 items-center text-white absolute inset-0">
                  <span className="bg-gray-300 rounded-full p-1"><GrFormNextLink size={12}/></span>
                </div>
                  </div>
                 
                }
               return <img
               onClick={() => setSelectedImages(selectedImages.filter((item:any,ind:any) =>ind != index )) }
                  className="w-[50px] h-[50px] object-cover rounded-sm"
                  key={index}
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                />
})}
            </div>
            )}

            
          </div>

          <div className="space-x-5 w-2/3">
            <div className="flex flex-col space-y-2">
              <span className="flex-auto">
                Gig Price($) recommended not grand than 150$
              </span>
              <input
              onChange={(e) => setprice(e.target.value ? parseInt(e.target.value):e.target.value)}
              name="price"
                className="py-2 px-4 outline-none border border-gray-400 rounded-md w-[80%]"
                type="text"
                value={price}
              />
            </div>
            <p style={{ marginLeft: "auto" }} className="p w-fit mt-2">
              5 Tags maximun use by this proved element...
            </p>
          </div>

          {props.isEdit ? 
          
          loadingButton ? (
            <button disabled type="button" className=" text-AlertColor-Primary-TextPrimary bg-AlertColor-Primary-BgPrimary border border-AlertColor-Primary-BorderPrimary flex opacity-80 items-center transition-colors duration-300  py-3 text-lg px-6 w-fit font-[600] rounded-md">
            <svg aria-hidden="true" role="status" className="inline w-5 h-5 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#000"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
           Edit
        </button>
          ):(
            <button className="text-AlertColor-Primary-TextPrimary bg-AlertColor-Primary-BgPrimary border border-AlertColor-Primary-BorderPrimary transition-colors duration-300 hover:bg-blue-300 py-3 text-lg px-6 w-fit font-[600] rounded-md">
            Edit
          </button>
          )

          :
          
          loadingButton ? (
            <button disabled type="button" className="bg-green-500 flex items-center transition-colors opacity-80 duration-300 py-3 text-lg px-6 w-fit font-[600] rounded-md text-white">
            <svg aria-hidden="true" role="status" className="inline w-5 h-5 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Create
        </button>
          ):(
            <button className="bg-green-500 transition-colors duration-300 hover:bg-green-600 py-3 text-lg px-6 w-fit font-[600] rounded-md text-white">
            Create
          </button>
          )
          }
          
          
          
        </form>
      </div>
      <div className="bg-white relative rounded-md space-y-7 p-4 border border-gray-300">
        <p className="text-xl font-bold opacity-80">Describe your Gig</p>
        <p className="p">
          This is your Gig Title Please Choose Wistly,you can oly use 80
          characters.
        </p>
        <span className="mx-auto block w-fit opacity-50">
          <BiMessageSquareDots size={220} />
        </span>
        <div className="space-y-2">
          <p className="w-full h-[6px] rounded-full bg-gray-300"></p>
          <p className="w-[80%] h-[6px] rounded-full bg-gray-300"></p>
        </div>

        <span className="flish"></span>
      </div>
    </section>
  );
};

export default PostGig;
