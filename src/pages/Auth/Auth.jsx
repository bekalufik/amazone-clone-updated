import React, { useState } from "react";
import classes from "./Auth.module.css";
import { Link ,useLocation,useNavigate} from "react-router-dom";
import { auth } from "../../utility/firebase";
import { Type } from "../../utility/action.type";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { useStateValue } from "../../components/DataProvider/DataProvider";
const Auth = () => {
  const [{ user, basket }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const navigate=useNavigate();
  const navStateData=useLocation();
  // console.log(user);
  const authHandler = (e) => {
    e.preventDefault();
    if (e.target.name == "signin") {
      setLoading((loading) => {
        return { ...loading, signIn: true };
      });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          setError("")
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading((loading) => {
            return { ...loading, signIn: false };
          });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          // console.log(err.message);
          setError(err.message);
          setLoading((loading) => {
            return { ...loading, signIn: false };
          });
        });
    } else {
      setLoading((loading) => {
        return { ...loading, signUp: true };
      });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading((loading) => {
            return { ...loading, signUp: false };
          });
          navigate(navStateData?.state?.redirect||'/')
        })
        .catch((err) => {
          // console.log(err.message);
          setError(err.message);
          setLoading((loading) => {
            return { ...loading, signUp: false };
          });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg &&
          <small
          style={{
            padding:'5px',
            textAlign:'center',
            color:'red',
            fontWeight:'bold'
          }}
          >
            {navStateData?.state?.msg}
            </small>
        }
        <form action="">
          <div>
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            name="signin"
            className={classes.login__signInButton}
            onClick={authHandler}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          type="submit"
          name="signup"
          className={classes.login__registerButton}
          onClick={authHandler}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
