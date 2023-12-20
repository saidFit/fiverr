import {BsBorderStyle, BsChevronDown} from 'react-icons/bs';
import {MdBusinessCenter} from 'react-icons/md';
import {MdExplore} from "react-icons/md";
import {GrLanguage} from "react-icons/gr";
import {IoIosMan, IoMdCheckmarkCircleOutline} from 'react-icons/io';
import {AiOutlineMenuFold} from "react-icons/ai";
import {BiMessageAltDetail} from 'react-icons/bi'
import {CgProfile, CgReorder} from "react-icons/cg";
import {RxDashboard} from 'react-icons/rx'
import {TbMessageCircle2} from 'react-icons/tb'
import {GiGymBag, GiTakeMyMoney} from 'react-icons/gi'
import { Star, greenCheck } from '../assets';
import dayjs from 'dayjs';
export const cards = [
    {
      id: 1,
      title: "AI Artists",
      desc: "Add talent to AI",
      img: "https://images.pexels.com/photos/7532110/pexels-photo-7532110.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      title: "Logo Design",
      desc: "Build yor brand",
      img: "https://images.pexels.com/photos/11295165/pexels-photo-11295165.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      title: "WordPress",
      desc: "Customize your site",
      img: "https://images.pexels.com/photos/4371669/pexels-photo-4371669.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      title: "Voice Over",
      desc: "Share your message",
      img: "https://images.pexels.com/photos/7608079/pexels-photo-7608079.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 5,
      title: "Video Explainer",
      desc: "Engage your audience",
      img: "https://images.pexels.com/photos/13388047/pexels-photo-13388047.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 6,
      title: "Social Media",
      desc: "Reach more customers",
      img: "https://images.pexels.com/photos/11378899/pexels-photo-11378899.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 7,
      title: "SEO",
      desc: "Unlock growth online",
      img: "https://images.pexels.com/photos/4820241/pexels-photo-4820241.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 8,
      title: "Illustration",
      desc: "Color you dreams",
      img: "https://images.pexels.com/photos/15032623/pexels-photo-15032623.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];
  
  export const SidebarDash = [
    {
      name:'Dashboard',
      icon:<RxDashboard size={25}/>
    },
    {
      name:'Messages',
      icon:<TbMessageCircle2 size={25}/>
    },
    {
      name:'Orders',
      icon:<CgReorder size={25}/>
    },
    {name:'Gigs',
     icon:<GiGymBag size={25}/>
  },
  {
    name:'Earning',
    icon:<GiTakeMyMoney size={25}/>
  }

  ]

  export const projects = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cat: "Web and Mobile Design",
      username: "Anna Bell",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cat: "Logo Design",
      username: "Morton Green",
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cat: "Animated GIFs",
      username: "Emmett Potter",
    },
    {
      id: 4,
      img: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cat: "Packaging Design",
      username: "Freddie Johnston",
    },
    {
      id: 5,
      img: "https://images.pexels.com/photos/4458554/pexels-photo-4458554.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cat: "Social Media Design",
      username: "Audrey Richards",
    },
    {
      id: 6,
      img: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cat: "Illustration",
      username: "Dalton Hudson",
    },
    {
      id: 7,
      img: "https://images.pexels.com/photos/6077368/pexels-photo-6077368.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cat: "Book Design",
      username: "Hannah Dougherty",
    },
    {
      id: 8,
      img: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cat: "Digital Marketing",
      username: "Ward Brewer",
    },
  ];
  
  export const gigs = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/720598/pexels-photo-720598.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create ai art character from your images and prompts",
      price: 59,
      star: 5,
      username: "Anna Bell",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create ultra high quality character art with ai",
      price: 79,
      star: 5,
      username: "Lannie Coleman",
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1062280/pexels-photo-1062280.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will creating unique ai generated artworks mid journey ai artist",
      price: 112,
      star: 5,
      username: "Carol Steve",
    },
    {
      id: 4,
      img: "https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create custom ai generated artwork using your photos",
      price: 99,
      star: 4,
      username: "Don Weber",
    },
    {
      id: 5,
      img: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1771383/pexels-photo-1771383.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will recreate your dreams in high quality pictures",
      price: 59,
      star: 5,
      username: "Audrey Richards",
    },
    {
      id: 6,
      img: "https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/715546/pexels-photo-715546.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create ai digital art illustration hyper realistic painting",
      price: 79,
      star: 4,
      username: "Walton Shepard ",
    },
    {
      id: 7,
      img: "https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/720606/pexels-photo-720606.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will generate images with your prompts using ai dalle",
      price: 89,
      star: 5,
      username: "Waverly Schaefer",
    },
    {
      id: 8,
      img: "https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create custom art using midjourney generator",
      price: 110,
      star: 4,
      username: "Wilton Hunt",
    },







    {
      id: 99,
      img: "https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/720598/pexels-photo-720598.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create ai art character from your images and prompts",
      price: 59,
      star: 5,
      username: "Anna Bell",
    },

    {
      id: 77,
      img: "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1062280/pexels-photo-1062280.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will creating unique ai generated artworks mid journey ai artist",
      price: 112,
      star: 5,
      username: "Carol Steve",
    },
    {
      id: 66,
      img: "https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create custom ai generated artwork using your photos",
      price: 99,
      star: 4,
      username: "Don Weber",
    },
    {
      id: 88,
      img: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create ultra high quality character art with ai",
      price: 79,
      star: 5,
      username: "Lannie Coleman",
    },
   




    {
      id: 14,
      img: "https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/720606/pexels-photo-720606.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will generate images with your prompts using ai dalle",
      price: 89,
      star: 5,
      username: "Waverly Schaefer",
    },
    {
      id: 15,
      img: "https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create custom art using midjourney generator",
      price: 110,
      star: 4,
      username: "Wilton Hunt",
    },

    {
      id: 13,
      img: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1771383/pexels-photo-1771383.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will recreate your dreams in high quality pictures",
      price: 59,
      star: 5,
      username: "Audrey Richards",
    },

    {
      id: 12,
      img: "https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/715546/pexels-photo-715546.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create ai digital art illustration hyper realistic painting",
      price: 79,
      star: 4,
      username: "Walton Shepard ",
    },
    






    
    {
      id: 990,
      img: "https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/720598/pexels-photo-720598.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create ai art character from your images and prompts",
      price: 59,
      star: 5,
      username: "Anna Bell",
    },
    {
      id: 880,
      img: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create ultra high quality character art with ai",
      price: 79,
      star: 5,
      username: "Lannie Coleman",
    },
    {
      id: 770,
      img: "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1062280/pexels-photo-1062280.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will creating unique ai generated artworks mid journey ai artist",
      price: 112,
      star: 5,
      username: "Carol Steve",
    },
    {
      id: 660,
      img: "https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create custom ai generated artwork using your photos",
      price: 99,
      star: 4,
      username: "Don Weber",
    },





    {
      id: 90,
      img: "https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/720598/pexels-photo-720598.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create ai art character from your images and prompts",
      price: 59,
      star: 5,
      username: "Anna Bell",
    },
    {
      id: 80,
      img: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600",
      pp: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "I will create ultra high quality character art with ai",
      price: 79,
      star: 5,
      username: "Lannie Coleman",
    },
  ];

  export const SingleGig = [
     {
      title:"I will create ai generated art for you",
      user:{
         name:"Said bifalan",
         avatar:"https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600",
         starsList:Array.from({ length: 5 }, () => Star),
         LengthStar : 5,
      },
      imagesGig:["https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600",
                 "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600",
                 "https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
                ],
        titleAbout:'About This Gig',
        desc:`I use an AI program to create images based on text prompts. This
        means I can help you to create a vision you have through a textual
        description of your scene without requiring any reference images.
        Some things I've found it often excels at are: Character portraits
        (E.g. a picture to go with your DnD character) Landscapes (E.g.
        wallpapers, illustrations to compliment a story) Logos (E.g. Esports
        team, business, profile picture) You can be as vague or as
        descriptive as you want. Being more vague will allow the AI to be
        more creative which can sometimes result in some amazing images. You
        can also be incredibly precise if you have a clear image of what you
        want in mind. All of the images I create are original and will be
        found nowhere else. If you have any questions you're more than
        welcome to send me a message.` ,
        titleSaller:"About The Seller",

        From:"USA",
        Member_since:"Aug 2022",
        Avg_response_t:"4 hours",
        Last_delivery :"1 day",
        Language:"English",
        About_u:` My name is Anna, I enjoy creating AI generated art in my spare
        time. I have a lot of experience using the AI program and that
        means I know what to prompt the AI with to get a great and
        incredibly detailed result.`,

        Reviews:[
          {img_user:"https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600",
           name    : "Garner David",
           name_country:"United States",
           counrty_img  : "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
           starsList  : Array.from({length:4},() => Star),
           review : `I just want to say that art_with_ai was the first, and after
           this, the only artist Ill be using on Fiverr. Communication was
           amazing, each and every day he sent me images that I was free to
           request changes to. They listened, understood, and delivered
           above and beyond my expectations. I absolutely recommend this
           gig, and know already that Ill be using it again very very soon`
        }
        ],

        Right:{
          title:"1 AI generated image",
          price: "$ 59.99",
          desc:`I will create a unique high quality AI generated image based on a
          description that you give me`,
          details:{
            titleD:"2 Days Delivery",
            dur  : "3 Revisions",
            features:[
                {img:greenCheck,p:'Prompt writing'},
                {img:greenCheck,p:'Artwork delivery'},
                {img:greenCheck,p:'Additional design'},
            ]
          }
        }
     },

     
     
  ]

  export const MyGigs = [
    {
     title:"I will create ai generated art for you",
     user:{
        name:"Said bifalan",
        avatar:"https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600",
        starsList:Array.from({ length: 5 }, () => Star),
        LengthStar : 5,
     },
     imagesGig:["https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600",
                "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600",
                "https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
               ],
       titleAbout:'About This Gig',
       desc:`I use an AI program to create images based on text prompts. This
       means I can help you to create a vision you have through a textual
       description of your scene without requiring any reference images.
       Some things I've found it often excels at are: Character portraits
       (E.g. a picture to go with your DnD character) Landscapes (E.g.
       wallpapers, illustrations to compliment a story) Logos (E.g. Esports
       team, business, profile picture) You can be as vague or as
       descriptive as you want. Being more vague will allow the AI to be
       more creative which can sometimes result in some amazing images. You
       can also be incredibly precise if you have a clear image of what you
       want in mind. All of the images I create are original and will be
       found nowhere else. If you have any questions you're more than
       welcome to send me a message.` ,
       titleSaller:"About The Seller",

       From:"USA",
       Member_since:"Aug 2022",
       Avg_response_t:"4 hours",
       Last_delivery :"1 day",
       Language:"English",
       About_u:` My name is Anna, I enjoy creating AI generated art in my spare
       time. I have a lot of experience using the AI program and that
       means I know what to prompt the AI with to get a great and
       incredibly detailed result.`,

       Reviews:[
         {img_user:"https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600",
          name    : "Garner David",
          name_country:"United States",
          counrty_img  : "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
          starsList  : Array.from({length:4},() => Star),
          review : `I just want to say that art_with_ai was the first, and after
          this, the only artist Ill be using on Fiverr. Communication was
          amazing, each and every day he sent me images that I was free to
          request changes to. They listened, understood, and delivered
          above and beyond my expectations. I absolutely recommend this
          gig, and know already that Ill be using it again very very soon`
       }
       ],

       Right:{
         title:"1 AI generated image",
         price: "$ 59.99",
         desc:`I will create a unique high quality AI generated image based on a
         description that you give me`,
         details:{
           titleD:"2 Days Delivery",
           dur  : "3 Revisions",
           features:[
               {img:greenCheck,p:'Prompt writing'},
               {img:greenCheck,p:'Artwork delivery'},
               {img:greenCheck,p:'Additional design'},
           ]
         }
       }
    },

    {
      title:"I will create ai generated art for you",
      user:{
         name:"Said bifalan",
         avatar:"https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600",
         starsList:Array.from({ length: 5 }, () => Star),
         LengthStar : 5,
      },
      imagesGig:["https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600",
                 "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600",
                 "https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
                ],
        titleAbout:'About This Gig',
        desc:`I use an AI program to create images based on text prompts. This
        means I can help you to create a vision you have through a textual
        description of your scene without requiring any reference images.
        Some things I've found it often excels at are: Character portraits
        (E.g. a picture to go with your DnD character) Landscapes (E.g.
        wallpapers, illustrations to compliment a story) Logos (E.g. Esports
        team, business, profile picture) You can be as vague or as
        descriptive as you want. Being more vague will allow the AI to be
        more creative which can sometimes result in some amazing images. You
        can also be incredibly precise if you have a clear image of what you
        want in mind. All of the images I create are original and will be
        found nowhere else. If you have any questions you're more than
        welcome to send me a message.` ,
        titleSaller:"About The Seller",
 
        From:"USA",
        Member_since:"Aug 2022",
        Avg_response_t:"4 hours",
        Last_delivery :"1 day",
        Language:"English",
        About_u:` My name is Anna, I enjoy creating AI generated art in my spare
        time. I have a lot of experience using the AI program and that
        means I know what to prompt the AI with to get a great and
        incredibly detailed result.`,
 
        Reviews:[
          {img_user:"https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600",
           name    : "Garner David",
           name_country:"United States",
           counrty_img  : "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
           starsList  : Array.from({length:4},() => Star),
           review : `I just want to say that art_with_ai was the first, and after
           this, the only artist Ill be using on Fiverr. Communication was
           amazing, each and every day he sent me images that I was free to
           request changes to. They listened, understood, and delivered
           above and beyond my expectations. I absolutely recommend this
           gig, and know already that Ill be using it again very very soon`
        }
        ],
 
        Right:{
          title:"1 AI generated image",
          price: "$ 59.99",
          desc:`I will create a unique high quality AI generated image based on a
          description that you give me`,
          details:{
            titleD:"2 Days Delivery",
            dur  : "3 Revisions",
            features:[
                {img:greenCheck,p:'Prompt writing'},
                {img:greenCheck,p:'Artwork delivery'},
                {img:greenCheck,p:'Additional design'},
            ]
          }
        }
     },
    
    
 ]  

export const menu = [
    {
      id:Math.floor(Math.random()*1000),
      select:"Category",
      down:<BsChevronDown size={20}/>,
      options:[
        "Graphics & Design",
       " Video & Animation",
        "Writing & Translation",
        "AI Services",
        "Digital Marketing",
        "Music & Audio",
        "Programming & Tech",
        "Business",
        "Lifestyle"
      ],
    },
    {
      id:Math.floor(Math.random()*1000),
      select:"Your gigs",
      down:<BsChevronDown size={20}/>,
      icon:<MdBusinessCenter size={20}/>,
      options:[
        "Graphics & Design",
      ],
    },
    {
      id:Math.floor(Math.random()*1000),
      select:"yours messages",
      down:<BsChevronDown size={20}/>,
      icon:<BiMessageAltDetail size={20}/>,
      options:[
        "Graphics & Design",
      ],
    },
    {
      id:Math.floor(Math.random()*1000),
      select:"yours orders",
      down:<BsChevronDown size={20}/>,
      icon:<BsBorderStyle size={20}/>,
      options:[
        "Graphics & Design",
      ],
    },
    {
      id:Math.floor(Math.random()*1000),
      select:"profile",
      down:<BsChevronDown size={20}/>,
      icon:<CgProfile size={20}/>,
      options:[
        "profile",
      ],
    },
]

export const feature = [
   {
    icon:<IoMdCheckmarkCircleOutline size={20}/>,
    title:"the best for every budget",
    desc:` Find high-quality services at every price point. No hourly rates,
    just project-based pricing.`,
   },
   {
    icon:<IoMdCheckmarkCircleOutline size={20}/>,
    title:"Quality work done quickly",
    desc:`Find the right freelancer to begin working on your project within
    minutes.`,
   },
   {
    icon:<IoMdCheckmarkCircleOutline size={20}/>,
    title:"Protected payments, every time",
    desc:`Always know what you'll pay upfront. Your payment isn't released
    until you approve the work..`,
   },
   {
    icon:<IoMdCheckmarkCircleOutline size={20}/>,
    title:"24/7 support",
    desc:`Find high-quality services at every price point. No hourly rates,
    just project-based pricing.`,
   },
]

export const Emarketplace = [
   
    {
      icon:"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg",
      title:"Graphics & Design"
    },
    {
      icon:"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg",
      title:"Digital Marketing"
    },
    {
      icon:"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg",
      title:"Video & Animation"
    },
    {
      icon:"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg",
      title:"Music & Audio"
    },
    {
      icon:"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg",
      title:"Writing & Translation"
    },
    {
      icon:"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg",
      title:"Programming & Tech"
    },
    {
      icon:"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg",
      title:"Business"
    },
    {
      icon:"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg",
      title:"Lifestyle"
    },
    {
      icon:"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg",
      title:"Data"
    },
    {
      icon:"https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg",
      title:"Photography"
    },

]


export const gigsSaller = [
   {
    id:1,
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYelahpsar8gumG11MYjY4GijSOYtO_mFLQ&usqp=CAU',
    title:"i will wordpress install wordpress",
    price:30,
   },
   {
    id:2,
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX22njzG8M_8PguzLZPftvJ1uJcyrtIvdRoA&usqp=CAU',
    title:"i will wordpress install wordpress",
    price:30,
   },
   {
    id:3,
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcXpPklTb0WLmRDZvkReji4GIg1jKbp_nAw&usqp=CAU',
    title:"i will wordpress install wordpress",
    price:30,
   },
   {
    id:4,
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5lxunTL_RAgmgWDRDItrBzXfp2VbFGHBHyQ&usqp=CAU',
    title:"i will wordpress install wordpress",
    price:30,
   },
   {
    id:5,
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVr31bGoMXHYjdojVo0Un6MEr4Bgv2TaYJ5A&usqp=CAU',
    title:"i will wordpress install wordpress",
    price:30,
   },
   {
    id:6,
    img:'data:image/png;base64,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',
    title:"i will wordpress install wordpress",
    price:30,
   },
   {
    id:7,
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZioUHyzkKfdltTxHwJqIaKzqmrXrNZSzntQ&usqp=CAU',
    title:"i will wordpress install wordpress",
    price:30,
   },
]

export const OrdersGigs = [
    {
      id:1,
      imgGig:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcXpPklTb0WLmRDZvkReji4GIg1jKbp_nAw&usqp=CAU',
      imageCustomer:'https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600',
      price : 130,
      create_at:dayjs().format('MMMM, D-H:mm'),
      status:"Paid",
      textColor:"#fff",
      bgColor  : "#28a745"
    },
    {
      id:2,
      imgGig:'	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX22njzG8M_8PguzLZPftvJ1uJcyrtIvdRoA&usqp=CAU',
      imageCustomer:'https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600',
      price : 130,
      create_at:dayjs().format('MMMM, D-H:mm'),
      status:"Paid",
      textColor:"#fff",
      bgColor  : "#28a745"
    },
    {
      id:3,
      imgGig:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYelahpsar8gumG11MYjY4GijSOYtO_mFLQ&usqp=CAU',
      imageCustomer:'https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600',
      price : 130,
      create_at:dayjs().format('MMMM, D-H:mm'),
      status:"Paid",
      textColor:"#fff",
      bgColor  : "#28a745"
    },
    {
      id:4,
      imgGig:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYelahpsar8gumG11MYjY4GijSOYtO_mFLQ&usqp=CAU',
      imageCustomer:'https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600',
      price : 130,
      create_at:dayjs().format('MMMM, D-H:mm'),
      status:"Paid",
      textColor:"#fff",
      bgColor  : "#28a745"
    },
    {
      id:5,
      imgGig:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYelahpsar8gumG11MYjY4GijSOYtO_mFLQ&usqp=CAU',
      imageCustomer:'https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600',
      price : 130,
      create_at:dayjs().format('MMMM, D-H:mm'),
      status:"Paid",
      textColor:"#fff",
      bgColor  : "#28a745"
    },
]

export const Conversations =[
  {_id:1,
    fullName:'said bifalan',
    YourImg:'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {_id:2,
    fullName:'anas Nouri',
    YourImg:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu2FFAcRqDurUrhgxeKu_Gel5JGtaXV__QiEgAuN9RXvFDI4cmX4QjRHM6lBdzNkudlA8&usqp=CAU',
  },
  {_id:3,
    fullName:'Mohammed Taher',
    YourImg:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU',
  },
  {_id:4,
    fullName:'Hohammed Chafei',
    YourImg:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp',
  },
  {_id:5,
    fullName:'yassin Mouri',
    YourImg:'',
  },
  {_id:6,
    fullName:'salah Zayouni',
    YourImg:'https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg',
  },
  {_id:7,
    fullName:'ahmed Saber',
    YourImg:'',
  },
  {_id:8,
    fullName:'Anoir Tazi',
    YourImg:'',
  },
]

export const options : {category:string,subOptions:{label:string,value:string}[]}[] =[
  {
    category: 'Graphics & Design',
    subOptions: [
      { label: 'Logo Design', value: 'Logo Design' },
      { label: 'Illustration', value: 'Illustration' },
      { label: 'Branding', value: 'Branding' },
      { label: 'Packaging Design', value: 'Packaging Design' },
      { label: 'Photoshop Editing', value: 'Photoshop Editing' },
      { label: 'Business Cards & Stationery', value: 'Business Cards & Stationery' },
      { label: 'Web & Mobile Design', value: 'Web & Mobile Design' },
    ],
  },
  {
    category: 'Digital Marketing',
    subOptions: [
      { label: 'Social Media Marketing', value: 'Social Media Marketing' },
      { label: 'SEO (Search Engine Optimization)', value: 'SEO (Search Engine Optimization)' },
      { label: 'Content Marketing', value: 'Content Marketing' },
      { label: 'Email Marketing', value: 'Email Marketing' },
      { label: 'Influencer Marketing', value: 'Influencer Marketing' },
      { label: 'SEM (Search Engine Marketing)', value: 'SEM (Search Engine Marketing)' },
      { label: 'Marketing Strategy', value: 'Marketing Strategy' },
    ],
  },
  {
    category: 'Writing & Translation',
    subOptions: [
      { label: 'Articles & Blog Posts', value: 'Articles & Blog Posts' },
      { label: 'Copywriting', value: 'Copywriting' },
      { label: 'Creative Writing', value: 'Creative Writing' },
      { label: 'Translation', value: 'Translation' },
      { label: 'Proofreading & Editing', value: 'Proofreading & Editing' },
      { label: 'Resumes & Cover Letters', value: 'Resumes & Cover Letters' },
      { label: 'Technical Writing', value: 'Technical Writing' },
    ],
  },
  {
    category: 'Video & Animation',
    subOptions: [
      { label: 'Video Editing', value: 'Video Editing' },
      { label: 'Animation', value: 'Animation' },
      { label: 'Whiteboard & Explainer Videos', value: 'Whiteboard & Explainer Videos' },
      { label: 'Intros & Animated Logos', value: 'Intros & Animated Logos' },
      { label: 'Promotional & Brand Videos', value: 'Promotional & Brand Videos' },
      { label: 'Lyric & Music Videos', value: 'Lyric & Music Videos' },
      { label: 'Spokespersons & Testimonials', value: 'Spokespersons & Testimonials' },
    ],
  },
  {
    category: 'Music & Audio',
    subOptions: [
      { label: 'Voice Over', value: 'Voice Over' },
      { label: 'Mixing & Mastering', value: 'Mixing & Mastering' },
      { label: 'Singer-Songwriters', value: 'Singer-Songwriters' },
      { label: 'Podcast Editing', value: 'Podcast Editing' },
      { label: 'Session Musicians', value: 'Session Musicians' },
      { label: 'Jingles & Drops', value: 'Jingles & Drops' },
      { label: 'Sound Effects', value: 'Sound Effects' },
    ],
  },
  {
    category: 'Programming & Tech',
    subOptions: [
      { label: 'Web Programming', value: 'Web Programming' },
      { label: 'Mobile App Development', value: 'Mobile App Development' },
      { label: 'WordPress', value: 'WordPress' },
      { label: 'Ecommerce Development', value: 'Ecommerce Development' },
      { label: 'Desktop Applications', value: 'Desktop Applications' },
      { label: 'Chatbots', value: 'Chatbots' },
      { label: 'Database Development', value: 'Database Development' },
    ],
  },
  {
    category: 'Business',
    subOptions: [
      { label: 'Virtual Assistant', value: 'Virtual Assistant' },
      { label: 'Business Plans', value: 'Business Plans' },
      { label: 'Market Research', value: 'Market Research' },
      { label: 'Financial Consulting', value: 'Financial Consulting' },
      { label: 'Presentations', value: 'Presentations' },
      { label: 'Business Tips', value: 'Business Tips' },
      { label: 'Career Advice', value: 'Career Advice' },
    ],
  },
  {
    category: 'Lifestyle',
    subOptions: [
      { label: 'Online Lessons', value: 'Online Lessons' },
      { label: 'Relationship Advice', value: 'Relationship Advice' },
      { label: 'Health, Nutrition & Fitness', value: 'Health, Nutrition & Fitness' },
      { label: 'Travel Planning', value: 'Travel Planning' },
      { label: 'Astrology & Readings', value: 'Astrology & Readings' },
      { label: 'Cooking Recipes', value: 'Cooking Recipes' },
      { label: 'Arts & Crafts', value: 'Arts & Crafts' },
    ],
  },
  {
    category: 'Industries',
    subOptions: [
      { label: 'Real Estate', value: 'Real Estate' },
      { label: 'Fashion & Beauty', value: 'Fashion & Beauty' },
      { label: 'Gaming', value: 'Gaming' },
      { label: 'Automotive', value: 'Automotive' },
      { label: 'Legal', value: 'Legal' },
      { label: 'Home Improvement', value: 'Home Improvement' },
      { label: 'Architecture', value: 'Architecture' },
    ],
  },
]