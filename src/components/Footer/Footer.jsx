
import { MapPin, Phone, Mail } from "lucide-react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h2>HILTON</h2>
          <span>HOTELS & RESORTS</span>
          <p>
            Experience comfort, elegance and exceptional
            hospitality. Make every stay memorable with us.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/rooms">Rooms</a>
          <a href="/my-bookings">My Bookings</a>
          <a href="/profile">Profile</a>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><MapPin size={17} /> Hotel Location</p>
          <p><Phone size={17} /> +91 98765 43210</p>
          <p><Mail size={17} /> info@hilton-demo.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 HILTON Hotel Booking Management System.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
