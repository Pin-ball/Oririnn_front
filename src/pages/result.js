import Navbar from "../components/navbar_block";
import Card from "../components/card_block";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {URL_API} from "../config"
import jwt_decode from "jwt-decode"
import useSWR from 'swr'
import styles from '../styles/result.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

function Result() {
  const { iterate } = useParams();
  const [map, setMap] = useState({visible: true, width: 600, height: 400});
  const [location, setLocation] = useState("france");
  const [filters, setFilters] = useState(null);
  const { data, error } = useSWR(filters !== null ? `${URL_API}search${filters}` : null, fetcher)

  useEffect(() => {
    const token = localStorage.getItem("Token");
    let user_id = ""
    if (token !== null) {
      const decoded = jwt_decode(token);
      user_id = "&user_id=" + decoded.id
    }

    let url = window.location.href
    let params = url.slice(url.indexOf("?")) + user_id

    setFilters(params)
  }, [iterate]);


  function cards() {
    let display = []

    if (error) {
      display.push(<div key="error" style={{textAlign:"center"}}><br/>Désolé, il semble qu'une erreur se soit produite...<br/>Merci de réessayer plus tard</div>)
    }
    else if (!data) {
      display.push(<div key="loading" style={{textAlign:"center"}}><br/>Chargement ...</div>)
    }
    else {
      if (typeof data === "string") {
        display.push(<div key="no offer" style={{textAlign:"center"}}><br/>Désolé, aucune offre ne correspond à votre recherche ...</div>)
      }
      else {
        for (let index = 0; index < data.length; index++) {        
          display.push(<Card key={data[index].id} {...{value: data[index], setLoc: setLocation}}></Card>)
        }
      }
    }

    return display
  }

  return (
    <main>
      <div className={styles.container}>

        <div className={styles.header}>
          <Navbar></Navbar>
        </div>

        <div className={map.visible ? styles.body : styles.bodyAll}>
          <div className={styles.cards}>
            {cards()}

            <button className={styles.btnMap} onClick={() => setMap({ ...map, visible: !map.visible })}>
              {map.visible ? "Cacher la carte" : "Afficher la carte"}
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style={{display: "inline-block", height: "16px", width: "16px", fill: "rgb(255, 255, 255)"}}><path d="M31.245 3.747a2.285 2.285 0 0 0-1.01-1.44A2.286 2.286 0 0 0 28.501 2l-7.515 1.67-10-2L2.5 3.557A2.286 2.286 0 0 0 .7 5.802v21.95a2.284 2.284 0 0 0 1.065 1.941A2.29 2.29 0 0 0 3.498 30l7.515-1.67 10 2 8.484-1.886a2.285 2.285 0 0 0 1.802-2.245V4.247a2.3 2.3 0 0 0-.055-.5zM12.5 25.975l-1.514-.303L9.508 26H9.5V4.665l1.514-.336 1.486.297v21.349zm10 1.36l-1.515.337-1.485-.297V6.025l1.514.304L22.493 6h.007v21.335z"></path></svg>
            </button>
          </div>

          {map.visible && <div className={styles.map}>
            <iframe
              title="Map"
              width="100%"
              height="100%"
              src={"https://www.google.com/maps?q="+location+"&output=embed"}>
            </iframe>
          </div>}
        </div>

        <footer className={styles.footer}>
        © 2022 Orir'inn, Inc. &nbsp;&nbsp;&nbsp; · <Link to="/cgu"> Conditions générales </Link> · <Link to="/fonctionnement"> Fontionnement du site </Link>
        </footer>

      </div> 
    </main>
  );
}

export default Result