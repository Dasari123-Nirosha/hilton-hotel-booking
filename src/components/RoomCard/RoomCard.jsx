
import { Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import "./RoomCard.css";

function RoomCard({ room, availabilityStatus }) {
  const detailsLink = room.category
    ? `/room/${room.id}`
    : `/rooms/category/${room.id}`;

  return (
    <article className="room-card">
      <div className="room-card-image">
        <img src={room.image} alt={room.name} />

        {availabilityStatus && (
          <span
            className={`room-availability-badge ${
              availabilityStatus === "Booked"
                ? "room-booked"
                : "room-available"
            }`}
          >
            {availabilityStatus === "Booked" ? (
              <XCircle size={15} />
            ) : (
              <CheckCircle size={15} />
            )}
            {availabilityStatus}
          </span>
        )}
      </div>

      <div className="room-card-content">
        <h3>{room.name}</h3>

        <p className="room-description">
          {room.description}
        </p>

        <Link to={detailsLink} className="room-details-button">
          {room.category ? "View Room Details" : "Explore Rooms"}
        </Link>
      </div>
    </article>
  );
}

export default RoomCard;
