const initialState = {
  user: null,
  token: null,
  session: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN': {
      const { user, token } = action.data;

      return {
        ...state,
        user,
        token,
      };
    }
    case 'USER_SESSION': {
      const { session } = action.data;

      return {
        ...state,
        session,
      };
    }
    case 'USER_LOGOUT': {

      return {
        user: null,
        token: null,
        session: null,
      };
    }
    default:
      return state;
  }
}
