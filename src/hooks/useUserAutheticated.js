import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

const useUserAutheticated = () => {
  const user = useSelector((state) => state.user.user);

  const [isAuthenticated, setIsAuthenticated] = useState(user !== null);
  const [currentUser, setCurrentUser] = useState(user);

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
