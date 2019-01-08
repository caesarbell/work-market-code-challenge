import { USER, ERROR } from '../actions/types'

const initialState = {
  user: {},
  error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER:
            return {
                ...state,
                user: action.payload,
                error: null
            }
        case ERROR: 
            return {
                ...state,
                error: action.payload
            }
        default:
            return {
                ...state
            }
    }
}