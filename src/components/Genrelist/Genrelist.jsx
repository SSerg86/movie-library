import './genrelist.css';
import { useState } from 'react';

const Genrelist = ({ onChange, genres }) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      {/* <li className="genre__radio-btn">
        <input
          type="checkbox"
          value="all"
          id="all"
          onChange={(e) => onChange(e.target.value)}
          onClick={() => setChecked(!checked)}
          defaultChecked={checked}
        />
        <label htmlFor="all">All</label>
      </li> */}
      {genres.map((genre) => (
        <li className="genre__radio-btn" key={genre}>
          <input
            type="checkbox"
            value={genre}
            id={genre}
            onChange={(e) => onChange(e.target.value)}
            onClick={() => setChecked(!checked)}
            defaultChecked={checked}
          />
          <label key={genre} htmlFor={genre}>
            {genre}
          </label>
        </li>
      ))}
    </>
  );
};

export default Genrelist;
