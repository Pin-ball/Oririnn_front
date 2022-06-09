import { useState } from "react"
import jwt_decode from "jwt-decode"
import Navbar from "../components/navbar_block";
import style from '../styles/create_offer.module.css'
import {URL_API} from "../config"

function Offer() {
    const [count, setCount] = useState(0)
    const [preview, setPreview] = useState({ une: "", deux: "", trois: "", quatre: "", cinq: "" })
    const [image, setImage] = useState({ image1: "", image2: "", image3: "", image4: "", image5: "" })
    const [offer, setOffer] = useState({ title: "", adress: "", code: "", city: "", description: "", start: "", end: "", capacity: "", price: 0 })
    const [option, setOption] = useState({ wifi: false, lave: false, cuisine: false, seche: false, climatisation: false, chauffage: false, workspace: false, television: false, piscine: false, jacuzzi: false, barbecue: false, chambres: 0, lits: 0 })
    const token = localStorage.getItem("Token");
    const decoded = jwt_decode(token);
    const userid = decoded.id
    const date1 = new Date()
    console.log('PRICE', offer.price)
    async function Verify(e) {
        let date2 = new Date(e)
        let difference = date2 > date1
        if (difference === false) {
            alert('Vous ne pouvez pas sélectionner une date antérieure ou égale à celle d\'aujourd\'hui')
        }
        else {
            setOffer({ ...offer, start: e.replace(/-/g, "/") })
        }
    }

    async function setDate(e) {
        let date2 = new Date(e)
        let difference = new Date(offer.start) < date2
        if (difference === false) {
            alert('Vous ne pouvez pas sélectionner une date antérieure à celle de début de séjour')
        }
        else {
            setOffer({ ...offer, end: e.replace(/-/g, "/")  })
        }
    }

    function Count() {
        setCount(count + 1)
    }
    const input1 = (file) => {
        setImage({ ...image, image1: file })
        setPreview({ ...preview, une: URL.createObjectURL(file) });
        Count()
    }
    const input2 = (file) => {
        setImage({ ...image, image2: file })
        setPreview({ ...preview, deux: URL.createObjectURL(file) });
        Count()
    }
    const input3 = (file) => {
        setImage({ ...image, image3: file })
        setPreview({ ...preview, trois: URL.createObjectURL(file) });
        Count()
    }
    const input4 = (file) => {
        setImage({ ...image, image4: file })
        setPreview({ ...preview, quatre: URL.createObjectURL(file) });
        Count()
    }
    const input5 = (file) => {
        setImage({ ...image, image5: file })
        setPreview({ ...preview, cinq: URL.createObjectURL(file) });
        Count()
    }

    async function createOffer() {
        if (offer.title === "" || offer.adress === "" || offer.code === "" || offer.city === "" || offer.description === "" || offer.start === "" || offer.end === "" || offer.capacity === "" || offer.price === "" || image.image1 === "") {
            alert('Veuillez vérifier que vous avez renseignés tous les champs marqués d\'un astérisque')
        }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);

            var offers = JSON.stringify({
                offers: {
                    "user_id": parseInt(userid),
                    "title": offer.title,
                    "description": offer.description,
                    "images": count,
                    "dates_start": offer.start,
                    "dates_end": offer.end,
                    "capacity": offer.capacity,
                    "price": parseInt(offer.price),
                    "address": offer.adress,
                    "postcode": offer.code,
                    "city": offer.city
                },
                options: {
                    "piscine": option.piscine,
                    "jacuzzi": option.jacuzzi,
                    "barbecue": option.barbecue,
                    "wifi": option.wifi,
                    "climatisation": option.climatisation,
                    "chauffage": option.chauffage,
                    "lave": option.lave,
                    "seche": option.seche,
                    "cuisine": option.cuisine,
                    "workspace": option.workspace,
                    "television": option.television,
                    "chambres": parseInt(option.chambres),
                    "lits": parseInt(option.lits)
                }
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: offers,
                redirect: 'follow'
            };

            let data = await fetch(URL_API+"offer", requestOptions)
            const Id = await data.json()

            var formdata = new FormData();
            formdata.append("image1", image.image1);
            formdata.append("image2", image.image2);
            formdata.append("image3", image.image3);
            formdata.append("image4", image.image4);
            formdata.append("image5", image.image5);

            var Options = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            await fetch(URL_API+"image/" + Id, Options)
            alert('Annonce crée avec succès. Elle sera publiée après vérification par un administrateur. Vous pouvez déposer d\'autre annonce ou retourner à l\'acceuil')
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className={style.body}>
                <div className={style.head}>
                    <div className="title">
                        <p>Titre de l'annonce : *</p>
                        <input type="text" onInput={e => setOffer({ ...offer, title: e.target.value })}></input>
                    </div>
                    <div className="adresse">
                        <p>Adresse : *</p>
                        <input type="text" placeholder="  Numéro, voie" onInput={e => setOffer({ ...offer, adress: e.target.value })}></input>
                    </div><div className="adresse">
                        <p>Code Postal : *</p>
                        <input type="text" placeholder="  Code Postal" onInput={e => setOffer({ ...offer, code: e.target.value })}></input>
                    </div>
                    <div className="commune">
                        <p>Commune : *</p>
                        <input type="text" placeholder="  Ville" onInput={e => setOffer({ ...offer, city: e.target.value })}></input>
                    </div>
                    <div className={style.preview}>
                        <div>
                            <p>Preview : </p>
                            <p>{offer.adress}</p>
                            <p>{offer.code}</p>
                            <p>{offer.city}</p>
                        </div>
                    </div>
                </div>
                <p>Photos du logement (une photo minimum) *: </p>
                <div className={style.images}>
                    <div className={style.photo}>
                        <input type="file" onChange={(e) => input1(e.target.files[0])} />
                        {<img src={preview.une} alt="" />}
                    </div>
                    {preview.une !== "" &&
                        <div className={style.photo}>
                            <input type="file" onChange={(e) => input2(e.target.files[0])} />
                            {<img src={preview.deux} alt="" />}
                        </div>}
                    {preview.deux !== "" &&
                        <div className={style.photo}>
                            <input type="file" onChange={(e) => input3(e.target.files[0])} />
                            {<img src={preview.trois} alt="" />}
                        </div>}
                    {preview.trois !== "" &&
                        <div className={style.photo}>
                            <input type="file" onChange={(e) => input4(e.target.files[0])} />
                            {<img src={preview.quatre} alt="" />}
                        </div>}
                    {preview.quatre !== "" &&
                        <div className={style.photo}>
                            <input type="file" onChange={(e) => input5(e.target.files[0])} />
                            {<img src={preview.cinq} alt="" />}
                        </div>}
                </div>
                <div className={style.choosen}>
                    <div className={`${style.optionsBlock}`}>
                        <div className={style.options}>
                            <p>Equipements :</p>
                            <label>
                                <input type="checkbox" onChange={() => setOption({ ...option, wifi: !option.wifi })} />
                                <span className={`${style.checkbox} ${option.wifi ? style.checkboxActive : ""}`} />
                                Wifi
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => setOption({ ...option, cuisine: !option.cuisine })} />
                                <span className={`${style.checkbox} ${option.cuisine ? style.checkboxActive : ""}`} />
                                Cuisine
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => setOption({ ...option, lave: !option.lave })} />
                                <span className={`${style.checkbox} ${option.lave ? style.checkboxActive : ""}`} />
                                Lave linge
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => setOption({ ...option, seche: !option.seche })} />
                                <span className={`${style.checkbox} ${option.seche ? style.checkboxActive : ""}`} />
                                Sèche linge
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => setOption({ ...option, climatisation: !option.climatisation })} />
                                <span className={`${style.checkbox} ${option.climatisation ? style.checkboxActive : ""}`} />
                                Climatisation
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => setOption({ ...option, chauffage: !option.chauffage })} />
                                <span className={`${style.checkbox} ${option.chauffage ? style.checkboxActive : ""}`} />
                                Chauffage
                            </label>
                        </div>
                    </div><div className={`${style.optionsBlock}`}>
                        <div className={style.optiondeux}>
                            <br></br>
                            <label>
                                <input type="checkbox" onChange={() => setOption({ ...option, workspace: !option.workspace })} />
                                <span className={`${style.checkbox} ${option.workspace ? style.checkboxActive : ""}`} />
                                Espace de travail dédié
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => setOption({ ...option, television: !option.television })} />
                                <span className={`${style.checkbox} ${option.television ? style.checkboxActive : ""}`} />
                                Télévision
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => setOption({ ...option, piscine: !option.piscine })} />
                                <span className={`${style.checkbox} ${option.piscine ? style.checkboxActive : ""}`} />
                                Piscine
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => setOption({ ...option, jacuzzi: !option.jacuzzi })} />
                                <span className={`${style.checkbox} ${option.jacuzzi ? style.checkboxActive : ""}`} />
                                Jacuzzi
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => setOption({ ...option, barbecue: !option.barbecue })} />
                                <span className={`${style.checkbox} ${option.barbecue ? style.checkboxActive : ""}`} />
                                Barbecue
                            </label>
                        </div>
                    </div>
                    <div className={style.description}>
                        <div className={style.date}>
                            <p>Dates de dispo : *</p>
                            <input type="date" onChange={e => Verify(e.target.value)}></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="date" onChange={e => setDate(e.target.value)}></input >
                        </div>
                        <p>Description de l'annonce : *</p>
                        <textarea type="text" style={{ height: 150, width: 400, resize: "none", borderRadius: 5 }} onInput={e => setOffer({ ...offer, description: e.target.value })}></textarea>
                    </div>
                    <div className={`${style.block} ${style.roomBlock}`}>
                        <p>Nombre de place disponible : *</p>
                        <ul>
                            <li onClick={() => setOffer({ ...offer, capacity: 1 })} style={offer.capacity === 1 ? { "backgroundColor": "black", "color": "white" } : {}}>1</li>
                            <li onClick={() => setOffer({ ...offer, capacity: 2 })} style={offer.capacity === 2 ? { "backgroundColor": "black", "color": "white" } : {}}>2</li>
                            <li onClick={() => setOffer({ ...offer, capacity: 3 })} style={offer.capacity === 3 ? { "backgroundColor": "black", "color": "white" } : {}}>3</li>
                            <li onClick={() => setOffer({ ...offer, capacity: 4 })} style={offer.capacity === 4 ? { "backgroundColor": "black", "color": "white" } : {}}>4</li>
                            <li onClick={() => setOffer({ ...offer, capacity: 5 })} style={offer.capacity === 5 ? { "backgroundColor": "black", "color": "white" } : {}}>5</li>
                            <li onClick={() => setOffer({ ...offer, capacity: 6 })} style={offer.capacity === 6 ? { "backgroundColor": "black", "color": "white" } : {}}>6</li>
                            <li onClick={() => setOffer({ ...offer, capacity: 7 })} style={offer.capacity === 7 ? { "backgroundColor": "black", "color": "white" } : {}}>7</li>&nbsp;
                            <input placeholder="  Autre" onInput={e => setOffer({ ...offer, capacity: e.target.value })}></input>
                        </ul>
                        <p>Nombre de chambre :</p>
                        <ul>
                            <li onClick={() => setOption({ ...option, chambres: 1 })} style={option.chambres === 1 ? { "backgroundColor": "black", "color": "white" } : {}}>1</li>
                            <li onClick={() => setOption({ ...option, chambres: 2 })} style={option.chambres === 2 ? { "backgroundColor": "black", "color": "white" } : {}}>2</li>
                            <li onClick={() => setOption({ ...option, chambres: 3 })} style={option.chambres === 3 ? { "backgroundColor": "black", "color": "white" } : {}}>3</li>
                            <li onClick={() => setOption({ ...option, chambres: 4 })} style={option.chambres === 4 ? { "backgroundColor": "black", "color": "white" } : {}}>4</li>
                            <li onClick={() => setOption({ ...option, chambres: 5 })} style={option.chambres === 5 ? { "backgroundColor": "black", "color": "white" } : {}}>5</li>
                            <li onClick={() => setOption({ ...option, chambres: 6 })} style={option.chambres === 6 ? { "backgroundColor": "black", "color": "white" } : {}}>6</li>
                            <li onClick={() => setOption({ ...option, chambres: 7 })} style={option.chambres === 7 ? { "backgroundColor": "black", "color": "white" } : {}}>7</li>&nbsp;
                            <input placeholder="  Autre" onInput={e => setOffer({ ...offer, chambres: e.target.value })}></input>
                        </ul>
                        <p>Nombre de  lits :</p>
                        <ul>
                            <li onClick={() => setOption({ ...option, lits: 1 })} style={option.lits === 1 ? { "backgroundColor": "black", "color": "white" } : {}}>1</li>
                            <li onClick={() => setOption({ ...option, lits: 2 })} style={option.lits === 2 ? { "backgroundColor": "black", "color": "white" } : {}}>2</li>
                            <li onClick={() => setOption({ ...option, lits: 3 })} style={option.lits === 3 ? { "backgroundColor": "black", "color": "white" } : {}}>3</li>
                            <li onClick={() => setOption({ ...option, lits: 4 })} style={option.lits === 4 ? { "backgroundColor": "black", "color": "white" } : {}}>4</li>
                            <li onClick={() => setOption({ ...option, lits: 5 })} style={option.lits === 5 ? { "backgroundColor": "black", "color": "white" } : {}}>5</li>
                            <li onClick={() => setOption({ ...option, lits: 6 })} style={option.lits === 6 ? { "backgroundColor": "black", "color": "white" } : {}}>6</li>
                            <li onClick={() => setOption({ ...option, lits: 7 })} style={option.lits === 7 ? { "backgroundColor": "black", "color": "white" } : {}}>7</li>&nbsp;
                            <input placeholder="  Autre" onInput={e => setOffer({ ...offer, lits: e.target.value })}></input>
                        </ul>
                        <div className={style.price}>
                            <p>Prix de la nuit  *:</p>
                            <input type="text" onInput={e => setOffer({ ...offer, price: e.target.value })}></input>
                        </div>
                    </div>
                </div>
                <div className={style.create}>
                        <button className={style.create_button} onClick={() => { createOffer() }}>Créer une offre</button>
                </div>
            </div>
        </div>
    )
}

export default Offer