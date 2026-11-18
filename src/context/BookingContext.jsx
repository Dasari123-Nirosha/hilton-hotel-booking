
import { createContext, useContext, useEffect, useState } from "react";

import {
  getStorageData,
  saveStorageData,
} from "../utils/localStorage";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() =>
    getStorageData("hilton-bookings", [])
  );

  useEffect(() => {
    saveStorageData("hilton-bookings", bookings);
  }, [bookings]);

  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      bookingId: `HIL${Date.now()}`,
      bookingDate: new Date().toISOString(),
      status: "Confirmed",
    };

    setBookings((previous) => [...previous, newBooking]);

    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.bookingId === bookingId
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  };

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, cancelBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
