
import {
  Award,
  BedDouble,
  ShieldCheck,
  Headset,
} from "lucide-react";
import "./About.css";

const reasons = [
  {
    icon: <Award size={26} />,
    title: "Premium Comfort",
    description: "Elegant spaces designed for a relaxing stay.",
  },
  {
    icon: <BedDouble size={26} />,
    title: "Beautiful Rooms",
    description: "Unique accommodations for every guest.",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "Safe & Secure",
    description: "A welcoming environment for your stay.",
  },
  {
    icon: <Headset size={26} />,
    title: "Guest Support",
    description: "Friendly assistance throughout your visit.",
  },
];

function About() {
  return (
    <section className="about-section">
      <div className="about-content">
        <p>ABOUT HILTON</p>
        <h2>Experience Hospitality at Its Finest</h2>

        <span>
          Discover a perfect blend of comfort, elegance and
          exceptional hospitality. Our thoughtfully designed
          accommodations offer a peaceful escape and memorable
          experiences for every guest.
        </span>

        <div className="why-hilton">
          <h2>Why Choose HILTON?</h2>

          <div className="why-hilton-grid">
            {reasons.map((reason, index) => (
              <div className="why-hilton-item" key={index}>
                <div className="why-hilton-icon">
                  {reason.icon}
                </div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt="Luxury hotel exterior"
        />
      </div>
    </section>
  );
}

export default About;