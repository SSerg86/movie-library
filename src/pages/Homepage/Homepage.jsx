import { useEffect, useState, useCallback } from 'react';
import axios from '../../axios';
import variables from '../../Var/variables';

//COMPONENTS
import Listitem from '../../components/Listitem/Listitem';
import Genrelist from '../../components/Genrelist/Genrelist';

const Homepage = () => {
  const [todaysShows, setTodaysShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const getGenresList = (data) => {
    const setOfGenres = new Set();
    const uniqueGenres = [];
    data
      .filter((el) => el.show.genres.length > 0)
      .map((el) => el.show.genres)
      .forEach((genre) => genre.forEach((el) => setOfGenres.add(el)));

    setOfGenres.forEach((value) => uniqueGenres.push(value));

    return uniqueGenres;
  };

  const fetchData = useCallback(async () => {
    const request = await axios.get(
      `/schedule?country=GB&date=${variables.CURRENT_DAY}`
    );

    setTodaysShows(request.data);
    setGenres(getGenresList(request.data));
  }, []);

  const filteredGenre = (isChecked, genre) => {
    if (isChecked) {
      setSelectedGenre(genre);
    } else {
      setSelectedGenre('');
    }
  };

  // if(loading) {
  //   return <Loader />
  // }

  const getShowsToRender = () => {
    return selectedGenre
      ? todaysShows.filter((el) => el.show.genres.includes(selectedGenre))
      : todaysShows;
  };

  const showsToRender = getShowsToRender();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="homepage">
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        Todays Shows in the UK
      </h1>
      <ul className="genres-list">
        <Genrelist
          selectedGenre={selectedGenre}
          value={selectedGenre}
          onChange={filteredGenre}
          genres={genres}
        />
      </ul>
      <div className="item-grid">
        {showsToRender.map((item) => (
          <Listitem
            key={item.id}
            id={item.show.id}
            image={item.show.image ? item.show.image.medium : null}
            name={item.show.name}
            time={item.show.schedule.time}
            rating={
              item.show.rating.average ? item.show.rating.average : `No rating`
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
