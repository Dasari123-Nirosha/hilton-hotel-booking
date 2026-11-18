
import {
  Wifi,
  Utensils,
  Waves,
  Dumbbell,
  Car,
  Coffee,
} from "lucide-react";
import "./Amenities.css";

const amenities = [
  {
    icon: <Wifi size={28} />,
    name: "Free Wi-Fi",
    description: "Stay connected throughout your visit.",
  },
  {
    icon: <Utensils size={28} />,
    name: "Restaurant",
    description: "Enjoy delicious dining experiences.",
  },
  {
    icon: <Waves size={28} />,
    name: "Swimming Pool",
    description: "Relax and refresh by the pool.",
  },
  {
    icon: <Dumbbell size={28} />,
    name: "Fitness Center",
    description: "Maintain your fitness during your stay.",
  },
  {
    icon: <Car size={28} />,
    name: "Parking",
    description: "Convenient parking for guests.",
  },
  {
    icon: <Coffee size={28} />,
    name: "Room Service",
    description: "Enjoy comfort and convenience in your room.",
  },
];

function Amenities() {
  return (
    <section className="amenities-section">
      <div className="amenities-heading">
        <p>COMFORT & CONVENIENCE</p>
        <h2>Amenities & Services</h2>
      </div>

      <div className="amenities-grid">
        {amenities.map((item, index) => (
          <div className="amenity-card" key={index}>
            <div className="amenity-icon">{item.icon}</div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Amenities;