import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/home/HomeScreen";
import LoginScreen from "./screens/login/LoginScreen";


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginScreen />} /> 
        <Route path="/home-screen/:id" element={<HomeScreen />} /> 
      </Routes>  
    </div>
    );
}

export default App;
