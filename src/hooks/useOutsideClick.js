import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of element ref
 */
const useOutsideClick = (ref, isVisible, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isVisible && ref.current && !ref.current.contains(event.target) && !event.target.classList.contains('fa-bars')) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, isVisible]);
}

export default useOutsideClick;