import AxiosRequest from '../../libs/AxiosRequest';
import SessionStorage from '../../libs/SessionStorage';


/**
 *  Get request TOKEN to Login
 * 
 *  @param {Object} args
 *  @param {String} args.username
 *  @param {String} args.password
 *  @param {Function} [args.callbackOK]
 *  @param {Function} [args.callbackERROR]
 */
export function login(args) {
  return async (dispatch) => {
    AxiosRequest({
      url: 'authentication/token/new',
      method: 'GET',
      params: {},
    })
      .then((response) => {
        const result = {
          token: response.data,
        };

        dispatch({
          type: 'USER_TOKEN',
          data: result
        });

        // Continue to validate Token with login
        dispatch(validateWithLogin({ ...args, ...result.token }));
    
        // Save token in localstorage
        SessionStorage.setItem('token', result.token);
      })
      .catch(async (error) => {
        if (args.callbackERROR) {
          args.callbackERROR({ msg: 'Error getting Token' });
        }
      });
  };
}

/**
 *  Validate token with login
 * 
 *  @param {Object} args
 *  @param {String} args.username
 *  @param {String} args.password
 *  @param {String} args.request_token
 *  @param {Function} [args.callbackOK]
 *  @param {Function} [args.callbackERROR]
 */
function validateWithLogin(args) {
  return async (dispatch) => {
    const { username, password, request_token } = args;

    AxiosRequest({
      url: 'authentication/token/validate_with_login',
      method: 'POST',
      params: {},
      data: {
        username,
        password,
        request_token
      }
    })
      .then((response) => {
        const result = {
          user: { username },
          token: response.data,
        };

        dispatch({
          type: 'USER_LOGIN',
          data: result
        });

        // Continue to get Session required to do some request
        dispatch(getSession(args));
    
        SessionStorage.setItem('user', result.user);
      })
      .catch(async (error) => {
        if (args.callbackERROR) {
          args.callbackERROR({ msg: 'Error validating user' });
        }
      });
  };
}


/**
 *  Get Session ID
 * 
 *  @param {Object} args
 *  @param {String} args.request_token
 *  @param {Function} [args.callbackOK]
 *  @param {Function} [args.callbackERROR]
 */
function getSession(args) {
  return async (dispatch) => {
    const {request_token } = args;
    AxiosRequest({
      url: 'authentication/session/new',
      method: 'POST',
      params: {},
      data: {
        request_token,
      }
    })
      .then((response) => {
        const result = {
          session: response.data,
        };

        dispatch({
          type: 'USER_SESSION',
          data: result
        });
    
        if (args.callbackOK) {
          args.callbackOK();
        }
        SessionStorage.setItem('session', result.session);
      })
      .catch(async (error) => {
        if (args.callbackERROR) {
          args.callbackERROR({ msg: 'Error getting Session' });
        }
      });
  };
}

/**
 *  Logout
 */
export function logout() {
  return async (dispatch, getState) => {
    const state = getState();
    const { session } = state.user;

    AxiosRequest({
      url: 'authentication/session',
      method: 'DELETE',
      params: {},
      data: {
        session_id: session.session_id,
      }
    })
      .then((response) => {
        const result = {
          session: response.data,
        };

        dispatch({
          type: 'USER_SESSION_DELETE',
          data: result
        });
      })
      .catch(async (error) => {
      });

    dispatch({
      type: 'USER_LOGOUT',
    });

    SessionStorage.resetSessionStorage(['user', 'token', 'session']);
  };
}

