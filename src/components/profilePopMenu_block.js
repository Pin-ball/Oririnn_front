import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/profilePopMenu.module.css";
import jwt_decode from "jwt-decode"



function ProfileMenu_Pop() {
  const navigate = useNavigate();
  const [Token, setToken] = useState();

  //GET TOKEN INFO
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token !== null) {
      const decoded = jwt_decode(token);
      setToken(decoded)
    }
  }, []);

  // DISCONNECT
  function disconnect() {
    localStorage.removeItem("Token")
    navigate("/login")
    // setToken()
  }

  return (
    <div className={styles.container}>
      {localStorage.getItem("Token") === null ?
        <><Link className={styles.bold} to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link> 
          <div className={styles.line}></div></>:
        <><div className={`${styles.bold} ${styles.btn}`} onClick={() => disconnect()} >Déconnexion</div>
          <Link to="/profile">Gérer mon profil</Link>
          <Link to="/host">Gérer mes anonces</Link>
          <div className={styles.line}></div>
          <Link to="/newOffer">Ajouter un hébergement</Link></>}

          <Link to="/fonctionnement"> Aide </Link>

      {Token?.admin === "1" && <><div className={styles.line}></div>
        <Link to="/admin">Administration</Link></>}
    </div>
  );
}

export default ProfileMenu_Pop;