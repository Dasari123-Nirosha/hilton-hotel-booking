
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  ClipboardList,
  ArrowLeft,
} from "lucide-react";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <span className="admin-sidebar-logo">H</span>
        <div>
          <h2>HILTON</h2>
          <p>ADMIN PANEL</p>
        </div>
      </div>

      <div className="admin-sidebar-menu">
        <p className="admin-sidebar-label">MAIN MENU</p>

        <NavLink to="/admin" end className="admin-sidebar-link">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/rooms" className="admin-sidebar-link">
          <BedDouble size={19} />
          <span>Manage Rooms</span>
        </NavLink>

        <NavLink to="/admin/bookings" className="admin-sidebar-link">
          <ClipboardList size={19} />
          <span>Manage Bookings</span>
        </NavLink>
      </div>

      <div className="admin-sidebar-footer">
        <NavLink to="/" className="admin-sidebar-back">
          <ArrowLeft size={18} />
          <span>Back to Website</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default AdminSidebar;
