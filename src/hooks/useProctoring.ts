// hooks/useProctoring.ts
import { useState, useEffect } from 'react';

export const useProctoring = () => {

  const [warningCount, setWarningCount] = useState(0);
 
  const [isTabHidden, setIsTabHidden] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
   
        setWarningCount((prev) => prev + 1);
        setIsTabHidden(true);
        console.warn("Cheating Detected: User switched tabs!");
      } else {
       
        setIsTabHidden(false);
      }
    };

    
    document.addEventListener('visibilitychange', handleVisibilityChange);

   
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { warningCount, isTabHidden };
};