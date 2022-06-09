import {Link, useNavigate} from "react-router-dom";
import React, { useState } from "react";
import {URL_API} from "../config"
import styles from "../styles/register.module.css";

function Login() {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate();

  //CHECK USER INFO 
  function verifyLogin() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: details.email,
      password: details.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(URL_API+"auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.AcessToken) {
          localStorage.setItem("Token", result.AcessToken);
          navigate("/");
        }
        else if (result.message) {
          setErrorMessage("Adresse e-mail ou mot de passe invalide")
        }
      })
  }

  return (
    <>
      <Link to={"/"}>
      <img
        className={styles.logo}
        src={"/icon/castle.svg"}
        alt="oririnn logo"
      />
      </Link>
      <div className={styles.container}>
        <h1>CONNEXION</h1>
      
        <label name="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
      ></input>
      
        <label name="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={details.password}
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
        ></input>

        <button className={styles.btn} type="button" onClick={verifyLogin}> Login </button>
        <h5 className={styles.errorLogin}>{errorMessage}</h5>
        <div className={styles.more}>
          Besoin de créer votre compte ? Rendez-vous &nbsp;
          <Link to="/register" className={styles.link}>ici</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
