
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import GuestForm from "../../components/GuestForm/GuestForm";
import BookingSummary from "../../components/BookingSummary/BookingSummary";

import { useBookings } from "../../context/BookingContext";
import { useRooms } from "../../context/RoomContext";

import {
  calculateNights,
  isValidDateRange,
} from "../../utils/dateUtils";

import {
  calculateTotalPrice,
  formatPrice,
} from "../../utils/priceCalculator";

import {
  validateBookingForm,
} from "../../utils/validation";

import "./Booking.css";

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

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addBooking } = useBookings();
  const { rooms } = useRooms();

  const room = rooms.find((item) => item.id === Number(id));

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: "1",
    checkIn: "",
    checkOut: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!room) return;

    const errors = validateBookingForm(formData, room.guests);

    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      return;
    }

    if (!isValidDateRange(formData.checkIn, formData.checkOut)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    const nights = calculateNights(
      formData.checkIn,
      formData.checkOut
    );

    const totalAmount = calculateTotalPrice(
      room.price,
      nights
    );

    const destination = getRoomDestination(room);

    const booking = addBooking({
      roomId: room.id,
      roomName: room.name,
      category: room.category,
      destination,
      image: room.image,
      pricePerNight: room.price,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      guests: Number(formData.guests),
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      nights,
      totalAmount,
    });

    navigate(`/booking-confirmation/${booking.bookingId}`);
  };

  if (!room) {
    return <h2>Room not found</h2>;
  }

  const roomDestination = getRoomDestination(room);

  return (
    <main className="booking-page">
      <Link to={`/room/${room.id}`} className="booking-back-link">
        <ArrowLeft size={18} />
        Back to Room Details
      </Link>

      <div className="booking-page-heading">
        <p>HILTON RESERVATIONS</p>
        <h1>Complete Your Booking</h1>
        <span>
          Enter your details to reserve your preferred accommodation.
        </span>
      </div>

      <div className="booking-layout">
        <form
          className="booking-form-section"
          onSubmit={handleSubmit}
        >
          <GuestForm
            formData={formData}
            onChange={handleChange}
            destination={roomDestination}
          />

          {error && (
            <p className="booking-error">{error}</p>
          )}

          <button type="submit" className="confirm-booking-button">
            Confirm Booking
          </button>
        </form>

        <aside className="booking-sidebar">
          <div className="booking-room-card">
            <img src={room.image} alt={room.name} />

            <div className="booking-room-content">
              <p>{room.category}</p>
              <h2>{room.name}</h2>
              <span>{roomDestination}</span>
              <span>
                {formatPrice(room.price)} / night
              </span>
              <p>{room.description}</p>
            </div>
          </div>

          <BookingSummary
            room={room}
            formData={formData}
          />
        </aside>
      </div>
    </main>
  );
}

export default Booking;
