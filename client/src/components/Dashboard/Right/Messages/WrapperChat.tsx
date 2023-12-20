import * as React from 'react';
import MessageWrap from './ListCoversations';
import ConversationMsg from './SendMessage';

interface IWrapperChatProps {
}

const WrapperChat: React.FunctionComponent<IWrapperChatProps> = (props) => {
  return(
    <section className='grid grid-cols-12 h-fit p-4 border border-gray-700'>
        <div className=' col-start-1 col-end-4 border border-gray-300'>
         <MessageWrap/>   
        </div>
        <div className='col-start-4 col-end-13 border border-gray-300'>
          <ConversationMsg/>  
        </div>
       
    </section>
  ) ;
};

export default WrapperChat;
