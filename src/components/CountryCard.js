
import React from 'react';

function CountryCard({ country, openModal }) {
  return (
    <div className="country-card" onClick={() => openModal(country)}>
      <img src={country.flags.png} alt={`Flag of ${country.name.official}`} />
      <h2>{country.name.official}</h2>
      <p>{country.cca2} / {country.cca3}</p>
    </div>
  );
}

export default CountryCard;
