import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import {URL_API} from "../config"
import styles from '../styles/register.module.css';


function Register() {

  const [details, setDetails] = useState({})
  const [error, setError] = useState({email: false, password: false, confirm_password: false })
  console.log(details.phone)
  const navigate = useNavigate()
  
  function verifyRegister() {
    let cancel = false
    let check_email = details.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    //RESET & CHECK ERRORS
    setError((error) => ({ ...error, ...{ email: false, password: false, confirm_password: false } }));

    if (check_email === null) {
      setError((error) => ({ ...error, ...{ email: true } }));
      cancel = true;
    }

    if (details.password.length <= 5) {
      setError((error) => ({ ...error, ...{password: true} }));  
      cancel = true;
    }

    if (details.password !== details.confirm_password) {
      setError((error) => ({ ...error, ...{ confirm_password: true } }));  
      cancel = true;
    }
    
    // REGISTER IF NO ERROR
    if (cancel === false) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "firstname":details.firstname,
        "lastname":details.lastname,
        "email":details.email,
        "password":details.password,
        "phone": details.phone,
        "age": details.age
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch(URL_API+"auth/register", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (!result.message) {
          navigate('/login')
        }
      })
      .catch(error => console.log("--> Register error: ", error));

    }
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
          <h1>Bienvenue sur Orir'inn</h1>

          <label name="firstname">Prénom</label>
          <input
            type="text"
            name="firstname"
            placeholder=""
            value={details.firstname}
            onChange={(e) =>
              setDetails({ ...details, firstname: e.target.value })
            }
          ></input>

          <label name="lastname">Nom</label>
          <input
            type="text"
            name="lastname"
            placeholder=""
            value={details.lastname}
            onChange={(e) => setDetails({ ...details, lastname: e.target.value })}
          ></input>

          <label name="phone">Téléphone</label>
          <input
            type="text"
            name="phone"
            placeholder="06 xx xx xx xx"
            value={details.phone}
            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
          ></input>

          <label name="age">Age</label>
          <input
            type="number"
            name="age"
            placeholder=""
            value={details.age}
            onChange={(e) => setDetails({ ...details, age: e.target.value })}
          ></input>

          <label name="language">Langue</label>
          <input
            type="text"
            name="language"
            placeholder=""
            value={details.language}
            onChange={(e) => setDetails({ ...details, language: e.target.value })}
          ></input>

          <label name="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder=""
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          ></input>
          {error.email === true && <div className={styles.error}>Email incorrect</div>}

          <label name="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder=""
            value={details.password}
            onChange={(e) => setDetails({ ...details, password: e.target.value })}
          ></input>
          {error.password === true && <div className={styles.error}>Mot de passe incorrect</div>}


          <label name="confirm_password">Confirmer mot de passe</label>
          <input
            type="password"
            name="confirm_password"
            placeholder=""
            value={details.confirm_password}
            onChange={(e) =>
              setDetails({ ...details, confirm_password: e.target.value })
            }
          ></input>
          {error.confirm_password === true && <div className={styles.error}>Mots de passe différents</div>}

          <button className={styles.btn} onClick={verifyRegister}> Enregister </button>
          <div className={styles.more}>
            Vous avez déjà un compte ? Connectez-vous &nbsp;
            <Link className={styles.link} to="/login">ici</Link>
          </div>
        </div>
      </>
    );

}

export default Register;
