import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

const useUserAutheticated = () => {
  const user = useSelector((state) => state.user.user);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
    } else {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  }, [user]);


  return [isAuthenticated, currentUser];
}

export default useUserAutheticated;
