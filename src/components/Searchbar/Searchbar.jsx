import { useState, useContext } from 'react';
import Alert from '../Alert/Alert';
import './searchbar.css';
import AlertsContext from '../../context/alerts/alertsContext';

const Searchbar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { alert, setAlert } = useContext(AlertsContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm === '') {
      setAlert(' Please enter something', 'danger');
    } else {
      props.onSaveInput(searchTerm);
    }

    setSearchTerm('');
  };

  const searchChangeHandler = (e) => setSearchTerm(e.target.value);

  return (
    <div className="searchbar">
      {alert ? <Alert message={alert.message} type={alert.type} /> : null}
      <form className="searchbar__form" onSubmit={submitHandler}>
        <div className="form__controls">
          <input
            className="form__input"
            type="text"
            placeholder="Search For TV Show"
            value={searchTerm}
            onChange={searchChangeHandler}
          />
          <button type="submit" className="btn btn__form">
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
