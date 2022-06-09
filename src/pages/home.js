import { useState, useEffect } from 'react';
import Navbar from "../components/navbar_block";
import Card from "../components/card_block";
import styles from '../styles/home.module.css';
import jwt_decode from "jwt-decode"
import useSWR from 'swr'
import {URL_API} from "../config"


const fetcher = (url) => fetch(url).then((res) => res.json());

function Home() {
  const [user_id, setUser_id] = useState(null);
  const { data, error } = useSWR(user_id !== null ? URL_API+'offer'+ user_id : null, fetcher)

  //GET TOKEN INFO
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token !== null) {
      const decoded = jwt_decode(token);
      setUser_id(`?user_id=${decoded.id}`)
    }
    else {
      setUser_id("")
    }
  }, []);


  // RENDER
  if (error) {
    return ("ERROR ...")
  }
  else if (!data) {
    return ("LOADING ...")
  }

  return (
    <main>
      <Navbar />
      <div className={styles.cards}>
        {data.map(e => <Card key={e.favorite ? e.id+"1" : e.id+"0"} value={e}></Card>)}
      </div>
    </main>
  );
}

export default Home