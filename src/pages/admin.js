import { useState, useEffect } from "react";
import styles from '../styles/admin.module.css'
import AdminNav from '../components/admin_block'
import {URL_API} from "../config"

export default function Admin() {

    const [users, setUsers] = useState([])
    const [count, setCount] = useState(0)
    const [create, setCreate] = useState({ lastname: '', firstname: '', age: "", email: '', password: "", admin: 0 })
    const [update, setUpdate] = useState({ lastname: "", firstname: "", age: "0", phone: "", admin: "" })
    const [modify, setModify] = useState(0)
    const token = localStorage.getItem('Token')

    //CHARGER TOUS LES USERS
    useEffect(() => {
        getUsers()
    }, [count])

    function increment() {
        setCount(prevCount => prevCount + 1)
    }

    async function getUsers() {
        var myHeaders = new Headers()
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch(URL_API+"user", requestOptions)
        let data = await result.json();
        setUsers(data)
    }
    //DELETE USER
    async function Supprimer(id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var params = JSON.stringify({
            "id": id
        });
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: params,
            authorization: 'Bearer ' + token,
            redirect: 'follow'
        };
        await fetch(URL_API+"user/" + id, requestOptions)
        increment()
        alert("L'utilisateur a été supprimé")
    }

    //CREATE USER
    async function createUser() {
        if (create.firstname === "" || create.lastname === "" || create.age === "" || create.email === "" || create.password === "" || create.admin === "") {
            alert("Un des champs est manquant. Veuillez réessayer")
        }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);

            var raw = JSON.stringify({
                "firstname": create.firstname,
                "lastname": create.lastname,
                "age": parseInt(create.age),
                "email": create.email,
                "password": create.password,
                "admin": create.admin
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                authorization: 'Bearer ' + token,
                redirect: 'follow'
            };
            let resp = await fetch(URL_API+"user", requestOptions)
            if (resp.status === 400) {
                alert("Cette adresse e-mail est déjà utilisée")
            }
            else {
                alert('L\'utilisateur a été ajouté')
            }
        }
        increment()
    }

    //UPDATE USER
    async function Update(id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
        var property = JSON.stringify({
            "firstname": update.firstname,
            "lastname": update.lastname,
            "age": parseInt(update.age),
            "phone": update.phone,
            "admin": update.admin
        });
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: property,
            redirect: 'follow'
        };
        await fetch(URL_API+"user/" + id, requestOptions)
        increment()
        alert("Utilisateur mis à jour avec succès")
    }

    return (
        <div>
            <AdminNav></AdminNav>
            <div className={styles.wrapper}>
                <h3>Créer un utilisateur :</h3>
                <div className={styles.container}>
                    <table className={styles.create}>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Mot de passe</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" onInput={e => setCreate({ ...create, lastname: e.target.value })}></input></td>
                                <td><input type="text" onInput={e => setCreate({ ...create, firstname: e.target.value })}></input></td>
                                <td><input type="text" onInput={e => setCreate({ ...create, age: e.target.value })}></input></td>
                                <td><input type="text" onInput={e => setCreate({ ...create, email: e.target.value })}></input></td>
                                <td><input type="password" onInput={e => setCreate({ ...create, password: e.target.value })}></input></td>
                                <td className={styles.admin}>
                                    <ul className={styles.list}>
                                        <li onClick={() => setCreate({ ...create, admin: 0 })} style={create.admin === 0 ? {"border": "solid 1px black"} : null}>Non</li>
                                        <li onClick={() => setCreate({ ...create, admin: 1 })} style={create.admin === 1 ? {"border": "solid 1px black"} : null}>Oui</li>
                                    </ul></td>
                                <td><button className={styles.button} onClick={createUser}>Créer</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3>Consulter / Modifier</h3>
                <div className={styles.container}>
                    <table className={styles.see}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Age</th>
                                <th>Téléphone</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Iinscription</th>
                                <th>Gestion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((value, key) =>
                                <tr className={styles.test} key={key}>
                                    <td><p>{value.id}</p></td>
                                    <td>{modify === value.id ? <div><input value={update.lastname} onInput={e => setUpdate({ ...update, lastname: e.target.value })}></input></div> : <div><p>{value.lastname}</p></div>}</td>
                                    <td>{modify === value.id ? <div><input value={update.firstname} onInput={e => setUpdate({ ...update, firstname: e.target.value })}></input></div> : <div><p>{value.firstname}</p></div>}</td>
                                    <td>{modify === value.id ? <div><input value={update.age} onInput={e => setUpdate({ ...update, age: e.target.value })}></input></div> : <div><p>{value.age}</p></div>}</td>
                                    <td>{modify === value.id ? <div><input value={update.phone} onInput={e => setUpdate({ ...update, phone: e.target.value })}></input></div> : <div><p>{value.phone}</p></div>}</td>
                                    <td><p>{value.email}</p></td>
                                    <td className={styles.admin}>
                                        {modify === value.id ?
                                            <ul className={styles.list}>
                                                <li onClick={() => setUpdate({ ...update, admin: 0 })} style={update.admin === "0" ? {"border": "solid 1px black"} : null}>Non</li>
                                                <li onClick={() => setUpdate({ ...update, admin: 1 })} style={update.admin === "1" ? {"border": "solid 1px black"} : null}>Oui</li>
                                            </ul> : <div><p>{value.admin}</p></div>}</td>
                                    <td><p>{value.creation_date}</p></td>
                                    <td>
                                        {modify === value.id ? <button className={styles.button} onClick={() => {Update(value.id); setModify(null)}}>✓</button> : <button className={styles.button} onClick={() => { setModify(value.id); setUpdate(value) }}>Edit</button>}
                                        {modify === value.id ? <button className={styles.button} onClick={() => setModify(null)}>X</button> : <button className={styles.button} onClick={() => Supprimer(value.id)}>Supr</button>}
                                        
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}