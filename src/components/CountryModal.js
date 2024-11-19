
import React from 'react';

function CountryModal({ country, closeModal }) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal}>Close</button>
        <h2>{country.name.official}</h2>
        <img src={country.flags.png} alt={`Flag of ${country.name.official}`} />
        <p><strong>Native Name:</strong> {Object.values(country.name.nativeName)[0]?.common}</p>
        <p><strong>Alternative Names:</strong> {country.altSpellings.join(', ')}</p>
        <p><strong>Country Code (2 character):</strong> {country.cca2}</p>
        <p><strong>Country Code (3 character):</strong> {country.cca3}</p>
        <p><strong>Calling Code:</strong> {country.idd.root}{country.idd.suffixes.join(', ')}</p>
      </div>
    </div>
  );
}

export default CountryModal;
