import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postTaskAction, userRequestAction } from '../../reduxComponents/action';
import Loading from '../../components/Loading';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {

  const params = useParams()

  const dispatch = useDispatch()

  const userRequestReducer = useSelector(state=>state.userRequestReducer)
  // const {loading, user, error: errorUser} = userRequestReducer
  const {loading, user} = userRequestReducer

  const postTaskReducer = useSelector(state=>state.postTaskReducer )
  // const {loading: loadingfb, feedback, error: errorPost} = postTaskReducer 
  const {loading: loadingfb, feedback} = postTaskReducer 

  // const loginReducer = useSelector((state)=>state.loginReducer) 
  // const {data} = loginReducer

  const [task_msg, setTaskMsg] = useState('')
  const [task_date, setTask_date] = useState(new Date());
  const [task_time, setTask_time] = useState(new Date());
  const [assigned_user, setAssignedUser] = useState('')
  const [fold, setFold] = useState(true)
  const [counter, setCounter] = useState(0);

  // const email = 'smithwills1989@gmail.com';
  // const password = '12345678';



  // let assigned= user.data.results.data[0].first
  //user && user.data && user.data.results && user.data.results.data[0].name
  // let usernames = user && user.data && user.data.results && user.data.results.data
  // data & data.data && data.data.result
  // console.log(localStorage.getItem('token'))

  useEffect(() => {
    if (params.id ){
      dispatch(userRequestAction(params.id))
    }  
  }, [ params, dispatch])

  const getTime = (time) => {
    let t = time.toLocaleTimeString().split(':')
    const h = t[0]*60*60;
    const m = t[1]*60
    const s =  t[2].split(' ')[0];
    return h+m+s
  }

  const getDate = (date) => {
    const d = date.toLocaleDateString().split('/')
    const dM = d[0];
    const dY = d[2];
    const dD = d[1];
    return `${dY}-${dM}-${dD}`
  }
  
  const handleSave = () => {

    dispatch(postTaskAction({
      company_id: params.id,
      task_msg, 
      task_time: getTime(task_time),
      is_completed: 1,
      time_zone: new Date().getTimezoneOffset()*60,
      task_date: getDate(task_date),
      assigned_user
    }))
  }


  const foldFunction = () =>{
    if (fold){
      setCounter(c=>c+1)
    }
    return  setFold(!fold);
  }

  return (
    <div className='home'>
      {loading && <Loading /> }
      {loadingfb && <Loading /> }
      {/* {errorUser && console.log(errorUser)}
      {errorPost && console.log(errorPost)} */}
      <div className="sidebar">

      </div>

      <div className="nav">

      </div>

      <div className="main">
        <div className="main__content">
          
        <div className="task">
          <h6 className="task__text text">TASKS {counter}</h6>
          <label htmlFor='task' className="" onClick={foldFunction} >
            <img src="/img/add.svg" alt="" className="icon" />
          </label>
        </div>
        {fold && 
        
        <div className="opportunity">
          <div className="opportunity__header">
            <h4 className="opprtunity__header--text">OPPORTUNITIES 1</h4>
            <img src="/img/add.svg" alt="" className="icon" />
          </div>
          <div className="opportunity__info">
            <div className="opportunity__avartar">
              <img 
              src={
                user && user.data[0].icon
              } 
                alt="" className='avatar'
              />
            </div>
            <div className="opportunity__infos">
              <h4 className="opportunity__price">N12</h4>
              <p className="opportunity__date">20% on 1/16/2020</p>
            </div>
            <div className="opportunity__menu">
              <img src="/img/edit.svg" alt="" className='icon' />
              <img src="/img/dots.svg" alt="" className='icon' />
            </div>
          </div>
          <h4 className="opportunity__yellow">APPOINMENT NO SHOW</h4>
          <p className="opportunity__appointment-text">
            {feedback && feedback.config.data.split(':')[1].split(',')[0]}
          </p>
          <div className="opportunity__contact">
            <h4 className="opportunity__contact--header">CONTACT</h4>
            <div className="opportunity__contact--info">
              <p className="opportunity__contact--name">
              {user && user.data[0].name}
              </p>
              <div className="opportunity__contact--icons">
                <img src="/img/message.svg" alt="" className="icon" />
                <img src="/img/call.svg" alt="" className="icon" />
              </div>
            </div>
          </div>
          <div className="opportunity__contacts">
            <h4 className="opportunity__contacts--header">CONTACTS</h4>
            <div className="opportunity__contacts--icons">
              <img src="/img/search.svg" alt="" className="icon" />
              <img src="/img/any.svg" alt="" className="icon" />
              <img src="/img/add.svg" alt="" className="icon" />
            </div>
          </div>
          <div className="opportunity__job">
            <h5 className="opportyunity__job--username">
            {user && user.data[0].name}
            </h5>
            <div className="opportunity__job--info">
              <p className="opportunity__job--name">Developer</p>
              <div className="opportunity__job--icons">
                <img src="/img/message.svg" alt="" className="icon" />
                <img src="/img/any.svg" alt="" className="icon" />
                <img src="/img/call.svg" alt="" className="icon" />
              </div>
            </div>
          </div>
        </div>
      }
      {
        //DESCRIPTION JSX
        !fold &&
      
        <div className="description">
          <form action="" className="description__form">
              <label htmlFor="task" className="description__task">Task Description</label>
            <div className="task__container">
              <input 
                type="text" className='input task__input' id='task' 
                value={task_msg} onChange={(e)=>setTaskMsg(e.target.value)}
              />
              <img src="/img/icon-1.svg" alt="" className="icon-d" />
            </div>
            <div className="description__timing">
              <div className="duration1">
                <label htmlFor="date" className="duration description__date">Date</label>
                <DatePicker selected={task_date} 
                  onChange={(date) => setTask_date(date)} 
                  dateFormat="yyyy/MM/dd"
                  className="description__time" id='date'
                />
              </div>
              <div className="duration2">
                <label htmlFor="time" className="duration description__time">Time</label>
                <DatePicker
                    selected={task_time}
                    onChange={(date) => setTask_time(date)}
                    showTimeSelect
                    className="description__time"
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
              </div>
            </div>
            <div className="select_cotainer">
              <label htmlFor="assign__user" className="assign">Assign User</label>

              <select  id='user' 
              value={assigned_user}
              onChange={e=>setAssignedUser(e.target.value)}
            >
              
            {user && user.data.map(
              (user, i) => (
                <option key={user.id} value={user.id}>
                  {user.first}
                </option>
              )
            )}
            </select>
            </div>
          </form>
          <div className="description__btns">
            {
              feedback && (
                <>

              <button className="delete__btn btn">
                <img src="/img/delete.svg" alt="" className='icon-d' />
              </button>
              <button className="delete__btn btn">
                <img src="/img/edit.svg" alt="" className='icon-d' />
              </button>
                </>
              )
            }
            <button className="cancel btn">Cancel</button>
            <button className="save btn" onClick={handleSave} >Save</button>
          </div>
        </div>
      }
       </div>
      </div>
    </div>
  )
}

export default HomeScreen