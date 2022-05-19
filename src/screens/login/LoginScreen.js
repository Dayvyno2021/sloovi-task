import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction} from '../../reduxComponents/action';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const LoginScreen = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const loginReducer = useSelector((state)=>state.loginReducer) 
  const {loading, data, error} = loginReducer

  const [email, setEmail] = useState('smithwills1989@gmail.com');
  const [password, setPassword] = useState("12345678")

//   smithwills1989@gmail.com
// 12345678
  useEffect(() => {
    if (data && data.company_id){
      navigate(`/home-screen/${data.company_id}`)
    } 
  }, [data, navigate])
  

  const handleLogin = () =>{
    dispatch(loginAction({email, password}))
  }

  return (
    <div className="login__container">
      {loading && <Loading/>}
      {error && alert(`${error} Please reload page`)}
      <div className="login__form">

        <form action="">
          <div className="input__group">
            <label htmlFor="email" className="login__label" >Email</label>
            <input 
                type="email" value={email} onChange = {(e)=>setEmail(e.target.value)}
                className="email" placeholder='email' id='email'
                autoComplete='true'
            />
          </div>
          <div className="input__group">
            <label htmlFor="password" className=" login__password">Password</label>
            <input 
                type="password" value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                className="email" placeholder='password' id='password' 
                autoComplete='true'
            />
          </div>
        </form>
        <button onClick={handleLogin} className='login__btn'>Login</button>
      </div>
    
    </div>
  )
}

export default LoginScreen