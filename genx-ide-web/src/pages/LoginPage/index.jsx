import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import "./style.scss";
//components
import InputBox from "../../components/Form/InputBox";
//api
import axios from "axios";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../state/reducers/authSlice.js";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  //login
  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const formData = {
        email,
        password,
      };
      console.log(formData);
      const loginResponse = await axios.post(
        "http://localhost:3001/api/auth/login",
        formData
      );
      const { status, user, token } = loginResponse.data;
      if (status === "SUCCESS") {
        dispatch(setLogin({ user, token }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      Login Page
      <Link to="/workspace">
        <button>workspace</button>
      </Link>
      <Link to="/explore">
        <button>explore</button>
      </Link>
      <div className="login-container">
        <div className="login-card">
          <InputBox
            label="Your Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            setValue={setEmail}
          />
          <InputBox
            label="Password"
            placeholder="password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <button className="login-btn" onClick={loginHandler}>
            Sign In
          </button>
          {isLoading && <p style={{ color: "#fff" }}>loading</p>}
          <h6 className="login-or-divider">OR</h6>
        </div>
      </div>
    </div>
  );
};

export default Login;
