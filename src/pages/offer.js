import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar_block";
import Calendar from "../components/calendar_block";
import styles from "../styles/offer.module.css";
import jwt_decode from "jwt-decode";
import useSWR from "swr";
import {URL_API} from "../config"


const fetcher = (url) => fetch(url).then((res) => res.json());

function Offer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Token, setToken] = useState("");
  const [offer, setOffer] = useState();
  const [PopUp, setPopUp] = useState(false);
  const {data, error } = useSWR(`${URL_API}offer/${id}?user_id=${Token.id}`, fetcher);
  const token = localStorage.getItem('Token')

  //OPTIONS TO DISPLAY
  const OptionsList = [
    { text: "Wifi", img: "wifi.svg", db: "wifi"},
    { text: "Cuisine", img: "kitchen.svg", db: "cuisine"},
    { text: "Lave linge", img: "washer.svg", db: "lave"},
    { text: "Seche linge", img: "dryer.svg", db: "seche"},
    { text: "Climatisation", img: "ac.svg", db: "climatisation"},
    { text: "Chauffage", img: "heater.svg", db: "chauffage"},
    { text: "Espace de travail", img: "work.svg", db: "workspace"},
    { text: "Télévision", img: "tv.svg", db: "television"},
    { text: "Piscine", img: "swimsuit.svg", db: "piscine"},
    { text: "Jacuzzi", img: "jacuzzi.svg", db: "jacuzzi"},
    { text: "Barbecue", img: "grill.svg", db: "barbecue"},
  ]

  //GET TOKEN INFO
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token !== null) {
      const decoded = jwt_decode(token);
      setToken(decoded);
    }
  }, []);

  //SET OFFER INFO
  useEffect(() => {
    if (data !== undefined) {
      setOffer({ ...offer, ...data, gap: 0})
    }
  }, [data]);

  //UPDATE TOTAL PRICE
  useEffect(() => {
    if (offer?.gap !== undefined) {  
      setOffer({ ...offer, totalPrice: parseInt(offer.price) * parseInt(offer.gap) })
    }
  }, [offer?.gap]);
  

  // ADD/REMOVE FAV
  const Fav = async () => {
    var myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
        
    var requestOptions;
    if (offer.favorite === false) {
      requestOptions = {
        headers: myHeaders,
        method: "POST",
        redirect: "follow",
      };
    } else {
      requestOptions = {
        headers: myHeaders,
        method: "DELETE",
        redirect: "follow",
      };
    }

    const response = await fetch(`${URL_API}favorites?user_id=${Token.id}&offer_id=${id}`, requestOptions);
    const res = await response.json();

    if (res !== undefined) {
      setOffer({ ...offer, favorite: !offer.favorite })
    }
  }

    //ADD/REMOVE FAV
    const Book = async () => {
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      myHeaders.append("Authorization", "Bearer " + token);

      var raw = JSON.stringify({
        "offer_id": id,
        "user_id": Token.id,
        "dates_start": offer.from,
        "dates_end": offer.to
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: raw
      }

      const response = await fetch(`${URL_API}booking`, requestOptions)
      const result = await response.json()
      
      if (result.id !== undefined) {
        navigate("/")
      }
    }

  //RENDER
  if (error || (offer?.id === undefined && offer) ) {
    return ( <><Navbar></Navbar>
    <div>Oups, il semble que cette offre n'existe pas ...</div></>)

  }
  else if (!offer) {
    return ( <><Navbar></Navbar>
    <div>Chargement ...</div></>)
  }

  return (
    <main>
      <Navbar></Navbar>

      {offer && (
        <div className={styles.wrapper}>
          <h3>{offer.title}</h3>

          <div className={styles.info}>
            <div className={styles.infoPart}>
              <img
                className={styles.icon}
                src={"/icon/star.svg"}
                alt="star logo"
              />
              <span className={styles.score}>Nouveau</span>
              &nbsp; - &nbsp;
              <div>
                {offer.address}, {offer.city} {offer.postcode}, {offer.country}
              </div>
            </div>

            <div className={styles.infoPart}>
              <button className={styles.save} 
                onClick={() => {if (Token !== "") {Fav()}} }>
                <img
                  className={styles.icon}
                  src={ offer.favorite ? "/icon/heartFull.svg" : "/icon/heartEmpty.svg" }
                  alt="heart logo"
                />
                {offer.favorite ? "Enregistré" : "Enregistrer"}
              </button>
            </div>
          </div>

          {/* IMAGES */}
          <div className={styles.images}>
            <div className={styles.gridContainer}>
              <div className={`${styles.gridItem} ${styles.gridItem1}`}>
                <img
                  src={offer.images >= 1 ? `${URL_API}static/images/${offer.id}/image1.jpg`
                  : "https://erp.netbizde.com/cdn/static/products/default.jpg"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src="https://erp.netbizde.com/cdn/static/products/default.jpg";
                  }}
                  alt="offer image_1"
                />
              </div>
              <div className={styles.gridItem}>
                <img
                  src={offer.images >= 2 ? `${URL_API}static/images/${offer.id}/image2.jpg`
                  : "https://erp.netbizde.com/cdn/static/products/default.jpg"}    
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src="https://erp.netbizde.com/cdn/static/products/default.jpg";
                  }}              
                  alt="offer image_2"
                />
              </div>
              <div className={styles.gridItem}>
                <img
                  src={offer.images >= 3 ? `${URL_API}static/images/${offer.id}/image3.jpg`
                  : "https://erp.netbizde.com/cdn/static/products/default.jpg"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src="https://erp.netbizde.com/cdn/static/products/default.jpg";
                  }}
                  alt="offer image_3"
                />
              </div>
              <div className={styles.gridItem}>
                <img
                  src={offer.images >= 4 ? `${URL_API}static/images/${offer.id}/image4.jpg`
                  : "https://erp.netbizde.com/cdn/static/products/default.jpg"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src="https://erp.netbizde.com/cdn/static/products/default.jpg";
                  }}
                  alt="offer image_4"
                />
              </div>
              <div className={styles.gridItem}>
                <img
                  src={offer.images >= 5 ? `${URL_API}static/images/${offer.id}/image5.jpg`
                  : "https://erp.netbizde.com/cdn/static/products/default.jpg"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src="https://erp.netbizde.com/cdn/static/products/default.jpg";
                  }}
                  alt="offer image_5"
                />
              </div>
            </div>
          </div>

          <div className={styles.content}>

            {/* LEFT */}
            <div className={styles.left}>
              <div className={styles.part}>
                <h3>Capacité d'acceuil</h3>
                <div className={styles.blocks}>
                  <div className={styles.block}>
                    <img
                      className={styles.bigIcon}
                      src={"/icon/person.svg"}
                      alt="traveler logo"
                    /> 
                    <div> {offer.capacity} Voyageurs</div>
                  </div>
                  <div className={styles.block}>
                    <img
                      className={styles.bigIcon}
                      src={"/icon/lamp.svg"}
                      alt="bedroom logo"
                    /> 
                    <div> {offer.options.chambres} Chambres</div>
                  </div>
                  <div className={styles.block}>
                    <img
                      className={styles.bigIcon}
                      src={"/icon/bed.svg"}
                      alt="bed logo"
                    /> 
                    <div> {offer.options.lits} Lits</div>
                  </div>
                </div>
              </div>
              <div className={styles.part}>
                <h3>Description</h3>
                <p>{offer.description}</p>
              </div>
              <div className={styles.part}>
                <h3>Ce que propose ce logement</h3>
                <div className={styles.options}>
                  
                    {OptionsList.map(e => { if (offer.options[e.db] !== 0) 
                    return (
                      <div className={styles.option} key={e.db}>
                        <img
                          className={styles.icon}
                          src={"/icon/"+e.img}
                          alt= "options logo"
                          /> 
                        {e.text}
                      </div>
                      )}
                    )}
                </div>     
              </div>
            </div>

            {/* RIGHT */}
            <div className={styles.right}>
              <div className={styles.book}>
                <div>
                  <span className={styles.price}>{offer.price} € </span> / nuit
                </div>
                <div className={styles.calendar}  onClick={() => setOffer({ ...offer, visible_cal: !offer.visible_cal })}>
                  <div className={styles.date}>
                    ARRIVEE
                    {offer?.from !== undefined ? <div> {offer?.from} </div> : <div className={styles.placeholder}> Ajouter date </div> }
                  </div>
                  <div className={styles.date}>
                    DEPART
                    {offer?.to !== undefined ? <div> {offer?.to} </div> : <div className={styles.placeholder}> Ajouter date </div> }
                  </div>
                </div>
                <button onClick={() => setPopUp(true)}>Réserver</button>
                <div className={styles.grey}>
                  Aucun montant ne vous sera débité pour le moment
                </div>
                <div className={styles.info}>
                  <div> {offer.price} x {offer?.gap} nuits </div>
                  <div> {offer.totalPrice} € </div>
                </div>
                <div className={styles.info}>
                  <div> Frais de service </div>
                  <div> 0 € </div>
                </div>
                <div className={styles.info}>
                  <div> Total </div>
                  <div> {offer.totalPrice} € </div>
                </div>
              </div>
              <div className={offer?.visible_cal ? styles.visible_cal : styles.hidden }>
                <Calendar key={offer.bookings.length} {...{offer: offer, setOffer: setOffer}} />
              </div>
            </div>
          </div>

          {/* POP-UP */}

          {PopUp &&
            <div className={styles.confirmPop} onClick={() => setPopUp(false)}>
            
            { Token !== "" ?
            <div className={styles.confirm} onClick={(e) => e.stopPropagation()}>
              <h3>Confirmation</h3>
              <p>Vous êtes sur le point de finaliser votre réservation</p>
              
                <div className={styles.calendar}>
                  <div className={styles.date}>
                    ARRIVEE
                    {offer?.from !== undefined ? <div> {offer?.from} </div> : <div className={styles.placeholder}> Date manquante </div> }
                  </div>
                  <div className={styles.date}>
                    DEPART
                    {offer?.to !== undefined ? <div> {offer?.to} </div> : <div className={styles.placeholder}> Date manquante </div> }
                  </div>
                </div>
                <div className={styles.info}>
                  <div> {offer.price} x {offer?.gap} nuits </div>
                  <div> Total &nbsp; {offer.totalPrice} € </div>
                </div>
                <div className={styles.btns}>
                  <button className={styles.cancel} onClick={() => setPopUp(false)}>Annuler</button>
                  {offer.gap === 0 ? <button className={styles.disable}>Réserver</button>
                  : <button className={styles.ok} onClick={Book}>Réserver</button>}
                </div>
            </div>
            :
            <div className={styles.confirm}>
              <h3>Information</h3>
              <p>Merci de vous connecter afin de pouvoir finaliser cette réservation.</p>
              <br></br>
              <Link to="/login" className={styles.cancel}>Connexion</Link>
            </div>
            }
          </div>}

        </div>
      )}
    </main>
  );
}

export default Offer;
