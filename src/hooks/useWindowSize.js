import { useEffect, useState } from 'react';


const useWindowSize = () => {
  
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {

    const setSize = () => {

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })

    }

    setSize();
    window.addEventListener('resize', setSize);

    return () => {
      window.removeEventListener('resize', setSize);
    }

  }, [])

  return windowSize;

}

export default useWindowSize;
