const authenticationFake = (args) => {
  const fakeEmail = 'a@a.com';
  const fakePassword = '123456';

  if (args.email === fakeEmail && args.password === fakePassword) {
    return true;
  }
  return false;
};


/**
 *  Login user
 * 
 *  @param {Object} args
 *  @param {String} args.email
 *  @param {String} args.password
 */
export function login(args) {
  return async (dispatch) => {
    const { email, password } = args;
    const userFake = {
      idUser: Date.now(),
      email,
      password,
    };

    const isLogged = authenticationFake(args);
    
    if (isLogged) {
      dispatch({
        type: 'USER_LOGIN',
        data: {
          user:userFake,
        }
      });
  
      if (args.callbackOK) {
        args.callbackOK();
      }
    } else {
      args.callbackERROR();
    }
  };
}

/**
 *  Logout
 */
export function logout() {
  return async (dispatch) => {
    dispatch({
      type: 'USER_LOGOUT',
    });
  };
}

