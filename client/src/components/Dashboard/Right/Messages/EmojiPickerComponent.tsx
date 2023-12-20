import React, { useEffect, useState } from 'react';
import EmojiPicker, { Emoji } from 'emoji-picker-react';

interface EmojiPickerCom {
  chosenEmoji:any,
  setChosenEmoji:React.Dispatch<any>,
  setShowEmojis:React.Dispatch<boolean>,
  showEmojis:boolean,
  setText:React.Dispatch<any>,

}

const EmojiPickerComponent: React.FC<EmojiPickerCom> = (props) => {
  const [emojis, setEmojis] = useState<any>(null);
  const [emojisPrincipale,setEmojisPricipale] = useState<any>(null);
  const [query,setQuery] = useState<string>('')

  // const onEmojiClick = (event: React.MouseEvent, emojiObject: any): void => {
  //   console.log(event)
  //   setChosenEmoji(emojiObject.emoji);
  // };

  const fetchingEmojis = async():Promise<any> => {
    const apiKey = 'e8a6685a1cd4070ee8f5bcd97f5b6a1f85a7e0e6'; // Replace 'YOUR_API_KEY' with your actual API key
  
      try {
        const response = await fetch(`https://emoji-api.com/emojis?access_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching emojis:', error);
        return [];
      }
    };
  

  useEffect(() => {
    const fetchEmojiData = async () => {
      const emojis = await fetchingEmojis();
       console.log(emojis);
      setEmojis(emojis);
      setEmojisPricipale(emojis);
      
    };
   
  
      fetchEmojiData();
    
  },[]);

 const handleClick=(emojiCharacter:any) =>{
  console.log(emojiCharacter);
  props.setText((prevText: any) => prevText + emojiCharacter);
  // props.setChosenEmoji(emojiCharacter)
   
 }
 const handleChnage = (event: string) => {
  const arr = ['codePoint', 'group', 'slug', 'subGroup', 'unicodeName'];

  if (event.trim() === '') {
    // If the input is empty, show all emojis (reset the filter)
    setEmojis(emojisPrincipale);
  } else {
    // If the input has a value, filter the emojis based on partial matches
    const copyEmojis = [...emojis];
    const newEmojis = copyEmojis.filter((item: any) =>
      arr.some((key: any) =>
        item[key].toLowerCase().includes(event.toLowerCase())
      )
    );
    setEmojis(newEmojis);
  }
};



  return(
    <div className='absolute bottom-16 rounded-md p-2 bg-gray-200 border border-gray-400 shadow-MyBox-1 left-1 z-20 h-[180px] w-[200px]'>
      <span onClick={()=>props.setShowEmojis(!props.showEmojis)} className='absolute -top-3 -right-1 bg-white rounded-full p-2 w-[22px] h-[22px] shadow-MyBox1 flex justify-center items-center'>x</span>
       {emojis ? (
        <div className='space-y-3 w-full'>
          <input onChange={(e)=>handleChnage(e.target.value)} className=' outline-none border w-full border-gray-300 rounded-md px-3 py-1' type="text" placeholder='Search'  />
          <div className='space-y-3 w-full'>
            <h1>Emojis</h1>
            <div className='flex gap-6 w-full flex-wrap items-center page-container-cov overflow-auto h-[100px]'>
             
{emojis.map((item:any, ind:number) => {
  const { character, codePoint, group, slug, subGroup, unicodeName } = item;
  const emojiCharacter = String.fromCodePoint(parseInt(codePoint, 16));
  // We use parseInt(codePoint, 16) to convert the hexadecimal string to its decimal equivalent.
  //  For example, parseInt("1F602", 16) will give us 128514.
  // String.fromCodePoint(decimalValue):takes a decimal Unicode code point value as an argument and returns the corresponding Unicode character (emoji) as a string
  // example, if emojiCharacter is String.fromCodePoint(128514), it will be set to "😂"
  if(character !== "🤌")return (
    <p
      key={ind} // Don't forget to add a unique key for each element in the map
      onClick={() => handleClick(emojiCharacter)}
      className="w-[12px] p-2 flex justify-start items-center h-[12px] cursor-pointer hover:bg-gray-300"
    >
      {emojiCharacter}
    </p>
  );
})}
            </div>
          </div>
        </div>
       ):(
        <div className="flex items-center justify-center w-full h-full">
    <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse">loading...</div>
</div>
       )}
    </div>
  );
};

export default EmojiPickerComponent;
