import { USER, ERROR, LOADING_USER } from '../actions/types';

const initialState = {
  user: {},
  error: null,
  loadingUser: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        user: action.payload,
        error: null,
        loadingUser: false,
      };
    case ERROR:
      return { 
          ...state, error: action.payload, 
          loadingUser: false 
        };
    case LOADING_USER:
        return {
            ...state,
            loadingUser: true
        }
    default:
      return {
        ...state,
      };
  }
};
