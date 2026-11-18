
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { BookingProvider } from "./context/BookingContext";
import { RoomProvider } from "./context/RoomContext";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
import RoomDetails from "./pages/RoomDetails/RoomDetails";
import Booking from "./pages/Booking/Booking";
import BookingConfirmation from "./pages/BookingConfirmation/BookingConfirmation";
import MyBookings from "./pages/MyBookings/MyBookings";
import Profile from "./pages/Profile/Profile";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminRooms from "./pages/AdminRooms/AdminRooms";
import AdminBookings from "./pages/AdminBookings/AdminBookings";
import NotFound from "./pages/NotFound/NotFound";

import "./App.css";

function App() {
  return (
    <RoomProvider>
      <BookingProvider>
        <BrowserRouter>
          <Navbar />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/category/:categoryId" element={<Rooms />} />
              <Route path="/room/:id" element={<RoomDetails />} />

              <Route path="/booking/:id" element={<Booking />} />

              <Route
                path="/booking-confirmation/:bookingId"
                element={<BookingConfirmation />}
              />

              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/profile" element={<Profile />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/rooms" element={<AdminRooms />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </BookingProvider>
    </RoomProvider>
  );
}

export default App;
