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
import axios from "axios";


//THIS DISPATCH FUNCTION GIVES US ACCESS TO THE TOKEN
export const loginAction = (login) => async (dispatch)=>{
  try {
    dispatch({type: LOGIN_REQUEST})

    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      }
    }

    const data = await axios.post(
      'https://stage.api.sloovi.com/login',
      {
        email : login.email,
        password : login.password
      },
       config
    )
    let newData = data && data.data && data.data.results

    dispatch({
      type:LOGIN_SUCCESS,
      payload: newData 
    })

    localStorage.setItem('token', JSON.stringify(newData))
    
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error
    })
  }
}

//THIS DISPATCH FUNCTION GETS THE USER INFORMATION
export const userRequestAction = (company_id) => async (dispatch, getState) =>{

  try {
    dispatch({type: USER_REQUEST})

    const {loginReducer: {token}} = await getState();

    const config = {
      headers : {
          Authorization: `Bearer ${token}`,
      },
    }
  
    const data = await axios.get(`https://stage.api.sloovi.com/team?product=outreach&company_id=${company_id}`, config)


    dispatch({
      type: USER_SUCCESS,
      payload: data && data.data && data.data.results
    })
    
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error
    })
  }
}

//THIS DISPATCH FUNCTION MANAGES THE POSTING OF TASK
export const postTaskAction = (task) => async(dispatch, getState) =>{
  try {
    dispatch({type: POST_TASK_REQUEST})

    // const {loginReducer: {data: {results: {token}}}} = getState();
    const {loginReducer: {token}} = await getState();

    const config = {
      headers : {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type' : 'application/json'
      }
    }
    const data = await axios.post(
      `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${task.company_id}`,
      {
        task_msg: task.task_msg, 
        task_time: task.task_time,
        is_completed: task.is_completed,
        time_zone: task.time_zone,
        task_date: task.task_date,
        assigned_user:task.assigned_user
      },
      config
    )

    dispatch({
      type: POST_TASK_SUCCESS,
      payload: data
    })

    console.log(data)

  } catch (error) {
    dispatch({
      type: POST_TASK_FAIL,
      payload: error
    })
  }
}

//EDIT TASK ACTION

export const editTaskAction = (edit) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_TASK_REQUEST
    })

    const {loginReducer: {data: {results: {token}}}} = getState();

    const config = {
      headers : {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type' : 'application/json'
      }
    }

      const data = await axios.put(
        `URL : https://stage.api.sloovi.com/tas`,
        {},
        config
      )

    dispatch({
      type: EDIT_TASK_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: EDIT_TASK_FAIL,
      payload: error
    })
  }
}

//DELETE TASK ACTION
export const deleteTaskAction = () => async (dispatch, getState) => {
  try {
    dispatch({type: DELETE_TASK_REQUEST})

    const {loginReducer: {data: {results: {token}}}} = getState();
  
    const config = {
      headers : {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type' : 'application/json'
      }
    }
  
    const data = await axios.delete(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4`,
    {}, config
    )

    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload : data
    })
    
  } catch (error) {
    dispatch({
      type: DELETE_TASK_FAIL,
      payload: error
    })
  }
}