import { Link } from 'react-router-dom';
import styles from '../styles/fonctionnement.module.css'

export default function FonctionnementSite () {
    return (
        <>
         <nav>
        <div className={styles.emplacementLogo}>
            <Link to={"/"}>
                <img
                    className={styles.logo}
                    src={"/icon/castle.svg"}
                    alt="oririnn logo" 
                />
            </Link>
        </div>
        </nav>
            <body>
                <div className={styles.wrapper}>
                <div className={styles.titre}>Fonctionnement du site</div>  <br></br> <br></br>
                    <div className={styles.titre}>QU'EST-CE QUE ORIRINN?</div> <br></br>             
                    La Plateforme Oririnn est une place de marché en ligne qui permet aux utilisateurs enregistrés <b>(les « Membres »)</b> et à certains tiers qui proposent 
                    des <b>services</b> (les Membres et tiers qui proposent des services sont des « Hôtes » et les services qu’ils proposent sont des « Services d’Hôte »)
                     de publier ces Services d’Hôte sur la Plateforme Oririnn (les « Annonces ») et de communiquer et traiter directement avec des Membres qui souhaitent réserver ces Services d’Hôte (les Membres qui utilisent des Services d’Hôte sont des « Voyageurs »). 
                     Les Services d’Hôte sont des locations de chateaux pour des vacances ou autre usage (les « Hébergements »), 
                        Vous devez créer un compte pour pouvoir publier une Annonce.
                

                        <br></br> <br></br>
                        <div className={styles.titre}>QUI PEUT DEVENIR HÔTE SUR ORIRINN (LOGEMENTS) ?</div> <br></br>  
                        A condition que votre bien rentre dans les critères de notre site, vous pouvez publier une annonce.

                        Vous pouvez publier une annonce pour votre logement dans presque tous les pays du monde. Bien que nous souhaiterions faire d'Oririnn un lieu d'échange mondial, nous sommes soumis aux lois internationales qui limitent l'utilisation de notre site aux résidents de certains pays. Par conséquent, nos services ne sont donc pas accessibles en Crimée, en Iran, en Syrie et en Corée du Nord.

                       <br></br> Pour proposer des séjours agréables et adaptés aux voyageurs, nous demandons à tous les hôtes de respecter 4 critères de base :

                        <ul>
                            <li> <b>Faire preuve de réactivité :</b> maintenez un taux de réponse élevé en répondant aux demandes d'information et de réservation dans les 24 heures.</li>
                        <li><b>Accepter les demandes de réservation :</b> montrez aux voyageurs qu'ils sont les bienvenus en acceptant les demandes de réservation lorsque votre logement est disponible.</li>
                        <li><b>Éviter les annulations :</b> les annulations ne sont pas anodines et nous demandons à tous les hôtes d'éviter d'annuler les réservations des voyageurs pour ne pas compromettre leurs projets de voyage.</li>
                        <li><b>Maintenir une bonne évaluation globale :</b> les voyageurs aiment pouvoir s'attendre à un niveau de qualité constant, quelle que soit leur destination.
                        Par ailleurs nous encourageons fortement les hôtes à fournir les équipements essentiels : papier toilette, savon, linge de maison, draps, et au moins une serviette et un oreiller par voyageur.</li>
                            </ul>

                        <br></br>
                        <div className={styles.titre}>EST-CE QU'ORIRINN PEUT DÉSACTIVER MON ANNONCE OU MON COMPTE ?</div> <br></br> 
                        Oririnn peut limiter, suspendre ou désactiver votre compte, conformément à ses Conditions générales.

                        Oririnn peut supprimer ou désactiver l’accès à tout Contenu des Membres qui est contraire au droit applicable, aux présentes Conditions ou aux Politiques ou Normes en vigueur d’Oririnn, ou potentiellement nuisibles ou inacceptables pour Oririnn, ses Membres, des tiers ou des biens.

                        Votre compte peut être désactivé lors d'un examen des comptes Oririnn. Ces examens s'inscrivent dans le cadre d'efforts visant à faire respecter les Valeurs de la communauté Oririnn (tranquillité d’esprit, sécurité, respect, authenticité, fiabilité), ses Conditions générales, les lois et règlements applicables et à instaurer un climat de confiance mutuelle. Votre compte peut également être désactivé ou suspendu à la suite d'un problème signalé à notre équipe d'assistance utilisateurs. La sécurité est prise très au sérieux chez Oririnn, et si une violation des Valeurs de la communauté est signalée, nous mènerons une enquête sur ce signalement et prendrons les mesures appropriées.

                        Votre compte peut être provisoirement désactivé en raison de votre taux de réponse ou de votre taux d'acceptation. Pour réactiver votre compte dans ce cas, suivez les étapes indiquées dans l'e-mail que vous avez reçu.

                        Si votre compte est désactivé ou suspendu, toute réservation future, en attente de réponse ou acceptée, que ce soit en tant qu'hôte ou voyageur, peut être annulée.

                        
                    </div>
            </body>
        
        </>
    );
}