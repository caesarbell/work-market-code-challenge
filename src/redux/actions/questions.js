import {
  GET_DATA,
  LOADING,
  RETRIEVE_VALUE,
  UPDATE_DATA,
  PENDING,
  CLEAR_QUESTIONS,
  CLEAR_ANSWERS
} from './types';
import {
  retrieveQuestionsFromLocalStorage,
  addItemToLocalStorage,
  removeItemsFromLocalStorage
} from '../../jobs/storage/localStore';
import axios from '../../axios/axios';

export const retrieveData = () => dispatch => {
    const url = retrieveQuestionsFromLocalStorage();

    dispatch({
        type: LOADING
    });

    axios(url).then(res => {
        if (res) {
            dispatch({ type: GET_DATA, payload: res });
        } else if(url === undefined || url === null) {
            dispatch({ type: GET_DATA, payload: [] });
        }
    });

};

export const selectAnswer = value => dispatch => {

    dispatch({
        type: RETRIEVE_VALUE,
        payload: value
    })

}


export const updateData = newData => dispatch => {
    const url = retrieveQuestionsFromLocalStorage();

    dispatch({
        type: PENDING
    })

    axios(url)
        .then(res => {
            if(res) {
                res.push(newData);
            } else {
                res = [newData];
            }
            
            addItemToLocalStorage('questions', res);
            dispatch({ type: UPDATE_DATA, payload: res})
        })

}

export const clearQuestions = property => dispatch => {
    removeItemsFromLocalStorage(property)
    if(property === 'questions') {
        dispatch({ type: CLEAR_QUESTIONS, payload: [] });
    } else if(property === 'results') {
        dispatch({ type: CLEAR_ANSWERS, payload: [] });
    }
}
