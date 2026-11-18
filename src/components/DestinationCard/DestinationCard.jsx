
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import "./DestinationCard.css";

function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <div className="destination-card-image">
        <img src={destination.image} alt={destination.name} />
      </div>

      <div className="destination-card-content">
        <span>
          <MapPin size={15} />
          {destination.country}
        </span>

        <h3>{destination.name}</h3>

        <p>{destination.description}</p>

        <Link
          to={`/rooms?destination=${encodeURIComponent(destination.name)}`}
          className="destination-explore-button"
        >
          Explore Rooms
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default DestinationCard;
