
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">WELCOME TO HILTON</p>

        <h1>
          Experience
          <span> Exceptional Stays</span>
        </h1>

        <p className="hero-description">
          Discover elegant rooms, thoughtful hospitality and
          unforgettable moments. Your perfect stay begins here.
        </p>

        <Link to="/rooms" className="hero-button">
          Explore Our Rooms
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export default Hero;
