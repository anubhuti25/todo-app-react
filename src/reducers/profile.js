import {
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_LOADING,
    GET_TODO, 
    CREATE_TODO, 
    PROFILE_ERROR, 
    DELETE_TODO, 
    TOGGLE_COMPLETED
} from "../actions/types";
import buildTodoList from '../utils/buildTodoList';

const initialState = {
    todosBatch: [],
    loading: true,
    todo: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                todosBatch: [...buildTodoList(payload)],
                todo: null,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                todosBatch: [],
                loading: false,
                todo: null
            }
        case GET_TODO:
            return {
                ...state,
                todo: payload,
                loading: false
            }
        case CREATE_TODO:
            return {
                ...state,
                loading: false,
                todo: null
            }
        case DELETE_TODO:
            const deleteIndex = state.todosBatch.findIndex((batch) => batch.batch_id === payload.batch);
            const deleteTodoIndex = state.todosBatch[deleteIndex].todos.findIndex(todo => todo.id === payload.id);
            state.todosBatch[deleteIndex].todos[deleteTodoIndex].is_completed === 0 ? 
                state.todosBatch[deleteIndex].inCompleteCount-- :
                state.todosBatch[deleteIndex].completeCount--;
            state.todosBatch[deleteIndex].todos.splice(deleteTodoIndex, 1);
            return {
                ...state,
                todo: null,
                loading: false,
            }
        case TOGGLE_COMPLETED:
            const index = state.todosBatch.findIndex((batch) => batch.batch_id === payload.batch);
            const todoIndex = state.todosBatch[index].todos.findIndex(todo => todo.id === payload.id);
            payload.isCompleted === 0 && 
                (state.todosBatch[index].inCompleteCount++) && 
                (state.todosBatch[index].completeCount--);
            payload.isCompleted === 1 && 
                (state.todosBatch[index].inCompleteCount--) && 
                (state.todosBatch[index].completeCount++);
            state.todosBatch[index].todos[todoIndex].is_completed = payload.isCompleted;
            return {
                ...state,
                loading: false
            }
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return { ...state };
    }
}