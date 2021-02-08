import axios from 'axios';
import { setAlert } from './alert';
import { logout } from './auth';

import {
    GET_PROFILE,
    PROFILE_LOADING,
    CREATE_TODO,
    GET_TODO_ERROR,
    DELETE_TODO,
    GET_TODO,
    PROFILE_ERROR,
    TOGGLE_COMPLETED
} from './types';

export const errorDispatch = (status, msg, type) => async dispatch => {
    if (status === 401) {
        dispatch(logout());
        return;
    }
    dispatch({
        type: type,
        payload: { msg, status }
    });
    dispatch(setAlert(msg, 'danger'));
}

//GET TODOs for current user
export const getCurrentTodos = () => async dispatch => {
    try {
        dispatch({ type: PROFILE_LOADING });
        const res = await axios.get('/todo');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch(errorDispatch(
            error.response.status,
            error.response.data.msg,
            PROFILE_ERROR
        ));
    }
}

//GET TODOs for current user
export const getTodo = id => async dispatch => {

    try {
        dispatch({ type: PROFILE_LOADING });
        const res = await axios.get('/todo/' + id);

        dispatch({
            type: GET_TODO,
            payload: res.data
        });
    } catch (error) {
        dispatch(errorDispatch(
            error.response.status,
            error.response.data.msg, 
            GET_TODO_ERROR
        ));
    }
}

//Add TODOs or edit TODO for current user
export const createTodo = (formData, id, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = edit ? await axios.put('/todo/' + id, formData, config) : await axios.post('/todo', formData, config);

        dispatch({
            type: CREATE_TODO,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Todo Updated!' : 'Todo Created', 'success'));
        history.push('/');
    } catch (err) {
        dispatch(errorDispatch(
            err.response.status,
            err.response.data.msg,
            PROFILE_ERROR
        ));
    }
}

//Delete TODO for current user
export const deleteTodo = (batch, id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.delete('/todo/' + id, null, config);

        dispatch({
            type: DELETE_TODO,
            payload: { id, batch }
        });

        dispatch(setAlert('Todo Deleted', 'success'));
    } catch (err) {
        dispatch(errorDispatch(
            err.response.status,
            err.response.data.msg,
            PROFILE_ERROR
        ));
    }
}

//Mark todo as completed or incomplete
export const toggleCompleted = (batch, id, isCompleted) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        isCompleted = isCompleted === 0 ? 1 : 0
        const body = { isCompleted }

        await axios.post('/todo/completed/' + id, body, config);

        dispatch({
            type: TOGGLE_COMPLETED,
            payload: { id, batch, isCompleted }
        });

        dispatch(setAlert('Marked as ' + (isCompleted === 0 ? 'incomplete' : 'complete'), 'success'));

    } catch (err) {
        dispatch(errorDispatch(
            err.response.status,
            err.response.data.msg,
            PROFILE_ERROR
        ));
    }
}