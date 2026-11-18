
import { createContext, useContext, useEffect, useState } from "react";
import initialRooms from "../data/rooms";

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

const RoomContext = createContext();

const roomsRef = doc(db, "sharedData", "rooms");

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState(() =>
    getStorageData("hilton-rooms", initialRooms)
  );

  const [cloudLoaded, setCloudLoaded] = useState(false);

  // Load shared rooms from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(
      roomsRef,
      async (snapshot) => {
        try {
          if (snapshot.exists()) {
            const cloudRooms = snapshot.data().items || [];
            setRooms(cloudRooms);
            saveStorageData("hilton-rooms", cloudRooms);
          } else {
            // First upload: use the existing laptop room data
            await setDoc(roomsRef, { items: rooms });
          }

          setCloudLoaded(true);
        } catch (error) {
          console.error("Firebase room error:", error);
        }
      },
      (error) => {
        console.error("Could not load shared rooms:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const saveRooms = async (updatedRooms) => {
    setRooms(updatedRooms);
    saveStorageData("hilton-rooms", updatedRooms);

    try {
      await setDoc(roomsRef, { items: updatedRooms });
    } catch (error) {
      console.error("Could not save rooms to Firebase:", error);
    }
  };

  const addRoom = (roomData) => {
    const newRoom = {
      ...roomData,
      id: Date.now(),
      price: Number(roomData.price),
      guests: Number(roomData.guests),
    };

    saveRooms([...rooms, newRoom]);

    return newRoom;
  };

  const updateRoom = (roomId, updatedData) => {
    const updatedRooms = rooms.map((room) =>
      room.id === roomId
        ? {
            ...room,
            ...updatedData,
            price: Number(updatedData.price),
            guests: Number(updatedData.guests),
          }
        : room
    );

    saveRooms(updatedRooms);
  };

  const deleteRoom = (roomId) => {
    const updatedRooms = rooms.filter(
      (room) => room.id !== roomId
    );

    saveRooms(updatedRooms);
  };

  return (
    <RoomContext.Provider
      value={{ rooms, addRoom, updateRoom, deleteRoom, cloudLoaded }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRooms() {
  return useContext(RoomContext);
}
