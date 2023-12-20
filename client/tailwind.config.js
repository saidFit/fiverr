/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        // "gray-500": "#5E0000",
        "primary-100": "#FFE1E0",
        "primary-300": "#FFA6A3",
        "primary-500": "#FF6B66",
        "secondary-400": "#FFCD5B",
        "secondary-500": "#FFC132",
        AlertColor:{
          Primary:{
          TextPrimary:'#004085',
          BorderPrimary:'#b8daff',
          BgPrimary   :'#cce5ff'
          },
          Success:{
          TextSuccess:'#155724',
          BorderSuccess:'#c3e6cb',
          BgSuccess   :'#d4edda'
          },
          Warning:{
          TextPWarning:'#856404',
          BorderWarning:'#ffeeba',
          BgWarning   :'#fff3cd'
          },
          danger:{
          TextDanger:'#721c24',
          BorderDanger:'#f5c6cb',
          BgDanger:'#f8d7da'

          }
         
        }
      },
      boxShadow:{
        MyBox:'1px 0px 4px 4px #00000045',
        MyBox1:'1px 0px 12px 1px #00000029',
      },
      backgroundImage: (theme) => ({
        "gradient-yellowred":
          "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
          // "liner-gradient()"
        "mobile-home": "url('./assets/HomePageGraphic.png')",
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      content: {
        evolvetext: "url('./assets/EvolveText.png')",
        abstractwaves: "url('./assets/AbstractWaves.png')",
        sparkles: "url('./assets/Sparkles.png')",
        circles: "url('./assets/Circles.png')",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};