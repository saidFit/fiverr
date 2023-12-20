
import { useState,useEffect } from 'react';


 
function UseMediaQuery(query: string): Boolean {
    const [matches, setMatches] = useState<Boolean>(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);
  
    return matches;
};

export default UseMediaQuery;
