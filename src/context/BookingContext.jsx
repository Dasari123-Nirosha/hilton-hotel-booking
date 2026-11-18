
import { createContext, useContext, useEffect, useState } from "react";

import {
  getStorageData,
  saveStorageData,
} from "../utils/localStorage";

import {
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const BookingContext = createContext();

const bookingsRef = doc(db, "sharedData", "bookings");

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() =>
    getStorageData("hilton-bookings", [])
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      bookingsRef,
      async (snapshot) => {
        try {
          if (snapshot.exists()) {
            const cloudBookings = snapshot.data().items || [];
            setBookings(cloudBookings);
            saveStorageData("hilton-bookings", cloudBookings);
          } else {
            await setDoc(bookingsRef, { items: bookings });
          }
        } catch (error) {
          console.error("Firebase booking error:", error);
        }
      },
      (error) => {
        console.error("Could not load shared bookings:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const saveBookings = (updatedBookings) => {
    setBookings(updatedBookings);
    saveStorageData("hilton-bookings", updatedBookings);

    setDoc(bookingsRef, { items: updatedBookings }).catch((error) => {
      console.error("Could not save bookings to Firebase:", error);
    });
  };

  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      bookingId: `HIL${Date.now()}`,
      bookingDate: new Date().toISOString(),
      status: "Confirmed",
    };

    saveBookings([...bookings, newBooking]);

    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    const updatedBookings = bookings.map((booking) =>
      booking.bookingId === bookingId
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    saveBookings(updatedBookings);
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
