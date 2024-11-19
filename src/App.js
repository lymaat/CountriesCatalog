
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CountryCard from './components/CountryCard';
import CountryModal from './components/CountryModal';
import Header from './components/Header';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState(null);

  const countriesPerPage = 25;

  useEffect(() => {
 
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);


  useEffect(() => {
    if (searchQuery) {
      setFilteredCountries(countries.filter(country =>
        country.name.official.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredCountries(countries);
    }
  }, [searchQuery, countries]);


  const sortCountries = (order) => {
    const sortedCountries = [...filteredCountries].sort((a, b) => {
      if (order === 'asc') {
        return a.name.official.localeCompare(b.name.official);
      } else {
        return b.name.official.localeCompare(a.name.official);
      }
    });
    setFilteredCountries(sortedCountries);
  };


  useEffect(() => {
    sortCountries(sortOrder);
  }, [sortOrder]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const openModal = (country) => {
    setModalData(country);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery} setSortOrder={setSortOrder} />

      <div className="country-list">
        {currentCountries.map(country => (
          <CountryCard key={country.cca3} country={country} openModal={openModal} />
        ))}
      </div>


      <div className="pagination">
        {[...Array(Math.ceil(filteredCountries.length / countriesPerPage))].map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

   
      {modalData && <CountryModal country={modalData} closeModal={closeModal} />}
    </div>
  );
}

export default App;
