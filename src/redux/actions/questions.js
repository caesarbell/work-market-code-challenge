import {
  GET_DATA,
  LOADING,
  RETRIEVE_VALUE,
  UPDATE_DATA,
  PENDING,
} from './types';
import {
  retrieveQuestionsFromLocalStorage,
  addItemToLocalStorage
} from '../../jobs/storage/localStore';
import axios from '../../axios/axios';

const url = retrieveQuestionsFromLocalStorage();
console.log('url', url);

export const retrieveData = () => dispatch => {

    dispatch({
        type: LOADING
    });

    if(url) {
        axios(url).then(res => {
            dispatch({ type: GET_DATA, payload: res });
        });
    }

};

export const selectAnswer = value => dispatch => {

    dispatch({
        type: RETRIEVE_VALUE,
        payload: value
    })

}


export const updateData = newData => dispatch => {

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
