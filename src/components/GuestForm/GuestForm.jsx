
import "./GuestForm.css";

function GuestForm({ formData, onChange, destination }) {
  return (
    <div className="guest-form">
      <h2>Guest Information</h2>

      <div className="guest-form-grid">
        <div className="guest-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={onChange}
            required
          />
        </div>

        <div className="guest-form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="guest-form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={onChange}
            required
          />
        </div>

        <div className="guest-form-group">
          <label>Number of Guests</label>
          <select
            name="guests"
            value={formData.guests}
            onChange={onChange}
            required
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
          </select>
        </div>

        <div className="guest-form-group">
          <label>Destination</label>
          <input
            type="text"
            value={destination || ""}
            placeholder="Destination"
            readOnly
          />
        </div>

        <div className="guest-form-group">
          <label>Check-in Date</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={onChange}
            required
          />
        </div>

        <div className="guest-form-group">
          <label>Check-out Date</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={onChange}
            required
          />
        </div>
      </div>
    </div>
  );
}

export default GuestForm;
