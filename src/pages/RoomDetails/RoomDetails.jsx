
import { useParams, Link } from "react-router-dom";
import {
  Users,
  BedDouble,
  ArrowLeft,
  MapPin,
} from "lucide-react";

import RoomGallery from "../../components/RoomGallery/RoomGallery";
import { useRooms } from "../../context/RoomContext";

import "./RoomDetails.css";

const destinations = [
  "Maldives",
  "Bali",
  "Paris",
  "Dubai",
  "London",
  "Goa",
];

function getRoomDestination(room) {
  if (room.destination) {
    return room.destination;
  }

  const index = (Number(room.id) - 1) % destinations.length;
  return destinations[index];
}

function RoomDetails() {
  const { id } = useParams();
  const { rooms } = useRooms();

  const room = rooms.find(
    (item) => Number(item.id) === Number(id)
  );

  if (!room) {
    return <h2>Room not found</h2>;
  }

  const roomDestination = getRoomDestination(room);

  const roomImages = room.images?.length
    ? room.images
    : room.image
      ? [room.image]
      : [];

  return (
    <section className="room-details-page">
      <Link to="/rooms" className="back-to-rooms">
        <ArrowLeft size={18} /> Back to Rooms
      </Link>

      <div className="room-details-container">
        <RoomGallery
          images={roomImages}
          roomName={room.name}
        />

        <div className="room-details-content">
          <p className="room-details-category">
            {room.category}
          </p>

          <h1>{room.name}</h1>

          <p className="room-details-destination">
            <MapPin size={18} />
            {roomDestination}
          </p>

          <p className="room-details-description">
            {room.description}
          </p>

          <h2 className="room-details-price">
            ₹{Number(room.price || 0).toLocaleString("en-IN")}
            <span> / night</span>
          </h2>

          <div className="room-details-info">
            <p>
              <Users size={20} /> {room.guests} Guests
            </p>

            <p>
              <BedDouble size={20} /> {room.bed}
            </p>
          </div>

          <Link
            to={`/booking/${room.id}`}
            className="room-book-button"
          >
            Book This Room
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RoomDetails;
