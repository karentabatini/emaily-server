import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const result = await axios.get('/api/current_user');
    return dispatch({ type: FETCH_USER, payload: result.data});
};