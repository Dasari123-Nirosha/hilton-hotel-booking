
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle,
  CalendarDays,
  Users,
  BedDouble,
  MapPin,
} from "lucide-react";

import { useBookings } from "../../context/BookingContext";
import "./BookingConfirmation.css";

function BookingConfirmation() {
  const { bookingId } = useParams();
  const { bookings } = useBookings();

  const booking = bookings.find(
    (item) => item.bookingId === bookingId
  );

  if (!booking) {
    return (
      <main className="confirmation-page">
        <h2>Booking not found</h2>
        <Link to="/rooms">Explore Rooms</Link>
      </main>
    );
  }

  return (
    <main className="confirmation-page">
      <div className="confirmation-card">
        <CheckCircle className="confirmation-icon" size={65} />

        <p className="confirmation-label">BOOKING SUCCESSFUL</p>
        <h1>Your Stay Is Confirmed!</h1>

        <p className="confirmation-message">
          Thank you for choosing HILTON. Your booking has been
          successfully saved.
        </p>

        <div className="confirmation-id">
          <span>Booking ID</span>
          <strong>{booking.bookingId}</strong>
        </div>

        <div className="confirmation-room">
          <img src={booking.image} alt={booking.roomName} />

          <div>
            <p>{booking.category}</p>
            <h2>{booking.roomName}</h2>

            <span className="confirmation-destination">
              <MapPin size={16} />
              {booking.destination || "Destination not specified"}
            </span>

            <strong>
              ₹{Number(booking.pricePerNight || 0).toLocaleString("en-IN")} / night
            </strong>
          </div>
        </div>

        <div className="confirmation-details">
          <div>
            <CalendarDays size={19} />
            <span>Check-in</span>
            <strong>{booking.checkIn}</strong>
          </div>

          <div>
            <CalendarDays size={19} />
            <span>Check-out</span>
            <strong>{booking.checkOut}</strong>
          </div>

          <div>
            <Users size={19} />
            <span>Guests</span>
            <strong>{booking.guests}</strong>
          </div>

          <div>
            <BedDouble size={19} />
            <span>Nights</span>
            <strong>{booking.nights}</strong>
          </div>
        </div>

        <div className="confirmation-total">
          <span>Total Amount</span>
          <strong>
            ₹{Number(booking.totalAmount || 0).toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="confirmation-actions">
          <Link to="/my-bookings" className="my-bookings-button">
            View My Bookings
          </Link>

          <Link to="/rooms" className="continue-booking-button">
            Explore More Rooms
          </Link>
        </div>
      </div>
    </main>
  );
}

export default BookingConfirmation;
