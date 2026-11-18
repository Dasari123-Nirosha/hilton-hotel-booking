
import { useState } from "react";
import {
  ClipboardList,
  CalendarDays,
  Users,
  Search,
  IndianRupee,
} from "lucide-react";
import { useBookings } from "../../context/BookingContext";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import EmptyState from "../../components/EmptyState/EmptyState";
import "./AdminBookings.css";

function AdminBookings() {
  const { bookings } = useBookings();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || booking.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  const totalRevenue = bookings
    .filter((booking) => booking.status === "Confirmed")
    .reduce((total, booking) => total + Number(booking.totalAmount || 0), 0);

  return (
    <main className="admin-bookings-page">
      <AdminSidebar />

      <section className="admin-bookings-content">
        <div className="admin-bookings-heading">
          <div>
            <p>HILTON MANAGEMENT</p>
            <h1>Manage Bookings</h1>
            <span>View and monitor all guest reservations.</span>
          </div>
        </div>

        <div className="admin-bookings-stats">
          <article className="admin-booking-stat">
            <div className="admin-booking-stat-icon">
              <ClipboardList size={23} />
            </div>
            <div>
              <h2>{bookings.length}</h2>
              <p>Total Bookings</p>
            </div>
          </article>

          <article className="admin-booking-stat">
            <div className="admin-booking-stat-icon confirmed-icon">
              <CalendarDays size={23} />
            </div>
            <div>
              <h2>{confirmedCount}</h2>
              <p>Confirmed</p>
            </div>
          </article>

          <article className="admin-booking-stat">
            <div className="admin-booking-stat-icon cancelled-icon">
              <Users size={23} />
            </div>
            <div>
              <h2>{cancelledCount}</h2>
              <p>Cancelled</p>
            </div>
          </article>

          <article className="admin-booking-stat">
            <div className="admin-booking-stat-icon revenue-icon">
              <IndianRupee size={23} />
            </div>
            <div>
              <h2>₹{totalRevenue.toLocaleString("en-IN")}</h2>
              <p>Confirmed Revenue</p>
            </div>
          </article>
        </div>

        <section className="admin-bookings-table-container">
          <div className="admin-bookings-table-heading">
            <div>
              <h2>All Reservations</h2>
              <p>{filteredBookings.length} bookings found</p>
            </div>

            <div className="admin-bookings-filters">
              <div className="admin-bookings-search">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search guest, room or booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Bookings</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {filteredBookings.length > 0 ? (
            <div className="admin-bookings-list">
              {filteredBookings.map((booking) => (
                <article
                  className="admin-booking-item"
                  key={booking.bookingId}
                >
                  <img src={booking.image} alt={booking.roomName} />

                  <div className="admin-booking-info">
                    <h3>{booking.fullName}</h3>
                    <p>{booking.email}</p>
                    <span>{booking.phone}</span>
                  </div>

                  <div className="admin-booking-room">
                    <p>{booking.category}</p>
                    <h3>{booking.roomName}</h3>
                    <span>Booking ID: {booking.bookingId}</span>
                  </div>

                  <div className="admin-booking-dates">
                    <p>
                      <CalendarDays size={15} /> {booking.checkIn}
                    </p>
                    <p>
                      <CalendarDays size={15} /> {booking.checkOut}
                    </p>
                    <span>
                      {booking.guests} Guests · {booking.nights} Nights
                    </span>
                  </div>

                  <div className="admin-booking-price">
                    <strong>
                      ₹{Number(booking.totalAmount).toLocaleString("en-IN")}
                    </strong>
                    <span
                      className={`admin-booking-status ${
                        booking.status === "Confirmed"
                          ? "confirmed"
                          : "cancelled"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Bookings Found"
              message={
                bookings.length === 0
                  ? "Guest reservations will appear here after a booking is made."
                  : "Try changing your search or status filter."
              }
            />
          )}
        </section>
      </section>
    </main>
  );
}

export default AdminBookings;
