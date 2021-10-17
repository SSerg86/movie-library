import './genrelist.css';

const Genrelist = ({ onChange, selectedGenre, genres }) => {
  return (
    <>
      {genres.map((genre) => (
        <li className="genre__radio-btn" key={genre}>
          <input
            type="checkbox"
            value={genre}
            id={genre}
            onChange={(e) => {
              onChange(e.target.checked, e.target.value);
            }}
            checked={selectedGenre === genre}
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
