import './singleshow.css';
import variables from '../../Var/variables';
import { useState } from 'react';

const Singleshow = ({
  image,
  name,
  genres,
  rating,
  oficialSite,
  summary,
  status,
  id,
}) => {
  const removeTags = (text) => {
    if (text === null || text === '') {
      return false;
    } else {
      text = text.toString();
    }
    return text.replace(/(<([^>]+)>)/gi, '');
  };

  const [heartState, setHeartState] = useState('false');

  async function addMovieHandler() {
    const movie = {
      id: id,
      image: image,
      name: name,
      genre: genres,
      rating: rating,
      oficialSite: oficialSite,
      summary: summary,
      status: status,
    };

    const response = await fetch(
      `https://netflix-clone-11c3a-default-rtdb.firebaseio.com/my-movies.json`,
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    console.log(data);
    setHeartState(!heartState);
    alert('Movie was added succefully');
  }

  return (
    <>
      <div className="singlefilm">
        <div className="singlefilm__general">
          <aside className="general__aside">
            <img
              src={image ? image.medium : variables.NOT_FOUND_IMG}
              alt={name}
            />

            <div className="aside__button" onClick={addMovieHandler}>
              {!heartState ? (
                <span className="follow-toggle ">
                  <i className="fas fa-heart "></i>
                  <span className="hide-for-small-only"> Follow</span>
                </span>
              ) : (
                <span className="follow-toggle ">
                  <i className="fas fa-heart heart "></i>
                  <span className="hide-for-small-only"> Following</span>
                </span>
              )}
            </div>
          </aside>
          <article className="general__article">
            <h1 className="general__header">{name}</h1>
            {genres &&
              genres.map((genre) => (
                <span key={genre} className="general__genre">
                  {genre}
                </span>
              ))}
            <p>
              <strong>Status:</strong> {status && status}
            </p>
            <p>
              <strong>Rating:</strong> {rating ? rating.average : 'No rating'}
            </p>
            <p>
              <strong>Offical Site:</strong>{' '}
              {oficialSite ? (
                <a href={oficialSite} target="_blank" rel="noreferrer">
                  {oficialSite}
                </a>
              ) : (
                'No offical site'
              )}
            </p>
            <p className="general__text">{summary && removeTags(summary)}</p>
          </article>
        </div>
      </div>
    </>
  );
};

export default Singleshow;
