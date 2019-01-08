import { GET_DATA, LOADING, RETRIEVE_VALUE, UPDATE_DATA, PENDING } from '../actions/types';

const initialState = {
    data: [],
    selectedAnswers: [],
    pending: false,
    user: null,
    loading: false
}; 


export default (state = initialState, action) => {
    switch(action.type) {
        case GET_DATA: 
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case LOADING: 
            return {
                ...state,
                loading: true
            }
        case RETRIEVE_VALUE:
            return {
                ...state,
                selectedAnswers: (() => {
                    const found = state.selectedAnswers.find(question => question.q === action.payload.q);

                    if(found) {
                        state.selectedAnswers.forEach(question => {
                            if (question.q === found.q) {
                                question.a = action.payload.a;
                            }
                        })
                    } else {
                        state.selectedAnswers.push(action.payload);
                    }
                    
                    return state.selectedAnswers; 
                })()
            }
        case UPDATE_DATA: 
            return {
                ...state, 
                data: action.payload,
                pending: false
            }
        case PENDING: 
            return {
                ...state,
                pending: true
            }
        default: 
            return state; 
    }
}