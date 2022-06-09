import { Link } from 'react-router-dom';
import styles from '../styles/cgu.module.css';

export default function CGU(){
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
         
    <div className={styles.wrapper}>
       
        <h2 className={styles.conditions}>CONDITIONS GÉNÉRALES D'UTILISATION :</h2> 

        <div className={styles.cgu}>
            <ul>
                <br></br><br></br>
                <div class={styles.bloc}> 
                    <li> <h3>Description du site : </h3> 
                    </li>Oririnn est un site de réservation de châteaux
                    <br></br> <br></br>
                    <li> <h3>Droits et obligations de l’utilisateur :</h3>  
                    </li>Vous pouvez supprimer vos offres d'hébergements à tout moment. Vous ne pouvez pas modifier les offres des autres utilisateurs, seuls les admins en on la possibilité. Au niveau légal, vous êtes tenus de respecter les lois Françaises. Les propos sexistes, racistes ou tout autres contenus illégaux sont interdits. Votre mot de passe est stocké de manière cryptée, les administrateurs ne les connaissent pas. Il ne vous sera jamais demandé. Merci d’utiliser le site de la manière civil et de vous limiter à son principe de fonctionnement. En naviguant sur ce site, vous acceptez de ne pas essayer de nuire au bon fonctionnement du site. 
                    <br></br> <br></br>
                    <li> <h3>Droits et obligations de l’éditeur : </h3> 
                    </li> Nous sommes tenus d’assurer l’accès au site ainsi que le bon fonctionnement de celui-ci. Nous ne sommes en revanche pas responsables d’une quelconque utilisation frauduleuse de ce site. 
                    <br></br> <br></br>
                    <li> <h3>Les conditions d’utilisation du site : </h3>
                    </li>Concernant vos offres d'hébergement : au niveau légal, vous êtes responsable de tout ce que vous postez sur ce site. Nous ne saurions être tenu responsable du contenu de vos offres. En publiant sur ce site, vous vous devez de respecter la loi Française. Vous devez aussi respecter les droits de propriété intellectuelle.
                    <br></br> <br></br>
                    <li><h3>3.1 Annulation, problèmes de séjour, remboursement et modifications de réservation : </h3> 
                    </li> En règle générale, si vous annulez une réservation, le montant qui vous est remboursé est déterminé par les conditions d'annulation applicables à cette réservation. Mais, dans certaines situations, d'autres conditions sont prioritaires et déterminent le montant qui vous est remboursé. Si un événement indépendant de votre volonté vous oblige à annuler une réservation, vous êtes susceptible d'être éligible à un remboursement partiel ou intégral en vertu de notre Politique relative aux cas de force majeure. Si l'hôte annule ou si vous rencontrez un problème lié à un voyage (tel que défini dans notre Politique de remboursement des voyageurs), vous pouvez être éligible à une aide pour une nouvelle réservation, ou à un remboursement partiel ou intégral en vertu de la Politique de remboursement des voyageurs. Différentes politiques s'appliquent à certaines catégories d'Annonces ; par exemple, les réservations d'Expériences sont régies par la Politique de remboursement des voyageurs d'expériences. Voir les conditions juridiques supplémentaires ou chaque politique pour plus de détails sur ce qui est couvert et sur le remboursement s'appliquant dans chaque situation. Vous pouvez faire appel d'une décision d'Oririnn en contactant notre assistance utilisateurs.
                    <br></br> <br></br>
                    <li> <h3>Cookie et données personnelles : </h3>  
                    </li>
                    Oririnn respecte la vie privée de ses utilisateurs et s'engage à ce que toutes les informations qu'il recueille permettant de les identifier soient considérées comme des informations confidentielles. Conformément aux dispositions de la loi du 6 janvier 1978 relative aux fichiers, à l'informatique et aux libertés, les lecteurs et utilisateurs des sites de Oririnn disposent d'un droit d'accès, de rectification et d'opposition aux données personnelles les concernant. 
                    Lors de la consultation des sites édités par le Oririnn, des informations sont susceptibles d'être enregistrées dans des fichiers "Cookies" installés dans votre ordinateur, tablette ou téléphone mobile.
                </div>
            </ul>
        </div> 
    </div>
        
        </>
        
    );
}
