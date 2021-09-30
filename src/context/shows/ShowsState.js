import { useReducer } from 'react';
import axios from '../../axios';
import requests from '../../requests';
import ShowContext from './showsContext';
import ShowReducer from './showsReducer';
import {
  SEARCH_SHOWS,
  SET_SINGLE_SHOW,
  SET_LOADING,
  CLEAR_SINGLE_SHOW,
} from '../types';

const ShowsState = (props) => {
  const initialState = {
    shows: [],
    singleShow: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(ShowReducer, initialState);

  const searchShows = async (searchTerm) => {
    dispatch({ type: SET_LOADING });

    const { data } = await axios.get(
      `${requests.fetchSearchQuery}${searchTerm}`
    );

    // console.log(data);

    dispatch({
      type: SEARCH_SHOWS,
      payload: data,
    });
  };

  const getSingleShow = async (id) => {
    dispatch({
      type: SET_LOADING,
    });

    const { data } = await axios.get(`${requests.fetchShowById}${id}`);

    dispatch({
      type: SET_SINGLE_SHOW,
      payload: data,
    });
  };

  const clearSingleShow = () => {
    dispatch({
      type: CLEAR_SINGLE_SHOW,
    });
  };

  return (
    <ShowContext.Provider
      value={{
        shows: state.shows,
        singleShow: state.singleShow,
        loading: state.loading,
        searchShows,
        getSingleShow,
        clearSingleShow,
      }}
    >
      {props.children}
    </ShowContext.Provider>
  );
};

export default ShowsState;
