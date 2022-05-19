import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { postTaskReducer, loginReducer, userRequestReducer, editTaskReducer, deleteTaskReducer } from './reduxComponents/reducers';

const reducer = combineReducers({
  loginReducer: loginReducer,
  userRequestReducer: userRequestReducer,
  postTaskReducer: postTaskReducer,
  editTaskReducer: editTaskReducer,
  deleteTaskReducer: deleteTaskReducer
})

const token = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : {}

const initialState = {
  loginReducer: token
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store