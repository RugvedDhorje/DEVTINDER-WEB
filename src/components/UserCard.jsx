import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  const { photoUrl, firstName, lastName, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title capitalize">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">ignore</button>
          <button className="btn btn-secondary ">interested</button>
        </div>
      </div>
    </div>
  );
};
UserCard.propTypes = {
  user: PropTypes.shape({
    photoUrl: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
