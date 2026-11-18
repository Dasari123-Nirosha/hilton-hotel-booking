
import {
  CalendarDays,
  Users,
  BedDouble,
  MapPin,
  XCircle,
} from "lucide-react";

import { useRooms } from "../../context/RoomContext";
import "./BookingCard.css";

const destinations = [
  "Maldives",
  "Bali",
  "Paris",
  "Dubai",
  "London",
  "Goa",
];

function BookingCard({ booking, onCancel }) {
  const { rooms } = useRooms();

  const room = rooms.find(
    (item) => Number(item.id) === Number(booking.roomId)
  );

  const destination =
    booking.destination ||
    room?.destination ||
    destinations[
      (Number(booking.roomId) - 1) % destinations.length
    ] ||
    "Destination not available";

  return (
    <article className="booking-card">
      <div className="booking-card-image">
        <img src={booking.image} alt={booking.roomName} />
      </div>

      <div className="booking-card-content">
        <div className="booking-card-top">
          <div>
            <p className="booking-card-category">{booking.category}</p>
            <h2>{booking.roomName}</h2>

            <p className="booking-card-destination">
              <MapPin size={17} />
              {destination}
            </p>
          </div>

          <span
            className={`booking-status ${
              booking.status === "Confirmed" ? "confirmed" : "cancelled"
            }`}
          >
            {booking.status}
          </span>
        </div>

        <p className="booking-card-id">
          Booking ID: {booking.bookingId}
        </p>

        <div className="booking-card-details">
          <p>
            <CalendarDays size={17} />
            Check-in: {booking.checkIn}
          </p>

          <p>
            <CalendarDays size={17} />
            Check-out: {booking.checkOut}
          </p>

          <p>
            <Users size={17} />
            {booking.guests} Guests
          </p>

          <p>
            <BedDouble size={17} />
            {booking.nights} Nights
          </p>
        </div>

        <div className="booking-card-bottom">
          <strong>
            ₹{Number(booking.totalAmount || 0).toLocaleString("en-IN")}
          </strong>

          {booking.status === "Confirmed" && (
            <button
              type="button"
              className="cancel-booking-button"
              onClick={() => onCancel(booking.bookingId)}
            >
              <XCircle size={17} />
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default BookingCard;
