import { useEffect, useContext } from 'react';
import Singleshow from '../../components/Singleshow/Singleshow';
//CONTEXT
import ShowsContext from '../../context/shows/showsContext';

const Singlefilmpage = ({ match }) => {
  const { getSingleShow, singleShow, loading } = useContext(ShowsContext);

  useEffect(() => {
    getSingleShow(match.params.id);

    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <Singleshow
          image={singleShow.image}
          name={singleShow.name}
          genres={singleShow.genres}
          rating={singleShow.rating}
          oficialSite={singleShow.officalSite}
          summary={singleShow.summary}
          status={singleShow.status}
          id={singleShow.id}
        />
      )}
    </>
  );
};

export default Singlefilmpage;
