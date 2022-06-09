import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePopMenu from "../components/profilePopMenu_block";
import styles from '../styles/navbar.module.css';


function Nav() {
  const navigate = useNavigate();
  const [filter_pop, setFilter_pop] = useState(false);
  const [filter, setFilter] = useState(0);
  const [options, setOptions] = useState({city: "", min: 0, max: 10000});
  const [profileMenu_pop, setProfileMenu_pop] = useState(false);
  
  //CHECKBOX OPTIONS TO DISPLAY
  const OptionList = [
    { text: "Wifi", callback: () => setOptions({ ...options, wifi: !options.wifi }), option: options.wifi },
    { text: "Cuisine", callback: () => setOptions({ ...options, cuisine: !options.cuisine }), option: options.cuisine  },
    { text: "Lave linge", callback: () => setOptions({ ...options, lave: !options.lave }), option: options.lave  },
    { text: "Seche linge", callback: () => setOptions({ ...options, seche: !options.seche }), option: options.seche },
    { text: "Climatisation", callback: () => setOptions({ ...options, climatisation: !options.climatisation }), option: options.climatisation },
    { text: "Chauffage", callback: () => setOptions({ ...options, chauffage: !options.chauffage }), option: options.chauffage },
    { text: "Espace de travail", callback: () => setOptions({ ...options, workspace: !options.workspace }), option: options.workspace },
    { text: "Télévision", callback: () => setOptions({ ...options, television: !options.television }), option: options.television },
    { text: "Piscine", callback: () => setOptions({ ...options, piscine: !options.piscine }), option: options.piscine },
    { text: "Jacuzzi", callback: () => setOptions({ ...options, jacuzzi: !options.jacuzzi }), option: options.jacuzzi },
    { text: "Barbecue", callback: () => setOptions({ ...options, barbecue: !options.barbecue }), option: options.barbecue },
  ]

  useEffect(() => {
    let x = 0
    for (const key in options) {
      if (options[key] !== 0 && options[key] !== 10000 &&  options[key] !== "" &&  options[key] !== false  &&  options[key] !== undefined)
        x += 1
    }
    setFilter(x)
    // console.log("options", x);
  }, [options])

  //APPLY FILTERS
  const research = () => {
    let filters = ""
    for (const [key, value] of Object.entries(options)) {
      if (value !== "" ) {
          filters +=  key+"="+value+"&"
      }
    }
    filters = filters.slice(0, -1)
    let rand = Math.trunc(Math.random() * 100)
    navigate("/result/"+ rand+"?"+filters);
  }

  //PRICE FILTER
  function changePrices(choice, value) {
    if ((!isNaN(value - parseFloat(value))  || value === "") && value.length <= 5) {
      if (choice === "min") {
        setOptions({ ...options, min: value })
      }
      else if (choice === "max") {
        setOptions({ ...options, max: value })
      }
    }
  }
  
  //PRICE FILTER MIN/MAX CHECK
  function checkPrices() {
    if (options.min === "") {
      setOptions({...options, min: 0})
    }
    if (options.max === "") {
      setOptions({...options, max: 0})
    }

    let min = parseInt(options.min)
    let max = parseInt(options.max)
    if (min > max) {
      if (min <= 9995) {
        setOptions({...options, max: min + 5})
      }
      else
      setOptions({...options, min: max - 5})
    }
    if (max > 10000) {
      setOptions({...options, max: 10000})
    }
  }

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
          {/* SEARCH */}
            <div className={styles.search}>
              <div>
                <input 
                placeholder='Rechercher une ville'
                value={options.city}
                onChange={e => setOptions({ ...options, city: e.target.value })}></input>
              </div>
              <button onClick={research}></button>
            </div>

            {/* FILTER */}
            <div
              className={styles.filter}
              onClick={() => setFilter_pop((filter_pop) => !filter_pop)}
            >
              <img
                className={styles.icon}
                src={"/icon/filter.svg"}
                alt="filter logo"
              />
              <span>Filtres</span>
              {filter !== 0 && <div className={styles.filter_nb}>{filter}</div>}
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

      {/* FILTER POP-UP */}
      {filter_pop && (
        <div
          className={styles.filter_pop}
          onClick={() => setFilter_pop((filter_pop) => !filter_pop)}
        >
          <div
            className={styles.container}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.box}>
              <img
                onClick={() => setFilter_pop((filter_pop) => !filter_pop)}
                className={styles.icon}
                src={"/icon/close.svg"}
                alt="close logo"
              />
              <h3>Filtres</h3>
              <img
                className={styles.icon}
                src={"/icon/question-mark.svg"}
                alt="question-mark logo"
              />
            </div>

            <div className={styles.mainBox}>
              <div className={`${styles.block} ${styles.priceBlock}`}>
                <h3>Fourchette de prix</h3>
                {/* <div>..: GRAPH :..</div> */}
                <div className={styles.flex}>
                  <div className={styles.content}>
                    <div>prix minimum</div>
                    € <input
                      placeholder='0'
                      value={options.min}
                      onChange={e => changePrices("min", e.target.value)}
                      onBlur={() => checkPrices()}></input>
                  </div>
                  -
                  <div className={styles.content}>
                    <div>prix maximum</div>
                    € <input
                      placeholder='10000+'
                      value={options.max}
                      onChange={e => changePrices("max", e.target.value)}
                      onBlur={() => checkPrices()}
                      ></input>
                  </div>
                </div>
              </div>
              <div className={`${styles.block} ${styles.roomBlock}`}>
                <h3>Chambres et lits</h3>
                <div>Chambres</div>
                <ul>
                  <li onClick={() => setOptions({ ...options, chambres: undefined })} style={options.chambres === undefined ? {"backgroundColor": "black", "color": "white"} : {}}>Tout</li>
                  <li onClick={() => setOptions({ ...options, chambres: 1 })} style={options.chambres === 1 ? {"backgroundColor": "black", "color": "white"} : {}}>1</li>
                  <li onClick={() => setOptions({ ...options, chambres: 2 })} style={options.chambres === 2 ? {"backgroundColor": "black", "color": "white"} : {}}>2</li>
                  <li onClick={() => setOptions({ ...options, chambres: 3 })} style={options.chambres === 3 ? {"backgroundColor": "black", "color": "white"} : {}}>3</li>
                  <li onClick={() => setOptions({ ...options, chambres: 4 })} style={options.chambres === 4 ? {"backgroundColor": "black", "color": "white"} : {}}>4</li>
                  <li onClick={() => setOptions({ ...options, chambres: 5 })} style={options.chambres === 5 ? {"backgroundColor": "black", "color": "white"} : {}}>5</li>
                  <li onClick={() => setOptions({ ...options, chambres: 6 })} style={options.chambres === 6 ? {"backgroundColor": "black", "color": "white"} : {}}>6</li>
                  <li onClick={() => setOptions({ ...options, chambres: 7 })} style={options.chambres === 7 ? {"backgroundColor": "black", "color": "white"} : {}}>7+</li>
                </ul>
                <div>Lits</div>
                <ul>
                  <li onClick={() => setOptions({ ...options, lits: undefined })} style={options.lits === undefined ? {"backgroundColor": "black", "color": "white"} : {}}>Tout</li>
                  <li onClick={() => setOptions({ ...options, lits: 1 })} style={options.lits === 1 ? {"backgroundColor": "black", "color": "white"} : {}}>1</li>
                  <li onClick={() => setOptions({ ...options, lits: 2 })} style={options.lits === 2 ? {"backgroundColor": "black", "color": "white"} : {}}>2</li>
                  <li onClick={() => setOptions({ ...options, lits: 3 })} style={options.lits === 3 ? {"backgroundColor": "black", "color": "white"} : {}}>3</li>
                  <li onClick={() => setOptions({ ...options, lits: 4 })} style={options.lits === 4 ? {"backgroundColor": "black", "color": "white"} : {}}>4</li>
                  <li onClick={() => setOptions({ ...options, lits: 5 })} style={options.lits === 5 ? {"backgroundColor": "black", "color": "white"} : {}}>5</li>
                  <li onClick={() => setOptions({ ...options, lits: 6 })} style={options.lits === 6 ? {"backgroundColor": "black", "color": "white"} : {}}>6</li>
                  <li onClick={() => setOptions({ ...options, lits: 7 })} style={options.lits === 7 ? {"backgroundColor": "black", "color": "white"} : {}}>7+</li>
                </ul>
                {/* <div>Salles de bain</div>
                <ul>
                  <li onClick={() => setOptions({ ...options, bathroom: undefined })} style={options.bathroom === undefined ? {"backgroundColor": "black", "color": "white"} : {}}>Tout</li>
                  <li onClick={() => setOptions({ ...options, bathroom: 1 })} style={options.bathroom === 1 ? {"backgroundColor": "black", "color": "white"} : {}}>1</li>
                  <li onClick={() => setOptions({ ...options, bathroom: 2 })} style={options.bathroom === 2 ? {"backgroundColor": "black", "color": "white"} : {}}>2</li>
                  <li onClick={() => setOptions({ ...options, bathroom: 3 })} style={options.bathroom === 3 ? {"backgroundColor": "black", "color": "white"} : {}}>3</li>
                  <li onClick={() => setOptions({ ...options, bathroom: 4 })} style={options.bathroom === 4 ? {"backgroundColor": "black", "color": "white"} : {}}>4</li>
                  <li onClick={() => setOptions({ ...options, bathroom: 5 })} style={options.bathroom === 5 ? {"backgroundColor": "black", "color": "white"} : {}}>5</li>
                  <li onClick={() => setOptions({ ...options, bathroom: 6 })} style={options.bathroom === 6 ? {"backgroundColor": "black", "color": "white"} : {}}>6</li>
                  <li onClick={() => setOptions({ ...options, bathroom: 7 })} style={options.bathroom === 7 ? {"backgroundColor": "black", "color": "white"} : {}}>7+</li>
                </ul> */}
              </div>
              <div className={`${styles.block} ${styles.optionsBlock}`}>
                <h3>Équipements</h3>
                <div className={styles.sub}>Produits et services de base</div>
                <div className={styles.options}>

                  {OptionList.map((x, index) => (<label key={x.text}>
                    <input type="checkbox" onChange={x.callback} />
                    <span className={`${styles.checkbox} ${x.option ? styles.checkboxActive : ''}`}/>
                    {x.text}
                    </label>))}
                </div>
              </div>
            </div>

            <div className={styles.box}>
              <div onClick={() => setOptions({city: "", min: 0, max: 10000})}>Tout effacer</div>
              <button onClick={research}>Afficher résultats</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav