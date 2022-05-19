import { USER_FAIL, 
  USER_REQUEST, 
  USER_SUCCESS, 
  POST_TASK_FAIL, 
  POST_TASK_REQUEST, 
  POST_TASK_SUCCESS, 
  LOGIN_REQUEST, 
  EDIT_TASK_REQUEST,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL} from "./constants";
import { LOGIN_SUCCESS } from "./constants";
import { LOGIN_FAIL} from "./constants";


export const loginReducer = (state={}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {loading: true}
  
    case LOGIN_SUCCESS:
      return {loading: false, data: action.payload}
    
    case LOGIN_FAIL:
      return {loading: false, error : action.payload}
    default:
      return state;
  }
}

export const userRequestReducer = (state={}, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {loading: true}
    
    case USER_SUCCESS: 
      return {loading: false, user: action.payload}

    case USER_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state;
  }
}

export const postTaskReducer = (state={}, action) =>{
  switch (action.type) {
    case POST_TASK_REQUEST:
      return {loading: true}

    case POST_TASK_SUCCESS:
      return {loading: false, feedback: action.payload}

    case POST_TASK_FAIL:
      return {loading: false, error: action.payload }
  
    default:
      return state;
  }
}

export const editTaskReducer = (state={}, action) => {
  switch (action.type) {
    case EDIT_TASK_REQUEST:
      return {loading: true}
    
    case EDIT_TASK_SUCCESS:
      return {loading: false, editInfo: action.payload}

    case EDIT_TASK_FAIL:
      return {loading: false, error: action.payload}
  
    default:
      return state
  }
}

//DELETE TASK REDUCER
export const deleteTaskReducer = (state={}, action) => {
  switch (action.type) {
    case DELETE_TASK_REQUEST:
      return {loading: true}
  
    case DELETE_TASK_SUCCESS:
      return {loading: false, deleted: action.payload}

    case DELETE_TASK_FAIL:
      return {loading: false, error: action.payload}

    default:
      return state;
  }
}