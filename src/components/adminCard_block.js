import { Link } from 'react-router-dom';
import styles from '../styles/adminCard.module.css';
import {URL_API} from "../config"

function MiniCard(prop) {
  const token = localStorage.getItem('Token')

  async function Supprimer(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    var params = JSON.stringify({
      "id": id
    });
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: params,
      redirect: 'follow'
    };
    prop.onDelete(id)
    await fetch("offer/" + id, requestOptions)
  }

  async function Approuved(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };
    prop.onApprouve(id)
    await fetch(URL_API+"validate/" + id, requestOptions)
  }

  return (

    <div className={styles.container}>
      <Link to={`/offer/${prop.value.id}`}>
        <img
          className={styles.images}
          src={`${URL_API}static/images/${prop.value.id}/image1.jpg`} alt="" />

        <div className={styles.content}>
          <div>{prop.value.city}</div>
          <div>{prop.value.title}</div>
          <div>{prop.value.dates_start}, {prop.value.dates_end}</div>
        </div>
      </Link>
      <button className={styles.delete} onClick={() => Supprimer(prop.value.id)}>X</button>&nbsp;&nbsp;
      <button className={styles.approuve} onClick={() => Approuved(prop.value.id)}>✓</button>
    </div>
  );
}

export default MiniCard