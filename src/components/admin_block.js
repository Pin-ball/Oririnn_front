import { Link } from 'react-router-dom';
import ProfilePopMenu from "../components/profilePopMenu_block";
import styles from '../styles/adminnav.module.css';
import { useState } from 'react'

function AdminNav() {
    const [profileMenu_pop, setProfileMenu_pop] = useState(false);

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <Link to={"/"}>
                        <img
                            className={styles.logo}
                            src={"/icon/castle.svg"}
                            alt="oririnn logo"
                        />
                    </Link>

                    <div className={styles.research}>
                        <div>
                        <Link to="/all"><button className={styles.admin_btn}>Gérer les annonces en attente de publication</button></Link>

                        </div>
                    </div>

                    <div className={styles.research}>
                        <div >
                        <Link to="/admin"><button className={styles.admin_btn}>Gérer les utilisateurs</button></Link>
                        </div>
                    </div>

                    {/* USER */}
                    <div
                        className={styles.user}
                        onClick={() =>
                            setProfileMenu_pop((profileMenu_pop) => !profileMenu_pop)
                        }
                    >
                        <img
                            className={styles.icon}
                            src={"/icon/menu.svg"}
                            alt="menu logo"
                        />
                        <img
                            className={styles.logo}
                            src={"/icon/default_user.png"}
                            alt="user logo"
                        />
                    </div>
                </div>
                {profileMenu_pop && <ProfilePopMenu></ProfilePopMenu>}
            </nav>

        </>
    );
}

export default AdminNav