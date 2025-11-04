import {useState, useEffect} from 'react'; 
import axios from 'axios'; 
import Weather from './Weather';

const App = () => {
  const [countries, setCountries] = useState([]); 
  const [filter, setFilter] = useState(''); 

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all') 
      .then(response => setCountries(response.data))
      .catch((error) => console.error('Failed to fetch countries:', error));
  }, []); 

  const handlefilterChange = (e) => setFilter (e.target.value); 

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase()) 
  );

  return (
    <div>
      <h1>Country Search</h1>
      <div> 
        Find countries:{' '}
        <input value={filter} onChange={handlefilterChange} /> 
      </div> 

      {/*Conditional rendering*/} 
      {filter && ( 
        <div> 
          {filteredCountries.length > 10 ? ( 
            <p>Too many matches, specify another filter</p> 
          ) : filteredCountries.length === 1 ? ( 
            <CountryDetails country={filteredCountries[0]} /> 
          ) : ( 
            <ul> 
              {filteredCountries.map((c) => ( 
                <li key={c.cca3}>{c.name.common} <button onClick={() => setFilter(c.name.common)}>show</button></li> 
              ))} 
            </ul> 
          )} 
        </div> 
      )} 
    </div>
  ); 
}; 

const CountryDetails = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Area: {country.area} km²</p> 
      <h3>Languages:</h3> 
      <ul> 
        {country.languages
         ? Object.values(country.languages).map((lang) => <li key={lang}>{lang}</li>) 
         : <li>N/A</li>} 
         </ul> 
         {/*Display flag if exists*/}
         {country.flags && 
         <img
          src={country.flags.png}
           alt={`Flag of ${country.name.common}}`}
           width={150} />}  

           {/*Weather component goes here*/} 
           {country.capital && <Weather capital={country.capital[0]} />} 
         </div> 
        ); 
      }; 
      export default App; 