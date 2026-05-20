import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [publicHolidays, setPublicHolidays] = useState([])


  // fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await axios.get('https://openholidaysapi.org/Countries?languageIsoCode=EN')
        setCountries(result.data)

      } catch (e) {
        console.error(e)
      }
    }

    fetchCountries()
  }, [])


  // fetch default country Netherland's public holidays on mount
  useEffect(() => {
    getPublicHolidays("NL")
  }, [])


  // fetch public holidays for a given country
  const getPublicHolidays = async (countryIso) => {
    try {
      const result = await axios.get(
        `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${countryIso}&languageIsoCode=en&validFrom=2026-01-01&validTo=2026-12-31`
      )
      setPublicHolidays(result.data)
    } catch (e){
      console.error(e)
    }
  }


  return (
    <div className="container">
      <label>Choose Country:
        { countries.length > 0 && (
          <select
            defaultValue={"NL"}
            onChange={(e) => getPublicHolidays(e.target.value)}
          >
          { countries.map((entry) => (
            <option key={entry.isoCode} value={entry.isoCode}>{entry.name[0].text}</option>
          ))}

        </select>
        )}

      </label>

      <h3>Public Holidays</h3>
        {publicHolidays.length && publicHolidays.map(entry => (
          <p key={entry.id}>{entry.name[0].text}</p>
        ))}
      </div>
    
  )
}

export default App
