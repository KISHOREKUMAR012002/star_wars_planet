import React, { useState, useEffect } from 'react';
import './styles.css';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchResidents = async () => {
      const residentData = await Promise.all(
        planet.residents.map((residentUrl) =>
          fetch(residentUrl).then((res) => res.json())
        )
      );
      setResidents(residentData);
    };

    fetchResidents();
  }, [planet.residents]);

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>

      <h3>Residents:</h3>
      <ul style={{ display: expanded ? 'block' : 'none' }}>
        {residents.map((resident, index) => (
          <li key={index}>
            <p>Name: {resident.name}</p>
            <p>Height: {resident.height}</p>
            <p>Mass: {resident.mass}</p>
            <p>Gender: {resident.gender}</p>
          </li>
        ))}
      </ul>

      <button onClick={toggleExpanded} className="expand-button">
        {expanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

const PlanetsDirectory = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets/?format=json');
      const data = await response.json();
      setPlanets(data.results);
    };

    fetchPlanets();
  }, []);

  return (
    <div>
      <h1 className='heading1'>Planets Directory</h1>
      <div className="planets-directory">
        {planets.map((planet, index) => (
          <PlanetCard key={index} planet={planet} />
        ))}
      </div>
    </div>
  );
};

export default PlanetsDirectory;
