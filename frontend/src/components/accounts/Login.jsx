import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Alert from "../../utils/Alerts";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setAuthTokens } = useContext(AuthContext);
  const [alerts,setalert]=useState({})
  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      const data = JSON.stringify({ username, password });
      const options = { headers: { "content-type": "application/json" } };
      const response = await axios.post(
        // `https://expense-tracker-backend.up.railway.app/accounts/token/`,
        `http://localhost:8000/accounts/token/`,
        data,
        options
      );
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setalert({message :"Login Successfull !",type : "success"})
      navigate("/");
    } catch (error) {
      setalert({message :"Invalid Credentials !",type : "error"})
      console.log(error);
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password);
  };

  return (
    <div className="flex justify-center items-center mt-3"style={{minHeight:"400px"}} >
        <div className="fblock mt-0 bg-slate-50 p-6 round-xl shadow-md shadow-slate-300 w-96">
        {alerts.message && <Alert message={alerts.message} type={alerts.type} />}
        <form action="">
          <h2 className="text-blue-700 text-3xl font-semibold my-4">User Login</h2>
          

          <div class="flex flex-col space-y-2">
            <label className="text-sm">Username</label> 
            <input type="text" id="username" placeholder="Enter Name" className='h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm' onChange={(e) => setUsername(e.target.value)}/><br/>
            <label className="text-sm">Password</label>
            <input type="password" id="password" placeholder="Enter Password" className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <br/>
          <div class="flex flex-col space-y-5">
            <input type="submit" value="Login" id="login" className="bg-blue-700 w-full h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline-2 outline-blue-600 outline-offset-2 text-sm" onClick={handleSubmit} />
          </div>
          <p className="text-xs my-2">New User?  <a href="#" className="text-blue-600"><Link to={`/signup`}>Signup</Link></a></p>
        </form>
        </div>
    </div>
  );
};

export default Login;