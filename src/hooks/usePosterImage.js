import { useEffect, useState } from "react";

const usePosterImage = (url) => {
  const urlBase = 'https://www.themoviedb.org/t/p/w220_and_h330_face';

  const [urlImage, setUrlImage] = useState('');
  
  useEffect(() => {
    if (url) {
      setUrlImage(`${urlBase}${url}`);
    }
  }, [url]);

  return urlImage;
}

export default usePosterImage;
