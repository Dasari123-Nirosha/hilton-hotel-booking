
import { useState } from "react";
import { CalendarDays, ClipboardList } from "lucide-react";
import { useBookings } from "../../context/BookingContext";
import BookingCard from "../../components/BookingCard/BookingCard";
import EmptyState from "../../components/EmptyState/EmptyState";
import "./MyBookings.css";

function MyBookings() {
  const { bookings, cancelBooking } = useBookings();
  const [showCancelled, setShowCancelled] = useState(false);

  const filteredBookings = bookings.filter((booking) =>
    showCancelled
      ? booking.status === "Cancelled"
      : booking.status === "Confirmed"
  );

  return (
    <main className="my-bookings-page">
      <section className="my-bookings-heading">
        <p>HILTON GUEST ACCOUNT</p>
        <h1>My Bookings</h1>
        <span>View and manage your hotel reservations.</span>
      </section>

      <section className="my-bookings-container">
        <div className="my-bookings-toolbar">
          <div>
            <h2>Your Reservations</h2>
            <p>
              {filteredBookings.length}{" "}
              {showCancelled ? "Cancelled" : "Confirmed"} Bookings
            </p>
          </div>

          <div className="booking-tabs">
            <button
              type="button"
              className={!showCancelled ? "active" : ""}
              onClick={() => setShowCancelled(false)}
            >
              <CalendarDays size={17} />
              Confirmed
            </button>

            <button
              type="button"
              className={showCancelled ? "active" : ""}
              onClick={() => setShowCancelled(true)}
            >
              <ClipboardList size={17} />
              Cancelled
            </button>
          </div>
        </div>

        {filteredBookings.length > 0 ? (
          <div className="my-bookings-list">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.bookingId}
                booking={booking}
                onCancel={cancelBooking}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={
              showCancelled
                ? "No Cancelled Bookings"
                : "No Bookings Yet"
            }
            message={
              showCancelled
                ? "You don't have any cancelled reservations."
                : "Your confirmed reservations will appear here after booking a room."
            }
          />
        )}
      </section>
    </main>
  );
}

export default MyBookings;
