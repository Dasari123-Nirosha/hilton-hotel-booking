
import {
  CalendarDays,
  Users,
  BedDouble,
  IndianRupee,
} from "lucide-react";

import {
  calculateNights,
  formatDate,
} from "../../utils/dateUtils";

import {
  calculateRoomPrice,
  formatPrice,
} from "../../utils/priceCalculator";

import "./BookingSummary.css";

function BookingSummary({ room, formData }) {
  const nights = calculateNights(
    formData.checkIn,
    formData.checkOut
  );

  const total = calculateRoomPrice(room.price, nights);

  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>

      <div className="summary-item">
        <BedDouble size={19} />
        <div>
          <span>Room</span>
          <strong>{room.name}</strong>
        </div>
      </div>

      <div className="summary-item">
        <CalendarDays size={19} />
        <div>
          <span>Check-in</span>
          <strong>
            {formData.checkIn
              ? formatDate(formData.checkIn)
              : "Not selected"}
          </strong>
        </div>
      </div>

      <div className="summary-item">
        <CalendarDays size={19} />
        <div>
          <span>Check-out</span>
          <strong>
            {formData.checkOut
              ? formatDate(formData.checkOut)
              : "Not selected"}
          </strong>
        </div>
      </div>

      <div className="summary-item">
        <Users size={19} />
        <div>
          <span>Guests</span>
          <strong>{formData.guests}</strong>
        </div>
      </div>

      <div className="summary-divider" />

      <div className="summary-price-row">
        <span>Price per night</span>
        <strong>{formatPrice(room.price)}</strong>
      </div>

      <div className="summary-price-row">
        <span>Number of nights</span>
        <strong>{nights}</strong>
      </div>

      <div className="summary-total">
        <span>Total Amount</span>
        <strong>
          <IndianRupee size={19} />
          {total.toLocaleString("en-IN")}
        </strong>
      </div>
    </div>
  );
}

export default BookingSummary;
