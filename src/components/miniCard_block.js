import styles from '../styles/miniCard.module.css';
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
    await fetch(URL_API+"offer/" + id, requestOptions)
    alert('Votre annonce à été supprimée')
  }
  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.images}
          src={`${URL_API}static/images/${prop.id}/image1.jpg`}
          alt="offer images"
        />

        <div className={styles.content}>
          <div>{prop.title}</div>
          <div>{prop.city}</div>
          <div>{prop.date_start} - {prop.date_end}</div>
        </div>
        <button className={styles.delete} onClick={() => Supprimer(prop.id)}>x</button>
      </div>
    </>
  );
}

export default MiniCard