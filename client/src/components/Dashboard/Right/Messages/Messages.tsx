import * as React from 'react';
import { useGlobalState } from '../../../../context/context';
import { SelectConv, emptyMessage } from '../../../../assets';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { formatDistanceToNow } from 'date-fns';
interface IScrollableProps {
}

const Scrollable: React.FunctionComponent<IScrollableProps> = (props) => {

    const conversationRef = React.useRef<HTMLDivElement>(null);
    const {user} = useSelector((state:any) => state.register);
    const {conversations,messageNotification,notification,conversationSelect,loading,setLoading,setconversationSelect,ConvMessages,setConvMessages} = useGlobalState()
    React.useEffect(() => {
    if (conversationRef.current) {
        conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
      }
    },);
  


  return(
         <section ref={conversationRef} className='h-full p-4 page-container overflow-auto'>
            
{loading ? (
  <div>Loading...</div>
) : (
  ConvMessages === null ?(
    <div className='p w-fit mx-auto space-y-4 my-12'>
      <img className='block mx-auto w-[30%]' src={SelectConv} alt="" />
      <div>
        <p className='text-center text-lg font-[600] opacity-100'>Select a conversation</p>  
        <p className='text-center'>to start a conversation</p> 
      </div>
    </div>
  ):
  ConvMessages.length === 0 ? (
    <div className='p w-fit mx-auto space-y-4 my-12'>
      <img className='block mx-auto w-[30%]' src={emptyMessage} alt="" />
      <div>
        <p className='text-center text-lg font-[600] opacity-100'>No messages yet</p>  
        <p className='text-center'>Get or send a message and it will show up here</p> 
      </div>
    </div>
  ) : (
      <div className=''>
   {/* here i would to show the messages of the currentCoversation because sametime i have the message of the room that was before */}
   { ConvMessages[0].conversationId === conversationSelect._id && ConvMessages.map((item:any,ind:any) =>{
       const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });
       { if(item.senderId._id === user?.userData._id) return(

      <div key={ind} className='flex flex-col items-end'>
        <div className='flex space-x-2'>
        {!item.senderId.img ? <p style={{background:item.senderId.background}} className={`flex justify-center text-white items-center w-[40px] h-[40px] object-cover rounded-full`}>{(item.senderId.firstName).substring(0,1).toUpperCase()}</p>
                   :<img className='w-[30px] h-[30px] object-cover rounded-full' src={item.senderId.img}/>
           
          }
         
          <p className='bg-gray-300 rounded-md p-2'>{item.text}</p>
        </div>
        <p className='opacity-70'>{timeAgo}</p>
      </div>

        )

        if(messageNotification.includes(item._id)) return(
          <>
          <div key={ind} className='w-full text-center m-2'><p className=' bg-gray-300 w-full p-1 mx-auto opacity-80 rounded-sm shadow-MyBox1'>new messages sent</p></div>
           <div  className='flex flex-col items-start w-fit'>
         
          <div className='flex space-x-2'>
          {!item.senderId.img ? <p style={{background:item.senderId.background}} className={`flex justify-center text-white items-center w-[40px] h-[40px] object-cover rounded-full`}>{(item.senderId.firstName).substring(0,1).toUpperCase()}</p>
                     :<img className='w-[30px] h-[30px] object-cover rounded-full' src={item.senderId.img}/>
                     }
  
                     
                 
                 {/* <p className='bg-green-900 rounded-md p-2'>{item.text}</p>  */}
             
                  <p className='bg-green-300 rounded-md p-2'>{item.text}</p>
               
                
            
            
          </div>
          <p className='opacity-70 ml-auto'>{timeAgo}</p>
        </div>
          </>
         
        )
            return(
              <div key={ind} className='flex flex-col items-start w-fit'>
        
              <div className='flex space-x-2'>
              {!item.senderId.img ? <p style={{background:item.senderId.background}} className={`flex justify-center text-white items-center w-[40px] h-[40px] object-cover rounded-full`}>{(item.senderId.firstName).substring(0,1).toUpperCase()}</p>
                         :<img className='w-[30px] h-[30px] object-cover rounded-full' src={item.senderId.img}/>
                         }
      
                         
                    
                     {/* <p className='bg-green-900 rounded-md p-2'>{item.text}</p>  */}
                 
                      <p className='bg-green-300 rounded-md p-2'>{item.text}</p>
                   
                    
                
                
              </div>
              <p className='opacity-70 ml-auto'>{timeAgo}</p>
            </div>
            )
    
                        }
    }) }
    </div> 
    // <div></div>
      
  )
)}

           
         
         </section>
    
  ) ;
};

export default Scrollable;
