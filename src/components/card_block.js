import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/card.module.css';
import jwt_decode from "jwt-decode"
import {URL_API} from "../config"


function Card(prop) {
  const [data, setData] = useState(prop.value);
  const [user_id, setUser_id] = useState("");
  const token = localStorage.getItem("Token");

  //GET TOKEN INFO
  useEffect(() => {
    if (token !== null) {
      const decoded = jwt_decode(token);
      setUser_id(decoded.id)
    }
  }, []);

  //ADD/REMOVE FAV
  const Fav = async (id) => {

    var myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions

    if (data.favorite === false) {
      requestOptions = {
        headers: myHeaders,
        method: 'POST',
        redirect: 'follow',
      };
    }
    else {
      requestOptions = {
        headers: myHeaders,
        method: 'DELETE',
        redirect: 'follow',
      };
    }
    
    const response = await fetch(`${URL_API}favorites?user_id=${user_id}&offer_id=${id}`, requestOptions)
    const result = await response.json()
    
    if (result !== undefined) {
      setData({ ...data, favorite: !data.favorite })
    }
  }


  return (
    <div className={styles.container}>
      <Link to={`/offer/${data.id}`}>
        <img
          className={styles.images}
          src={`${URL_API}static/images/${data.id}/image1.jpg` }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src="https://erp.netbizde.com/cdn/static/products/default.jpg";
          }}
          alt="offer images"
          />
      </Link>

      <div className={styles.content}>
        <Link to={`/offer/${data.id}`} >
          <div className={styles.head}>
              <div className={styles.title}>{data.city}, {data.country}</div>
            <div>
              <span className={styles.score}>Nouveau</span>
              <img
                className={styles.icon}
                src={"/icon/star.svg"}
                alt="star logo"
                />
            </div>
          </div>

          <div className={styles.info}>{data.title}</div>
          <div className={styles.info}>{data.dates_start} - {data.dates_end}</div>
        </Link>

        <div className={styles.footer}>
          <div className={styles.price}>
            <span>{data.price} € </span>/ Nuit
          </div>

          {window.location.href.includes("result") && <div className={styles.map}>
            <div className={styles.popInfo}>Voir sur la carte</div>
              <svg onClick={() => prop.setLoc(data.address)} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style={{display: "inline-block", height: "16px", width: "16px", fill: "#222222"}}><path d="M31.245 3.747a2.285 2.285 0 0 0-1.01-1.44A2.286 2.286 0 0 0 28.501 2l-7.515 1.67-10-2L2.5 3.557A2.286 2.286 0 0 0 .7 5.802v21.95a2.284 2.284 0 0 0 1.065 1.941A2.29 2.29 0 0 0 3.498 30l7.515-1.67 10 2 8.484-1.886a2.285 2.285 0 0 0 1.802-2.245V4.247a2.3 2.3 0 0 0-.055-.5zM12.5 25.975l-1.514-.303L9.508 26H9.5V4.665l1.514-.336 1.486.297v21.349zm10 1.36l-1.515.337-1.485-.297V6.025l1.514.304L22.493 6h.007v21.335z"></path></svg>
          </div>}
        </div>
      </div>

      <img
        className={styles.heart}
        onClick={() => {if (user_id !== "") {Fav(data.id) }} }
        src={data.favorite ? "/icon/heartFull_Outline.svg" : "/icon/heart.svg"}
        alt="favorite heart logo"
      /> 
      </div>
  );
}

export default Card