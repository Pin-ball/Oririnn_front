// ORIGINAL CSS 5NODE MODULES : import 'react-day-picker/dist/style.css'
import { DayPicker, } from "react-day-picker";
import { format } from "date-fns";
import fr from 'date-fns/locale/fr';
import "../styles/calendar.css";
import { useEffect, useState } from "react";


export default function App(prop) {
  
  const [dates, setDates] = useState();
  const [range, setRange] = useState();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  
  //CHECK DATE SELECTION
  const isGoodDate = (value) => {
    const disableDates = dates?.disableDates
    if (value === undefined) return true;
    if (!value?.from || !value?.to) return true;
    return !disableDates.some((date) => {
      return value.from < date && value.to > date;
    });
  };

  // SET USEFUL DATES
  useEffect(() => {
    let income_start = new Date(prop.offer.dates_start)
    let start = new Date()
    if (income_start > start) 
    { start = income_start }
  
    let new_dates = prop.offer.bookings.map(e => [e.dates_start.slice(-4)+","+e.dates_start.slice(-7, 5)+","+e.dates_start.slice(0, 2), e.dates_end.slice(-4)+","+e.dates_end.slice(-7, 5)+","+e.dates_end.slice(0, 2)])
    let new_range = new_dates.map(e => {return getRange(e[0], e[1]) })
    let new_flat_range = new_range.flat([1]);

    let end = new Date(prop.offer.dates_end)

    setDates({ ...dates, date_start: start, date_end: end, disableDates: new_flat_range })
  }, [])

  const getRange = (start, end) => {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr
  }

  //UPDATE DATE.FROM & GAP
  useEffect(() => {
    if (range?.from !== undefined) {
      prop.setOffer(prev => ({...prev, from: format(range.from, "dd/MM/yyyy")}))
      
      if (range?.to !== undefined) {
      var difference = range.to.getTime() - range.from.getTime()
      var gap = difference / (1000 * 3600 * 24)
      prop.setOffer(prev => ({...prev, gap}))
      }
    }
    else
    prop.setOffer(prev => ({...prev, from: undefined, gap: 0}))
  }, [range?.from])

  
  //UPDATE DATE.TO & GAP
  useEffect(() => {
    if (range?.to !== undefined) {
      prop.setOffer(prev => ({...prev, to: format(range.to, "dd/MM/yyyy")}))
      
      var difference = range.to.getTime() - range.from.getTime()
      var gap = difference / (1000 * 3600 * 24)
      prop.setOffer(prev => ({...prev, gap}))
    }
    else
    prop.setOffer(prev => ({...prev, to: undefined, gap: 0}))
  }, [range?.to])
  

  // FOOTER CONTENT
  let footer = <p>Choisissez vos dates</p>
  if (range?.from) {
    if (!range.to) {
      footer = <p>{range.from.toLocaleDateString('fr-FR', options)}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {range.from.toLocaleDateString('fr-FR', options)} <span> – </span> {range.to.toLocaleDateString('fr-FR', options)}
        </p>
      );
    }
  }

  return (
    <div className="rdp_DayPicker">
      <DayPicker
        locale={fr}
        mode="range"

        fromDate={dates?.date_start}
        toDate={dates?.date_end}
        defaultMonth={dates?.date_start}
        
        selected={range}
        disabled={dates?.disableDates}
        footer={footer}
        onSelect={(value) => {
          if (isGoodDate(value)) {
            setRange(value);
          }
        }}
      />
      <div className="rdp_options">
        <button className="rdp_btn rdp_erase" onClick={() => setRange()}>Effacer dates</button>
        <button className="rdp_btn rdp_close" onClick={() => prop.setOffer(prev => ({...prev, visible_cal: false}))}>Fermer</button>
      </div>
    </div>
  );
}
