import { useState, useEffect } from 'react'
import AdminNav from '../components/admin_block'
import MiniCard from '../components/adminCard_block'
import style from '../styles/alloffer.module.css'
import {URL_API} from "../config"


function Validate() {
    const [offer, setOffer] = useState([])
    const token = localStorage.getItem('Token')
    useEffect(() => {
        getOffers()
    }, [])

    async function getOffers() {
        var myHeaders = new Headers()
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        let result = await fetch(URL_API+"validate", requestOptions)
        let data = await result.json();
        setOffer(data)
    }
    return (
        <div>
            <AdminNav></AdminNav>
            <div className={style.container}>
                {offer.map((value, key) =>
                    <MiniCard key={key} {...{ value: value, setter: getOffers }} onDelete={(id) => { setOffer(old => old.filter(e => e.id !== id)) }}
                        onApprouve={(id) => { setOffer(old => old.filter(e => e.id !== id)) }}></MiniCard>
                )}
                {!offer[0] && <div style={{"margin": "20px"}}>Aucune offre en attente de validation actuellement</div>}
            </div>
        </div>
    )
}

export default Validate