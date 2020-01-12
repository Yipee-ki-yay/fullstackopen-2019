import React, {useState, useEffect} from 'react';
import axios from 'axios'

import Country from './components/Country'
import CountriesList from './components/CountriesList'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); 
  }

  const handleShowCountry = (countryStr) => {
    setSearchQuery(countryStr); 
  }

  let filteredCountries = 
    countries.filter(c => c.name.toUpperCase().includes(searchQuery.toUpperCase()));

  console.log('filteredCountries', filteredCountries)

  return (
    <div>
      <div>
        find countries
        <input value={searchQuery} onChange={handleSearch} type="text"/>
      </div>
      <div>
        {
          filteredCountries.length === 1 ?
            <Country country={filteredCountries[0]} /> :
            filteredCountries.length <= 10 ?
              <CountriesList countries={filteredCountries} handleShowCountry={handleShowCountry} /> :
              <div>Too many matches specify another filter</div>
        }
      </div>
    </div>
  );
}

export default App;
