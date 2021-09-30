import axios from '../../axios';
import { useEffect, useState } from 'react';
import requests from '../../requests';
//COMPONENTS
import Searchbar from '../../components/Searchbar/Searchbar';
import Listitem from '../../components/Listitem/Listitem';

const Searchpage = () => {
  const [searchValue, setsearchValue] = useState('');
  const [shows, setShows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `${requests.fetchSearchQuery}${searchValue}`
      );
      return request;
    }
    fetchData().then((el) => setShows(el.data));
  }, [searchValue]);

  const saveInputValue = (value) => {
    setsearchValue(value);
  };

  return (
    <div className="searchpage">
      <h1
        className="search__header"
        style={{ textAlign: 'center', marginTop: '30px' }}
      >
        Hey, Let's search your favourite show
      </h1>
      <Searchbar onSaveInput={saveInputValue} />
      <div className="item-grid">
        {shows.map((item) => (
          <Listitem
            key={item.show.id}
            id={item.show.id}
            image={item.show.image ? item.show.image.medium : null}
            name={item.show.name}
            rating={
              item.show.rating.average ? item.show.rating.average : `No rating`
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Searchpage;
