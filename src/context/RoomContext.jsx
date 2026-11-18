
import { createContext, useContext, useEffect, useState } from "react";
import initialRooms from "../data/rooms";

import {
  getStorageData,
  saveStorageData,
} from "../utils/localStorage";

const RoomContext = createContext();

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState(() =>
    getStorageData("hilton-rooms", initialRooms)
  );

  useEffect(() => {
    saveStorageData("hilton-rooms", rooms);
  }, [rooms]);

  const addRoom = (roomData) => {
    const newRoom = {
      ...roomData,
      id: Date.now(),
      price: Number(roomData.price),
      guests: Number(roomData.guests),
    };

    setRooms((previous) => [...previous, newRoom]);

    return newRoom;
  };

  const updateRoom = (roomId, updatedData) => {
    setRooms((previous) =>
      previous.map((room) =>
        room.id === roomId
          ? {
              ...room,
              ...updatedData,
              price: Number(updatedData.price),
              guests: Number(updatedData.guests),
            }
          : room
      )
    );
  };

  const deleteRoom = (roomId) => {
    setRooms((previous) =>
      previous.filter((room) => room.id !== roomId)
    );
  };

  return (
    <RoomContext.Provider
      value={{ rooms, addRoom, updateRoom, deleteRoom }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRooms() {
  return useContext(RoomContext);
}
