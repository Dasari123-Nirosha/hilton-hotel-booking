
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, UserRound, CalendarDays } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-mark">H</span>

          <span className="brand-text">
            <span className="brand-name">HILTON</span>
            <span className="brand-tagline">HOTELS & RESORTS</span>
          </span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/rooms" onClick={closeMenu}>
            Rooms
          </NavLink>

          <NavLink to="/my-bookings" onClick={closeMenu}>
            <CalendarDays size={16} />
            My Bookings
          </NavLink>

          <NavLink to="/profile" onClick={closeMenu}>
            <UserRound size={16} />
            Profile
          </NavLink>

          <NavLink
            to="/admin"
            className="admin-nav-link"
            onClick={closeMenu}
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
