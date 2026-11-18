
import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import "./RoomForm.css";

const destinations = [
  "Maldives",
  "Bali",
  "Paris",
  "Dubai",
  "London",
  "Goa",
];

const initialForm = {
  name: "",
  category: "",
  destination: "",
  description: "",
  price: "",
  guests: "2",
  image: "",
};

function RoomForm({ room, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (room) {
      const fallbackDestination =
        destinations[(Number(room.id) - 1) % destinations.length];

      setFormData({
        name: room.name || "",
        category: room.category || "",
        destination: room.destination || fallbackDestination,
        description: room.description || "",
        price: room.price || "",
        guests: String(room.guests || 2),
        image: room.image || "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      price: Number(formData.price),
      guests: Number(formData.guests),
    });
  };

  return (
    <section className="room-form-card">
      <div className="room-form-heading">
        <div>
          <p>ROOM INFORMATION</p>
          <h2>{room ? "Edit Room Details" : "Add New Room"}</h2>
        </div>

        <button
          type="button"
          className="room-form-close"
          onClick={onCancel}
          aria-label="Close form"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="room-form-grid">
          <div className="room-form-field">
            <label htmlFor="room-name">Room Name</label>
            <input
              id="room-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter room name"
              required
            />
          </div>

          <div className="room-form-field">
            <label htmlFor="room-category">Room Category</label>
            <select
              id="room-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Beach Room">Beach Room</option>
              <option value="Forest Room">Forest Room</option>
              <option value="Luxury Kutir">Luxury Kutir</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Executive Suite">Executive Suite</option>
            </select>
          </div>

          <div className="room-form-field">
            <label htmlFor="room-destination">Destination</label>
            <select
              id="room-destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            >
              <option value="">Select destination</option>

              {destinations.map((destination) => (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
          </div>

          <div className="room-form-field">
            <label htmlFor="room-price">Price Per Night (₹)</label>
            <input
              id="room-price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="1"
              required
            />
          </div>

          <div className="room-form-field">
            <label htmlFor="room-guests">Maximum Guests</label>
            <input
              id="room-guests"
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              max="20"
              required
            />
          </div>

          <div className="room-form-field room-form-full">
            <label htmlFor="room-image">Room Image URL</label>
            <input
              id="room-image"
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste room image URL"
              required
            />
          </div>

          <div className="room-form-field room-form-full">
            <label htmlFor="room-description">Room Description</label>
            <textarea
              id="room-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short room description"
              rows="4"
              required
            />
          </div>
        </div>

        <div className="room-form-actions">
          <button
            type="button"
            className="room-form-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button type="submit" className="room-form-save">
            <Save size={17} />
            {room ? "Save Changes" : "Add Room"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default RoomForm;
