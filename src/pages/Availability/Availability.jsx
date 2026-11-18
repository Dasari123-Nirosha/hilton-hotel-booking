
import { useState } from "react";
import {
  CalendarDays,
  Users,
  Search,
  MapPin,
} from "lucide-react";

import {
  getTodayDate,
  isValidDateRange,
} from "../../utils/dateUtils";

import "./Availability.css";

const destinations = [
  "Maldives",
  "Bali",
  "Paris",
  "Dubai",
  "London",
  "Goa",
];

function Availability({ onSearch }) {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearchData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "checkIn" &&
      previous.checkOut &&
      value >= previous.checkOut
        ? { checkOut: "" }
        : {}),
    }));

    setError("");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchData.destination) {
      setError("Please select your destination.");
      return;
    }

    if (!searchData.checkIn || !searchData.checkOut) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    if (!isValidDateRange(searchData.checkIn, searchData.checkOut)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    onSearch(searchData);
  };

  const today = getTodayDate();

  return (
    <section className="rooms-availability-section">
      <div className="rooms-availability-heading">
        <p>PLAN YOUR STAY</p>
        <h2>Find Your Perfect Stay</h2>
        <span>
          Select your destination, dates and guests to find suitable accommodation.
        </span>
      </div>

      <form
        className="rooms-availability-form"
        onSubmit={handleSearch}
      >
        <div className="rooms-availability-field">
          <label htmlFor="availability-destination">
            <MapPin size={17} />
            Destination
          </label>

          <select
            id="availability-destination"
            name="destination"
            value={searchData.destination}
            onChange={handleChange}
            required
          >
            <option value="">Select Destination</option>

            {destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
        </div>

        <div className="rooms-availability-field">
          <label htmlFor="availability-checkin">
            <CalendarDays size={17} />
            Check-in Date
          </label>

          <input
            id="availability-checkin"
            type="date"
            name="checkIn"
            min={today}
            value={searchData.checkIn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="rooms-availability-field">
          <label htmlFor="availability-checkout">
            <CalendarDays size={17} />
            Check-out Date
          </label>

          <input
            id="availability-checkout"
            type="date"
            name="checkOut"
            min={searchData.checkIn || today}
            value={searchData.checkOut}
            onChange={handleChange}
            required
          />
        </div>

        <div className="rooms-availability-field">
          <label htmlFor="availability-guests">
            <Users size={17} />
            Guests
          </label>

          <select
            id="availability-guests"
            name="guests"
            value={searchData.guests}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <option key={number} value={number}>
                {number} {number === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rooms-availability-button"
        >
          <Search size={18} />
          Check Availability
        </button>
      </form>

      {error && (
        <p className="rooms-availability-error">{error}</p>
      )}
    </section>
  );
}

export default Availability;
