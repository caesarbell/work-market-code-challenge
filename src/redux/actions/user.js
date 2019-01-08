import { USER, ERROR, LOADING_USER } from './types'
import { user } from '../../mock/data'
import axios from '../../axios/axios'
import { setUser, getLocalStorageUser } from '../../jobs/storage/localStore'

export const getUser = signedInUser => dispatch => {
    
    dispatch({
        type: LOADING_USER
    })

    axios(user)
        .then(res => {
            if(res.username === signedInUser.username && res.password === signedInUser.password) {
                setUser(signedInUser);
                dispatch({
                    type: USER,
                    payload: signedInUser 
                })
            } else {
                dispatch({
                    type: ERROR,
                    payload: 'User not found'
                })
            }
        })
}

export const isUserSignedIn = () => dispatch => {
    const user = getLocalStorageUser();

    if(user) {
        dispatch({
            type: USER,
            payload: user
        })
    } else {
        dispatch({
            type: USER,
            payload: {}
        })
    }
}