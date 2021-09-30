import { Link } from 'react-router-dom';
import './listitem.css';
import variables from '../../Var/variables';

const Listitem = ({ image, name, rating, id, time }) => {
  return (
    <Link to={`/show/${id}`} className="listitem">
      <img src={image ? image : variables.NOT_FOUND_IMG} alt={name} />
      <div className="listitem__info">
        <h4 className="info__name">{name}</h4>
        <p style={time ? { textDecoration: 'underline' } : { display: 'none' }}>
          Starts at: {time}
        </p>
        <p className="info__rating">Rating: {rating}</p>
      </div>
    </Link>
  );
};

export default Listitem;
