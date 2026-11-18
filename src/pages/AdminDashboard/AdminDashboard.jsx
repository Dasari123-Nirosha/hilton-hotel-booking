
import {
  BedDouble,
  CalendarCheck,
  IndianRupee,
  Users,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRooms } from "../../context/RoomContext";
import { useBookings } from "../../context/BookingContext";
import StatCard from "../../components/StatCard/StatCard";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import "./AdminDashboard.css";

function AdminDashboard() {
  const { rooms } = useRooms();
  const { bookings } = useBookings();

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  );

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "Cancelled"
  );

  const totalRevenue = confirmedBookings.reduce(
    (total, booking) => total + Number(booking.totalAmount || 0),
    0
  );

  const stats = [
    {
      title: "Total Rooms",
      value: rooms.length,
      icon: BedDouble,
      color: "olive",
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: CalendarCheck,
      color: "aubergine",
    },
    {
      title: "Confirmed Bookings",
      value: confirmedBookings.length,
      icon: Users,
      color: "peach",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "olive",
    },
  ];

  return (
    <main className="admin-dashboard-page">
      <AdminSidebar />

      <section className="admin-dashboard-content">
        <div className="admin-dashboard-heading">
          <p>HILTON MANAGEMENT</p>
          <h1>Admin Dashboard</h1>
          <span>Monitor your hotel operations and performance.</span>
        </div>

        <div className="admin-stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="admin-overview-grid">
          <div className="admin-overview-card">
            <h2>Booking Overview</h2>

            <div className="admin-overview-row">
              <span>Confirmed Bookings</span>
              <strong>{confirmedBookings.length}</strong>
            </div>

            <div className="admin-overview-row">
              <span>Cancelled Bookings</span>
              <strong>{cancelledBookings.length}</strong>
            </div>

            <div className="admin-overview-row">
              <span>Total Reservations</span>
              <strong>{bookings.length}</strong>
            </div>
          </div>

          <div className="admin-overview-card">
            <h2>Quick Actions</h2>

            <Link to="/admin/rooms" className="admin-action-link">
              <BedDouble size={20} />
              <span>Manage Rooms</span>
              <ArrowRight size={18} />
            </Link>

            <Link to="/admin/bookings" className="admin-action-link">
              <ClipboardList size={20} />
              <span>Manage Bookings</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
