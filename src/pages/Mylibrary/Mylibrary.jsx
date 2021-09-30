import { useState, useEffect, useCallback } from 'react';
import axios from '../../axios';

import Listitem from '../../components/Listitem/Listitem';
import Genrelist from '../../components/Genrelist/Genrelist';

const Mylibrary = () => {
  const [myShows, setMyShows] = useState([]);
  const [genres, setGenres] = useState([]);

  const getGenresList = (data) => {
    const setOfGenres = new Set();
    const uniqueGenres = [];
    data
      .filter((el) => el.genre !== undefined && el.genre.length > 0)
      .map((el) => el.genre)
      .forEach((genre) => genre.forEach((el) => setOfGenres.add(el)));

    setOfGenres.forEach((value) => uniqueGenres.push(value));

    return uniqueGenres;
  };

  const fetchData = useCallback(async () => {
    const response = await axios.get(
      `https://netflix-clone-11c3a-default-rtdb.firebaseio.com/my-movies.json`
    );

    const data = response.data;

    const loadedShows = [];

    for (const key in data) {
      loadedShows.push({
        id: data[key].id,
        image: data[key].image,
        name: data[key].name,
        genre: data[key].genre,
        rating: data[key].rating,
        oficialSite: data[key].oficialSite,
        summary: data[key].summary,
        status: data[key].status,
      });
    }

    setMyShows(loadedShows);
    setGenres(getGenresList(loadedShows));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="mylibrary-page">
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
        My Favoruite Shows
      </h1>
      {/* <ul className="genres-list">
        <Genrelist genres={genres} />
      </ul> */}
      <div className="item-grid">
        {myShows.map((item, index) => (
          <Listitem
            key={item.id + index}
            id={item.id}
            image={item.image ? item.image.medium : null}
            name={item.name}
            rating={item.rating.average ? item.rating.average : 'No rating'}
          />
        ))}
      </div>
    </div>
  );
};

export default Mylibrary;
