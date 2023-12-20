import * as React from "react";
import { SingleGig } from "../../data/data";
import Slide from "../Slide";
import { Like, Star, disLike } from "../../assets";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../../context/context";
import { EditReviewAction } from "../../redux/actions/gig";
import { Dispatch } from "redux";
import UserContact from "./UserContact";


interface ILeftGigProps {}

const LeftGig: React.FunctionComponent<ILeftGigProps> = (props) => {
  const {usersOline} = useGlobalState()
  const { gigs } = useSelector((state: any) => state.gighandle);
  const {user} = useSelector((state:any) => state.register);
  const [SingleGigg, setSingleGigg] = React.useState<any | null>(null);
  const [textReview,setTextReview] = React.useState<string>('')
  const { id } = useParams();
  const dispatch: Dispatch<any> = useDispatch();

  React.useEffect(() => {
    console.log(id);
    setSingleGigg(gigs.filter((item: any) => item._id === id));
    console.log(SingleGigg);
  }, [id,gigs]);

  const handleSubmit = (e:any) =>{
    e.preventDefault();
    console.log('click');
   dispatch(EditReviewAction(textReview, id || ''));
   setTextReview('')
  }

  const starsArray = new Array(4).fill(null);

  React.useEffect(() =>{
    
  })

  return (
    <section className="spacey-5 md:w-[70%] relative">
    {SingleGigg && SingleGigg[0].userId._id !== user.userData._id && <UserContact SingleGigg = {SingleGigg}/>} 
      {SingleGigg &&
        SingleGigg.map((item:any, ind:number) => {
          const {
            category,
            cover,
            createdAt,
            desc,
            images,
            price,
            reviews,
            sales,
            shortDesc,
            shortTitle,
            startNumber,
            subCategory,
            tags,
            title,
            totalStarts,
            userId: { firstName, img, lastName, _id,background },
          } = item;
          return (
            <div key={ind} className="space-y-4">
              <p className="p">FIVERR - GRAGHIQUE DESIGN</p>
              <span>&#x1F1F2;</span>
              <h1 className="h1">{title}</h1>

              <div className="flex w-full relative gap-2 items-center transition-all duration-200 hover:bg-green-200  p-2 border-b  border-gray-300">
                                   {!img ? (
                  <span className="relative w-fit">
                    <b
                      style={{ background: background }}
                      className={`flex justify-center w-10 h-10 items-center object-cover rounded-full`}
                    >
                      {`${firstName} ${lastName}`.substring(0, 1).toUpperCase()}
                    </b>
                    {usersOline.includes(_id) ? (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                    ) : (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                    )}
                  </span>
                ) : (
                  <div className="relative w-fit">
                    <img
                      className="flex justify-center flex-auto w-10 h-10 items-center object-cover rounded-full"
                      src={img}
                      alt=""
                    />
                    {usersOline.includes(_id) ? (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                    ) : (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                    )}
                  </div>
                )}
                  <div>
                    <b>{`${firstName} ${lastName}`}</b>

                  </div>
                      </div>



              <Slide
                superLargeDesktop={1}
                Desktop={1}
                tablet={1}
                mobile={1}
                width={"w-[700px]"}
              >
                {images.map((img:any, key:number) => {
                  return (
                    <div className="relative slider h-[350px]" key={key}>
                      <img
                        className="img absolute inset-0 w-full h-full z-0 object-cover"
                        src={img}
                        alt=""
                      />
                      <div className="space-y-1 p-2 text-white relative z-10"></div>
                    </div>
                  );
                })}
              </Slide>

              <article className="space-y-5">
                <div>
                  <b>About This Gig</b>
                  <p className="p">{desc}</p>
                </div>

                <article className="space-y-3">
                  <h1 className="h1">About The Seller</h1>
                </article>
              </article>

              <section className="border border-gray-400 rounded-md p-6">
                <article className="grid grid-cols-3 w-full justify-between">
                  <div className="space-y-4 col-span-2">
                    <div className="space-y-1">
                      <b>From</b>
                      <p className="p">USA</p>
                    </div>
                    <div className="space-y-1">
                      <b>From</b>
                      <p className="p">USA</p>
                    </div>
                    <div className="space-y-1">
                      <b>From</b>
                      <p className="p">USA</p>
                    </div>
                  </div>

                  <div className="space-y-4 col-span-1">
                    <div className="space-y-1">
                      <b>member since</b>
                      {/* <p className="p">{Member_since}</p> */}
                    </div>
                    <div className="space-y-1">
                      <b>From</b>
                      {/* <p className="p">{From}</p> */}
                    </div>
                    <div className="space-y-1">
                      <b>From</b>
                      {/* <p className="p">{From}</p> */}
                    </div>
                  </div>
                </article>
                <p className="p border-t border-gray-400 pt-3 mt-3">
                  {desc}
                </p>
              </section>

              <section className="space-y-5">
                <form onSubmit={handleSubmit} className="space-x-3 w-full flex">
                  <input onChange={(e)=>setTextReview(e.target.value)} className="outline-none border flex-1 border-gray-300 rounded-md py-2 px-3" type="text" name="" id="" placeholder="leave a review..."/>
                  <button className="bg-green-500 flex-shrink py-2 px-3 rounded-md text-white">add</button>
                </form>
                <h1 className="h1">Reviews</h1>
                <div>
                  {reviews.map((item:any, ind:number) => {
                    const {
                      comment,
                      userId:{firstName,lastName,img,background}
                    } = item;
                    return (
                      <div key={ind} className="space-y-6">
                        <div className="flex space-x-2 items-center">
                          
                           <div className="flex w-full relative gap-2 items-center transition-all duration-200 hover:bg-green-200  p-2 border-b  border-gray-300">
                                   {!img ? (
                  <span className="relative w-fit">
                    <b
                      style={{ background: background }}
                      className={`flex justify-center w-10 h-10 items-center object-cover rounded-full`}
                    >
                      {`${firstName} ${lastName}`.substring(0, 1).toUpperCase()}
                    </b>
                    {usersOline.includes(_id) ? (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                    ) : (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                    )}
                  </span>
                ) : (
                  <div className="relative w-fit">
                    <img
                      className="flex justify-center flex-auto w-10 h-10 items-center object-cover rounded-full"
                      src={img}
                      alt=""
                    />
                    {usersOline.includes(_id) ? (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
                    ) : (
                      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-1 border-white rounded-full"></span>
                    )}
                  </div>
                )}
                  <div>
                    <b>{`${firstName} ${lastName}`}</b>
                    <div>
                            {/* <b>{name}</b> */}
                            <div className="flex items-center space-x-2">
                              <img
                                className="w-[20px]"
                                src={''}
                                alt="img"
                              />
                              <p className="p">morocco</p>
                            </div>
                          </div>

                  </div>
                     
                      </div>
                       
                        </div>

                        <div className="flex items-center space-x-2">
                          {starsArray.map((_, ind) => {
                            return (
                              <img
                                key={ind}
                                className="w-[14px]"
                                src={Star}
                                alt="star"
                              />
                            );
                          })} 
                         <b>{starsArray.length}</b>
                        </div>

                        <p className="p">{comment}</p>

                        <div className="flex items-center space-x-3">
                          <b>Helpful?</b>
                          <img className="w-[14px]" src={Like} alt="lik" />
                          <p>yes</p>
                          <img
                            className="w-[14px]"
                            src={disLike}
                            alt={disLike}
                          />
                          <p>no</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          );
        })}
    </section>
  );
};

export default LeftGig;
