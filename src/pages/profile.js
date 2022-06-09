import Navbar from "../components/navbar_block";
import { useReducer, useEffect } from "react";
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {URL_API} from "../config"
import styles from '../styles/profile.module.css';

const initialState = {
    toggleProfile: false, 
    toggleFavoris: false, 
    toggleBookings: false, 
    togglePastBookings: false,
    changeNames: false,
    changeEmail: false,
	changeAge: false,
	changePhone: false,
    setFirstname: "",
    setLastname: "",
    setEmail:"",
    setAge: "",
    setPhone: "",
    fetch: ""
};

function reducer(state, action) {
  switch (action.type) {

    case 'profile':
        return {...state ,toggleProfile: !state.toggleProfile};
    case 'favoris':
        return {...state, toggleFavoris: !state.toggleFavoris};
    case 'bookings':
        return {...state, toggleBookings: !state.toggleBookings};
    case 'pastBookings':
        return {...state, togglePastBookings: !state.togglePastBookings};
    case 'changeNames':
        return {
			...state, 
			changeNames: !state.changeNames, 
			changeEmail: state.changeEmail = false,
			changeAge: state.changeAge = false,
			changePhone: state.changePhone = false
		};
    case 'changeEmail':
        return {
			...state, 
			changeEmail: !state.changeEmail, 
			changeNames: state.changeNames = false,
			changeAge: state.changeAge = false, 
			changePhone: state.changePhone = false
		};
	case 'changeAge':
		return {
			...state, 
			changeAge: !state.changeAge, 
			changeNames: state.changeNames = false,
			changeEmail: state.changeEmail = false, 
			changePhone: state.changePhone = false
		};
	case 'changePhone':
		return {
			...state, 
			changePhone: !state.changePhone, 
			changeNames: state.changeNames = false,
			changeAge: state.changeAge = false, 
			changeEmail: state.changeEmail = false
		};
    case 'setUser':
        state.fetch = action.fetchUser
        state.setFirstname = action.fetchUser.user.firstname
        state.setLastname = action.fetchUser.user.lastname
        state.setEmail = action.fetchUser.user.email
        state.setAge = action.fetchUser.user.age
        state.setPhone = action.fetchUser.user.phone
        return {
            ...state,
            fetch: state.fetch,
            setFirstname: state.setFirstname,
            setLastname: state.setLastname,
            setEmail: state.setEmail,
            setAge: state.setAge,
            setPhone: state.setPhone
        }
    case 'updateFirstname':
        state.setFirstname = action.newFirstname
        return {...state, setFirstname: state.setFirstname}
    case 'updateLastname':
        state.setLastname = action.newLastname
        return {...state, setLastname: state.setLastname}
    case 'updateEmail':
        state.setEmail = action.newEmail
        return {...state, setEmail: state.setEmail}
    case 'updateAge':
        state.setAge = action.newAge
        return {...state, setAge: state.setAge}    
    case 'updatePhone':
        state.setPhone = action.newPhone
        return {...state, setPhone: state.setPhone}
    default:
      throw new Error("PROBLEM");
  }
}

function UserProfile() {
    
    const token = localStorage.getItem("Token")
    
    let decoded;
    if (token !== undefined) {
        decoded = jwt_decode(token);
    }
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        
        const fetchData = async () => {
            
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token)
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };  
            const response = await fetch(`/user/${decoded.id}`, requestOptions);
            const json = await response.json();
            dispatch({type: "setUser", fetchUser: json})  
        }
        
        fetchData()
        .catch(console.error);
        
    }, [decoded.id])
    
    const fetchUpdateUser = async (param) => {
        
        let raw;

        for (const key in param) {
            raw = key
            raw = JSON.stringify(param)
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token)
        
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${URL_API}user/${decoded.id}`, requestOptions);
    }

    const test = async () => {
        console.log("GET TEST");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token)
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };  
        const response = await fetch(`/user/${decoded.id}`, requestOptions);
        console.log("RES ", response);
        // console.log("RES LOCK", response.releaseLock());
        // console.log("RES LOCK ?", response);
        // response.releaseLock()
        // console.log("RES LOCK ? still ?", response);
        
        // const json = await response.json();
        // console.log("RES JSON", json);
    }

    return (
        <>
            <div>
                <Navbar></Navbar>
            </div>

            <div className={styles.userPage}>

                <button onClick={()=> test()}>GET HERE BROOOO</button>

                <div className={styles.container}>
                    <h4 onClick={() => dispatch({type: 'profile'})}>INFORMATIONS PERSONNELLES
                        <button className={ state.toggleProfile ? styles.rotateTrue : styles.rotateFalse }> &gt;</button>
                    </h4>
                    {state.toggleProfile && 
                    <div className={styles.personnalInfo}>  

                        {!state.changeNames && 
                        <div className={styles.details}>      
                            <div className={styles.name}> 
                                <label>Nom legal</label>  
                                <div className={styles.field}>{state.setFirstname} {state.setLastname}</div>
                            </div>
                            <button className={styles.modif} onClick={() => dispatch({type: 'changeNames'})}>Modifier</button>
                        </div>}

                        {state.changeNames && 
                        <div className={styles.details}>      
                            <div className={styles.name}> 
                                <label>Nom legal</label> 
                                <div> 
                                    <div className={styles.field}>Renseigner le prenom et le nom</div>
                                    <div className={styles.inputs}>
                                        <div className={styles.prenom}>
                                            <div>Prenom</div>
                                            <input value={state.setFirstname} onChange={event => dispatch({type: "updateFirstname", newFirstname: event.target.value})}></input>
                                        </div>
                                        <div className={styles.nom}>
                                            <div>Nom</div>
                                            <input value={state.setLastname} onChange={event => dispatch({type: "updateLastname", newLastname: event.target.value})}></input>
                                        </div>
                                    </div>
                                </div>
                                <button className={styles.save} onClick={() => ((fetchUpdateUser({firstname: state.setFirstname, lastname: state.setLastname}), dispatch({type: 'changeNames'})))}>Enregistrer</button>
                            </div>
                                <button className={styles.modif} onClick={() => dispatch({type: 'changeNames'})}>Annuler</button>
                        </div>}

                        {!state.changeEmail &&
                        <div className={styles.details}>  
                            <div>
                                <label>Adresse e-mail</label>
                                <div className={styles.field}>{state.setEmail}</div>
                            </div>
                            <button className={styles.modif} onClick={() => dispatch({type: 'changeEmail'})}>Modifier</button>
                        </div>}

                        {state.changeEmail &&
                        <div className={styles.details}>  
                            <div>
                                <label>Adresse e-mail</label>
                                <div className={styles.field}>Modifier votre adresse e-mail</div>
                                <div className={styles.inputs}>
                                    <div className={styles.prenom}>
                                        <div>Adresse e-mail</div>
                                        <input type="email" value={state.setEmail} onChange={event => dispatch({type: "updateEmail", newEmail: event.target.value})}></input>
                                    </div>
                                </div>
                                <button className={styles.save} onClick={() => ((fetchUpdateUser({email: state.setEmail}), dispatch({type: 'changeEmail'})))}>Enregistrer</button>
                            </div>
                                <button className={styles.modif} onClick={() => dispatch({type: 'changeEmail'})}>Annuler</button>
                        </div>}

						{!state.changeAge &&
                        <div className={styles.details}>
                            <div>
                                <label>Age</label>
                                <div className={styles.field}>{state.setAge}</div>
                            </div>
                            <button className={styles.modif} onClick={() => dispatch({type: 'changeAge'})}>Modifier</button>
                        </div>}

						{state.changeAge &&
                        <div className={styles.details}>  
                            <div>
                                <label>Age</label>
                                <div className={styles.field}>Modifier votre age</div>
                                <div className={styles.inputs}>
                                    <div className={styles.prenom}>
                                        <div>Age</div>
                                        <input value={state.setAge} onChange={event => dispatch({type: "updateAge", newAge: event.target.value})}></input>
                                    </div>
                                </div>
                                <button className={styles.save} onClick={() => ((fetchUpdateUser({age: state.setAge}), dispatch({type: 'changeAge'})))}>Enregistrer</button>
                            </div>
                                <button className={styles.modif} onClick={() => dispatch({type: 'changeAge'})}>Annuler</button>
                        </div>}

						{!state.changePhone &&
                        <div className={styles.details}>                            
                            <div>  
                                <label>Telephone</label>           
                                <div className={styles.field}>{state.setPhone}</div>                           
                            </div>
                            <button className={styles.modif} onClick={() => dispatch({type: 'changePhone'})}>Modifier</button>
                        </div>}

						{state.changePhone &&
                        <div className={styles.details}>  
                            <div>
                                <label>Telephone</label>
                                <div className={styles.field}>Modifier votre numero de telephone</div>
                                <div className={styles.inputs}>
                                    <div className={styles.prenom}>
                                        <div>Telephone</div>
                                        <input value={state.setPhone} onChange={event => dispatch({type: "updatePhone", newPhone: event.target.value})}></input>
                                    </div>
                                </div>
                                <button className={styles.save} onClick={() => ((fetchUpdateUser({phone: state.setPhone}), dispatch({type: 'changePhone'})))}>Enregistrer</button>
                            </div>
                                <button className={styles.modif} onClick={() => dispatch({type: 'changePhone'})}>Annuler</button>
                        </div>}

                    </div>}

                    <h4 onClick={() => dispatch({type: 'favoris'})}>FAVORIS
                        <button className={ state.toggleFavoris ? styles.rotateTrue : styles.rotateFalse }>&gt;</button>
                    </h4>

                    {state.toggleFavoris === true && state.fetch.favorites[0] !== undefined ?
                    <div className={styles.blocks}>
                        {state.fetch.favorites.map((value) => 
                            <Link to={`/offer/${value.id}`} key={value.id}>
                                <div className={styles.favoris}>
                                  <img
                                    className={styles.images}
                                    src={`${URL_API}static/images/${value.id}/image1.jpg`}
                                    alt=""
                                    />

                                  <div className={styles.content}>
                                    <div>{value.title}</div>
                                    <div>{value.city}</div>
                                    <div>{value.dates_start} - {value.dates_end}</div>
                                  </div>
                                </div>
                            </Link>
                        )}
                    </div>
                    :
                    state.toggleFavoris === true &&
                    <div className={styles.blocks}>
                        <p>Aucun favoris</p>
                    </div>
                    }

                    <h4 onClick={() => dispatch({type: 'bookings'})}>RESERVATIONS
                        <button className={ state.toggleBookings ? styles.rotateTrue : styles.rotateFalse }>&gt;</button>
                    </h4>
                    {state.toggleBookings === true && state.fetch.bookings[0] !== undefined ?
                    <div className={styles.blocks}>
                        {state.fetch.bookings.map((value) =>
                        <Link to={`/offer/${value.offer_id}`} key={value.id}>
                            <div className={styles.favoris}>
                              <img
                                className={styles.images}
                                src={`${URL_API}static/images/${value.offer_id}/image1.jpg`}
                                alt="offer images"
                                />

                              <div className={styles.content}>
                                <div>{value.title}</div>
                                <div>{value.city}</div>
                                <div>{value.dates_start} - {value.dates_end}</div>
                              </div>
                            </div>
                        </Link>)}
                    </div>
                    :
                    state.toggleBookings === true &&
                    <div className={styles.blocks}>
                        <p>Aucune reservation</p>
                    </div>}

                    <h4 onClick={() => dispatch({type: 'pastBookings'})}>RESERVATIONS PASSEES
                        <button className={ state.togglePastBookings ? styles.rotateTrue : styles.rotateFalse }>&gt;</button>
                    </h4>
                    {state.togglePastBookings === true && state.fetch.pastBookings[0] !== undefined ?
                    <div className={styles.blocks}>
                        {state.fetch.pastBookings.map((value) =>
                        <Link to={`/offer/${value.offer_id}`} key={value.id}>
                            <div className={styles.favoris}>
                              <img
                                className={styles.images}
                                src={`${URL_API}static/images/${value.offer_id}/image1.jpg`}
                                alt="offer images"
                                />

                              <div className={styles.content}>
                                <div>{value.title}</div>
                                <div>{value.city}</div>
                                <div>{value.dates_start} - {value.dates_end}</div>
                              </div>
                            </div>
                        </Link>)}
                    </div>
                    :
                    state.togglePastBookings === true &&
                    <div className={styles.blocks}>
                        <p>Aucune ancienne reservation</p>
                    </div>}

                </div>
            </div>
        </>
    )
}

export default UserProfile