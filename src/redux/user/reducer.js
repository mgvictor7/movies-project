const initialState = {
  user: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN': {
      const { user } = action.data;

      return {
        ...state,
        user,
      };
    }
    case 'USER_LOGOUT': {

      return {
        user: null,
      };
    }
    default:
      return state;
  }
}
