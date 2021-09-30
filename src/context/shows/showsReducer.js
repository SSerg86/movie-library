import {
  SEARCH_SHOWS,
  SET_SINGLE_SHOW,
  SET_LOADING,
  CLEAR_SINGLE_SHOW,
} from '../types';

const showReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_SHOWS:
      return {
        ...state,
        shows: action.payload,
        loading: false,
      };
    case SET_SINGLE_SHOW:
      return {
        ...state,
        singleShow: action.payload,
        loading: false,
      };
    case CLEAR_SINGLE_SHOW:
      return {
        ...state,
        singleShow: {},
      };

    default:
      return state;
  }
};

export default showReducer;
